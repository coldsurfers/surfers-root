import { randomUUID } from 'node:crypto';
import { XMLParser } from 'npm:fast-xml-parser@4.3.5';
import rawGeohash from 'npm:ngeohash';
import pLimit from 'npm:p-limit';
import pThrottle from 'npm:p-throttle';
import slugify from 'npm:slugify';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { fromZonedTime } from 'https://esm.sh/date-fns-tz';
import { format } from 'https://esm.sh/date-fns@3.6.0/format';
import { parse } from 'https://esm.sh/date-fns@3.6.0/parse';
import { adminHost, kopisKey, slackWebhookUrl } from './_shared/env.ts';
import { supabase } from './_shared/supabase.ts';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function runSequentially(tasks: (() => Promise<any>)[]) {
  return tasks.reduce((prevPromise, task) => {
    return prevPromise.then(() => task().then(console.log));
  }, Promise.resolve());
}

async function sendSlack(payload: { text: string }) {
  await fetch(slackWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

const ngeohash = rawGeohash as {
  encode: (lat: number, lon: number, precision?: number) => string;
  decode: (geohash: string) => { latitude: number; longitude: number };
  // 필요한 다른 메서드가 있다면 여기에 추가
};

const parser = new XMLParser();

async function uploadImageByResolutions({
  originalImageUrl,
  concertId,
  index,
  type,
}: {
  originalImageUrl: string;
  concertId: string;
  index: number;
  type: 'poster' | 'detail-image';
}) {
  const resolutions = ['low', 'medium', 'high'];
  const keys = await Promise.all(
    resolutions.map(async (resolution) => {
      const response = await fetch(`${Deno.env.get('BILLETS_SERVER_URL')}/v1/image`, {
        method: 'POST',
        body: JSON.stringify({
          imageUrl: originalImageUrl,
          resolution,
          concertId,
          index,
          type,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { key } = await response.json();
      console.log(key);
      // keys.push(key);
      return key as string;
    })
  );
  return {
    keys,
  };
}

const KOPISEVENT_CATEGORIES = {
  대중음악: 'CCCD',
  연극: 'AAAA',
  '서양음악(클래식)': 'CCCA',
  '한국음악(국악)': 'CCCC',
  뮤지컬: 'GGGA',
  '무용(서양/한국무용)': 'BBBC',
  대중무용: 'BBBE',
} as const;

function categoryToEventCategoryId(
  category: (typeof KOPISEVENT_CATEGORIES)[keyof typeof KOPISEVENT_CATEGORIES]
) {
  switch (category) {
    case 'CCCD':
    case 'CCCA':
    case 'CCCC':
      return '99133f58-38bc-40e3-92bf-877342dbf8cc';
    case 'AAAA':
    case 'GGGA':
      return '41e8895c-c1c8-4863-b6c1-fd9f029d8f57';
    case 'BBBC':
    case 'BBBE':
      return '3f8a7c2d-9b5e-4d1f-82a6-7e0c4b9d3f2a';
    default:
      return null;
  }
}

function areaToLocationCityId(area: string) {
  switch (area) {
    case '서울특별시':
      return 'a0cdb908-7cf9-4b3d-b750-e09f4f154ef5';
    case '인천광역시':
      return 'aa994394-aeee-4a86-9fe8-88185a20c593';
    case '울산광역시':
      return '1a4e2baa-4954-4510-b9f7-fe504fb3c540';
    case '부산광역시':
      return '7817484b-5fa2-4965-87d7-0e3d7c8c3abb';
    case '대구광역시':
      return 'b152efa3-b765-4cd3-a880-a4fd15f0b696';
    case '제주특별자치도':
      return 'ef7372f0-7952-40ab-9d0a-fd1b913ae772';
    case '광주광역시':
      return '4e2f1b7d-9d73-4b4e-982d-0a37e76c5d71';
    case '대전광역시':
      return 'b42c6f8a-63f4-4b5a-96c7-2a8f4c6d9e0d';
    case '세종특별자치시':
      return 'c1f8d5e4-47a1-4e1f-897e-9f2d8b3a2b6e';
    case '경기도':
      return 'f59b3d8e-2784-4e4e-917c-4f7a9e6c3b5d';
    case '강원특별자치도':
      return '9d1a2e4f-6b8c-42d7-a7e1-3f5c9d2b1e7a';
    case '충청북도':
      return '8a3d4b7c-5e9f-4d6a-9281-0c7e8d1f2b5a';
    case '충청남도':
      return '3f6e7b8c-2d1a-4d5e-9f7c-8a0b4e2d1f6a';
    case '전라북도':
      return '1b7c4e2d-5a9f-6d8a-3f0c-7e2d1f9a8b4e';
    case '전라남도':
      return '5e9f7c8a-0b4e-2d1f-6a3d-7c8b4e2d1f9a';
    case '경상북도':
      return '7f3a9d4e-5c12-4a3d-91f8-08c9e4bdbd13';
    case '경상남도':
      return '2b6c13f5-2e17-41e9-9cf6-1d4d8c8f5b7e';
    default:
      return null;
  }
}

async function connectLocationCity(eventId: string, area: string) {
  const locationCityId = areaToLocationCityId(area);
  if (!locationCityId) {
    return;
  }
  const { error } = await supabase
    .from('Concert')
    .update({
      locationCityId: locationCityId, // 외래 키 컬럼 직접 업데이트
    })
    .eq('id', eventId);

  if (error) {
    console.log(error);
  }
}

async function connectEventCategory(
  eventId: string,
  category: (typeof KOPISEVENT_CATEGORIES)[keyof typeof KOPISEVENT_CATEGORIES]
) {
  const eventCategoryId = categoryToEventCategoryId(category);
  if (!eventCategoryId) {
    return;
  }

  const { error } = await supabase
    .from('Concert')
    .update({
      eventCategoryId: eventCategoryId, // 외래 키 직접 업데이트
    })
    .eq('id', eventId); // 해당 Concert 레코드 찾기

  if (error) {
    console.log(error);
  }
}

async function findVenue(venue: string) {
  let alreadyExistingVenueId = null;
  switch (venue) {
    case '2D Hall(이디홀)':
      alreadyExistingVenueId = '00650ef3-bb6c-4b78-9bf0-656177e88e58';
      break;
    case '소셜클럽 아워딜라잇':
      alreadyExistingVenueId = 'e994c099-27bb-4b37-bb2f-ce0a2e7b4043';
      break;
    case '이어령 예술극장 (구. 석관동 예술극장)':
      alreadyExistingVenueId = '1dd29719-8311-4ffb-8159-e535cfd49b7a';
      break;
    case '작은무대 극단가인':
      alreadyExistingVenueId = 'bd58464e-d6ea-4ec8-9e0f-77be1d4dc580';
      break;
    case '재즈소사이어티 서울(서울브루어리 성수 5층)':
      alreadyExistingVenueId = '69e8cf60-e0bb-4daa-b51a-7c6b57aef373';
      break;
    case '레브뮤직스튜디오(Reve Music Stuido)':
      alreadyExistingVenueId = '3fd2a697-1c6c-4724-a1da-19b4960f9c4d';
      break;
    case '아트리홀':
      alreadyExistingVenueId = '7eebec13-26de-4e71-8f15-45d63643bfba';
      break;
    case '서울문화예술교육센터 은평(서울무용창작센터)':
      alreadyExistingVenueId = '67efd3c4-2dd0-47a5-9dfe-747438b4c9ee';
      break;
    case '티켓링크 1975 씨어터(구.능동 어린이회관)':
      alreadyExistingVenueId = '8bb8227d-a442-44cc-bad9-5017a97a81f0';
      break;
    case '디 휘테 갤러리(die HüTTE Gallery)':
      alreadyExistingVenueId = '6227503c-66e9-4bc6-b74c-61a430e4ab3a';
      break;
    case '미로센터 2관(구.궁동예술극장)':
      alreadyExistingVenueId = 'e901a8bc-6814-4ba4-8ea2-c8a126a4a9e5';
      break;
    case '남해문화센터 (구. 남해군문화체육센터)':
      alreadyExistingVenueId = 'd9956245-4657-4329-9d83-e2cdb0a827e8';
      break;
    case 'HD아트센터(구 현대예술관)':
      alreadyExistingVenueId = '18e949dd-730f-4367-911f-8b8e6e651714';
      break;
    case '소극장 아고고':
      alreadyExistingVenueId = '2fe1fe67-5785-4e93-9917-f4562494fb77';
      break;
    case 'WDG 스튜디오 홍대(WDG STUDIO HONGDAE)':
      alreadyExistingVenueId = 'b7775502-4eb8-463b-9f85-b0c0d12d91e9';
      break;
    case '홍대 카페 (구.홍대카페)':
      alreadyExistingVenueId = 'f6a51902-757c-46a5-9a10-0d27cc461e07';
      break;
    case '광주 예술의 전당 (구. 광주문화예술회관)':
      alreadyExistingVenueId = '833f60d2-d030-4672-8638-29eb409d3ed8';
      break;
    case '컨벤트펍 (The convent Live Pub)':
      alreadyExistingVenueId = '6edf2a1d-c50f-42b0-8168-e2c0a5ce7267';
      break;
    case '하우스오브레퓨즈(House of Refuge)':
      alreadyExistingVenueId = 'e8694138-467d-411b-9f9a-3a718d121224';
      break;
    case 'BLACKCUBE LAB(BCL)':
      alreadyExistingVenueId = 'dbc59372-5de4-40c0-b97c-81caab3c0802';
      break;
    case '클럽 A.O.R(All Of Rock)':
      alreadyExistingVenueId = 'aaf65c9d-478a-47ea-b4ce-3e7c6b199506';
      break;
    case '플렉스홀 3호점':
      alreadyExistingVenueId = '3fc00b89-33a3-4bea-9ae5-8581eb24e45f';
      break;
    case '남원국악전용공연장 청아원':
      alreadyExistingVenueId = 'c992c8a2-1a73-42a9-a59c-11f1ea86e14b';
      break;
    case '효천아트센터 그라운드씬':
      alreadyExistingVenueId = 'c8925933-eeca-4523-a3f9-9da89aa252ba';
      break;
    case 'NOL 서경스퀘어(구. 서경대학교 공연예술센터)':
      alreadyExistingVenueId = '45486c74-e4d3-449d-b661-e9cbad1606bd';
      break;
    case '그랜드 워커힐 서울 (비스타 워커힐 서울) (빛의 시어터 (구.워커힐 시어터) )':
      alreadyExistingVenueId = 'e1bbb68b-332d-4702-8bfb-da9ab42d2bfd';
      break;
    case '지리산 오도재 힐링 캠핑장':
      alreadyExistingVenueId = '090575cf-f62c-43ec-84d3-cc4c2f651e50';
      break;
    case '앳모스피어 뮤직홀':
      alreadyExistingVenueId = '07736644-8842-4f01-80c8-33ebf6145fba';
      break;
    case '예술나무씨어터(구. 상상나눔씨어터)':
      alreadyExistingVenueId = 'c1cd66bb-4a86-4603-9bb0-aeede6a2b96b';
      break;
    case '문화공간 iei':
      alreadyExistingVenueId = '71c54df8-8334-4977-93c6-5e5eb3180fa9';
      break;
    case '모브닷.에이':
      alreadyExistingVenueId = 'd133f80a-2cd2-4084-9b68-615cec869c14';
      break;
    case '제주 오드씽(구.오드싱제주 스테이지)':
      alreadyExistingVenueId = 'ba53bff0-e36c-437a-8fe7-9e2939a4750a';
      break;
    case '밀양아리나 (구, 밀양연극촌)':
      alreadyExistingVenueId = '1129e076-dec7-4de3-affa-96d81f061ae9';
      break;
    case '성미산마을극장 향':
      alreadyExistingVenueId = '8ee7ad49-5ccd-4231-8c0e-092cc706e26a';
      break;
    case '포항시청 대잠홀, 포항문화예술회관':
      alreadyExistingVenueId = '0af26597-8b09-4acd-8960-5af13c75730c';
      break;
    case '리엠아트센터 LEEAM ART CENTER':
      alreadyExistingVenueId = 'b30163e8-88e5-4148-ba34-d89423d470d1';
      break;
    case '씨드콘서트홀(SEED CONCERT HALL)':
      alreadyExistingVenueId = '55e8ece3-cb26-44f0-8a61-811d80631056';
      break;
    case '이음아트홀 [대전]':
      alreadyExistingVenueId = '0753a0fc-3a88-4d98-b225-8b7783d99b66';
      break;
    case '엠스테이지 (구.인사아트홀)':
      alreadyExistingVenueId = '2c488b4f-9892-448d-8cd8-798c69c14aee';
      break;
    case '레이어 스튜디오 7 (LAYER 7)':
      alreadyExistingVenueId = 'e0dc5a73-1986-4cbe-b0e9-291a222b622b';
      break;
    case '대덕구문예회관 (구. 대덕구평생학습센터)':
      alreadyExistingVenueId = '654a7d21-0928-4513-b2b9-a5405d925276';
      break;
    case '극장 온 (ON) (구.CJ아지트)':
      alreadyExistingVenueId = '7f5ed04e-33bc-4dba-bc27-323072d968fd';
      break;
    case '꼬레오 그라운드':
      alreadyExistingVenueId = '79952443-898a-4e90-b6d4-22d53cb24fca';
      break;
    case '플러스씨어터(구. 컬처스페이스 엔유 구. 쁘티첼 씨어터)':
      alreadyExistingVenueId = 'c663fe2d-05b0-4204-acde-2d1092b1f077';
      break;
    case '창조문화활력센터 소극장 624':
      alreadyExistingVenueId = '6eae4bd0-634a-48b8-84d4-0eb4a55c57cc';
      break;
    case '소극장 울림터 (극단 메카네)':
      alreadyExistingVenueId = '43dbc50d-6489-46eb-b87b-86fa9e796014';
      break;
    case 'KT&amp;G 상상마당 라이브홀 [마포] (KT&amp;G 상상마당 라이브홀 [마포] )':
      alreadyExistingVenueId = '3149ac24-9b5d-4130-8bf2-6cbe8cd561f4';
      break;
    case 'KT&amp;G 상상마당 대치아트홀 (KT&amp;G 상상마당 대치아트홀)':
      alreadyExistingVenueId = 'd39c992c-5fb3-4ff5-85db-db3f0139255b';
      break;
    case 'KT&amp;G 상상마당 라이브홀 [부산] (라운지)':
      alreadyExistingVenueId = '3078c04e-db1d-4934-9b75-e453c5cf6901';
      break;
    case 'KT&amp;G 상상마당 [춘천] (사운드홀)':
      alreadyExistingVenueId = 'abefb7ea-8b38-4aae-94ad-b758600cade1';
      break;
    case '제주호은아트센터(구.섬아이뮤직아트센터)':
      alreadyExistingVenueId = '75e5bbb2-fcee-42f1-8c23-96f630379937';
      break;
    case '천안어린이꿈누리터 (구. 천안시 어린이 회관)':
      alreadyExistingVenueId = '5f21bc1d-9824-405c-bbf0-ad8b56d72449';
      break;
    case '휘게홀':
      alreadyExistingVenueId = 'ce4df961-0ad9-4132-bac4-31c1ffccf285';
      break;
    case '공간울림연주홀':
      alreadyExistingVenueId = '0e0ef235-7b56-4d4c-a9f6-cd8a1cf3e7c0';
      break;
    case '북극곰소극장(구.아뮤스소극장)':
      alreadyExistingVenueId = 'c6a399b5-51a3-4c29-833e-0dab83ac0d3f';
      break;
    case '나인진홀 (구.청년극장)':
      alreadyExistingVenueId = '81554270-abd4-490b-ba58-9ed8044da588';
      break;
    case '옵신 스페이스(구. 서촌공간 서로)':
      alreadyExistingVenueId = '5266080e-3d13-44b8-9259-68f1a3bad075';
      break;
    case '노크 클럽(KNOCK CLUB)':
      alreadyExistingVenueId = 'ea94153f-af6f-4e3a-9d67-47df7cea95fc';
      break;
    case '선릉문화공간 제이드409':
      alreadyExistingVenueId = '482a6cd4-0352-4c3c-9959-46bcf5bc0890';
      break;
    case '여수엑스포컨벤션센터 (여수세계박람회장)':
      alreadyExistingVenueId = '9253d214-2fb7-4104-8666-d72bbbe2e567';
      break;
    case 'TINC This is Not a Church(구. 명성교회)':
      alreadyExistingVenueId = '4a33ac9d-afed-4b04-98ba-23e9d58855cc';
      break;
    case '예스24 라이브홀 (구. 악스코리아)':
      alreadyExistingVenueId = '941e5df0-e1e4-4b39-9ca0-6c0a134ac5c7';
      break;
    case '강릉아트센터 (구. 강릉문화예술관)':
      alreadyExistingVenueId = 'fd29a778-80d0-44d6-a90f-2f118192ec4c';
      break;
    case '무신사 개러지 (구. 왓챠홀)':
      alreadyExistingVenueId = 'c2e728e7-113f-43b1-9df0-7970f05594a4';
      break;
    case '경기아트센터(구. 경기도문화의전당)':
      alreadyExistingVenueId = '1a2205f7-1571-4a3a-8cd3-3abaecc330e6';
      break;
    case '재즈인연구소':
      alreadyExistingVenueId = '83f23de8-b900-438a-b586-a49b9fb28175';
      break;
    case '플렉스라운지 (구. 스테이라운지, 구. 인디팍)':
      alreadyExistingVenueId = '8b2dcd30-f60c-40a4-8576-c497844ac725';
      break;
    case '노원어린이극장 (구.노원어울림극장)':
      alreadyExistingVenueId = 'e8cb24cb-a406-4e75-9f84-bf8f00073e87';
      break;
    case '관악아트홀 (구. 관악문화관)':
      alreadyExistingVenueId = '4d9ea66d-c190-4aeb-8552-780f4dba593b';
      break;
    case '지구인아트홀 (구. 해오름 예술극장)':
      alreadyExistingVenueId = '6fbab0c7-a06e-4172-923e-2da0373bd639';
      break;
    case '어울아트센터(구. 대구북구문예회관)':
      alreadyExistingVenueId = 'dc5b2af6-87fc-4e43-bafa-0b301b68d656';
      break;
    case '예스24 스테이지(구. DCF대명문화공장)':
      alreadyExistingVenueId = '8eec9805-13a0-4b6e-bd8f-7c75bad40117';
      break;
    case '비오케이아트센터(BOK아트센터)':
      alreadyExistingVenueId = '1e24b7a6-12d4-4fc5-ab20-4ea70114b1e0';
      break;
    case '예술의 전당 [광주] (구. 광주문화예술회관)':
      alreadyExistingVenueId = '833f60d2-d030-4672-8638-29eb409d3ed8';
      break;
    case '시흥ABC행복학습센터':
      alreadyExistingVenueId = '452b05f3-f8dd-4bf9-8fe3-970c26f7a1fe';
      break;
    case '광주시문화예술의전당 (구. 남한산성아트홀)':
      alreadyExistingVenueId = '833f60d2-d030-4672-8638-29eb409d3ed8';
      break;
    case '대원 팝콘D 스퀘어':
      alreadyExistingVenueId = 'bad04487-3a9f-48fa-aaa6-6a5b430dc630';
      break;
    case '꾸꾸플루트 (경복궁 클래식)':
      alreadyExistingVenueId = '2fe4ae33-b45e-40c7-955e-48cf8fd82663';
      break;
    case '서울숲 스튜디오301':
      alreadyExistingVenueId = '889d78d8-aa02-42ac-9141-a2f1ffce5ebf';
      break;
    case '신세계 문화홀 8층 [대구]':
      alreadyExistingVenueId = 'db057eed-89bd-49f7-8f25-d658ecbc5c9c';
      break;
    case '스테이지엠 (STAGE M) (구.프란츠홀)':
      alreadyExistingVenueId = '84e27e49-0d01-4b28-a3f5-08f4e5ca27a3';
      break;
    case '에이치아츠(H-Art)':
      alreadyExistingVenueId = '8db30137-ec14-402d-baf7-0c99538b5b02';
      break;
    case '청주아트홀 (구. 청주시민회관)':
      alreadyExistingVenueId = 'c7e4ad20-1b9f-4b3a-89f9-650d2e9f7d6f';
      break;
    case '달서아트센터 (구. 웃는얼굴아트센터)':
      alreadyExistingVenueId = '8c177f5e-440a-4432-bf5c-36a9e8159aca';
      break;
    case '성남아트리움 (구. 성남시민회관)':
      alreadyExistingVenueId = 'bd1b23ba-21fe-4f25-9d96-1c74712c281e';
      break;
    case '대학로 마로니에소극장(플레이더씨어터)':
      alreadyExistingVenueId = '7ff3a78f-a60d-40be-82eb-5ecdcb09dac4';
      break;
    case '올림아트센터 (구.스튜디오76)':
      alreadyExistingVenueId = '7b4c20b2-f198-4bc2-876d-16eb374c35b8';
      break;
    case '상상플레이스 여순광점(여수 웅천 트리마제벨마레 2305호)':
      alreadyExistingVenueId = 'b04510a8-4917-4852-b44f-235fc9158e94';
      break;
    case '씨어터조이 (구. 마당세실극장)':
      alreadyExistingVenueId = 'd51df2d9-86aa-4cfe-8dc1-3dcd0f0c4887';
      break;
    case '예스24아트원(구.대학로아트원씨어터)':
      alreadyExistingVenueId = '26e1576c-448e-40f5-a074-4208c2f583cf';
      break;
    case '소극장 혜화당 (구. 까망소극장)':
      alreadyExistingVenueId = 'eb1007d9-2113-41bf-adb8-26714bc5ae45';
      break;
    case '공간소극장 [대연역]':
      alreadyExistingVenueId = '64bb85f4-4351-45d8-adb9-68097ae0e1af';
      break;
    case '어댑터씨어터 1관 (구.어댑터플레이스)':
      alreadyExistingVenueId = '830f5825-c00a-4c4d-ba80-03167e4cff4a';
      break;
    case '한성아트홀(구. 인켈아트홀)':
      alreadyExistingVenueId = '8cc77556-bf4e-4000-b5e9-6f1b1b307034';
      break;
    case '기분좋은극장 [상무지구]':
      alreadyExistingVenueId = 'e27586ec-f8b4-460c-a9b7-2fd31d83fa9a';
      break;
    case '서울문화재단 대학로극장 쿼드(예술청)':
      alreadyExistingVenueId = '87c691d1-f4f7-4c75-a944-9245855ac693';
      break;
    case '대학로 이음센터(한국장애인문화예술원)':
      alreadyExistingVenueId = 'cf441c32-1fb6-4eb1-afde-03c175118333';
      break;
    case '국립정동극장 세실 (구.세실극장)':
      alreadyExistingVenueId = '8d36d336-af4f-4e57-ac85-e30541d4d5a6';
      break;
    case '경기아트센터 경기국악원':
      alreadyExistingVenueId = 'abc7f0fa-3acc-4271-bc88-6a4e16c7cc1e';
      break;
    case '신한카드 SOL페이 스퀘어(구.신한pLay 스퀘어)':
      alreadyExistingVenueId = 'e6530971-b772-48bc-950d-af3a21e8a751';
      break;
    case '성북미디어문화마루 꿈빛극장':
      alreadyExistingVenueId = '56f9c155-a5f6-480e-bf4f-cd59999b67e2';
      break;
    case '한국가곡예술마을 나음아트홀':
      alreadyExistingVenueId = '12b33485-84c4-4649-b34c-483ada167920';
      break;
    case '오아스페이스(구, 스페이스 홍)':
      alreadyExistingVenueId = 'bf54bdb3-beba-465b-959e-5d1ec43b5890';
      break;
    case '벨로주 [홍대] (구. 왓에버)':
      alreadyExistingVenueId = '25b55825-cf91-47f0-8360-f1ebd1d7a1ce';
      break;
    case '몽향라이브홀':
      alreadyExistingVenueId = 'b722ae3c-bc81-4afc-ab65-2f9e3f514b4b';
      break;
    case '프리즘홀 (프리즘플러스)':
      alreadyExistingVenueId = '152cca7e-8618-42de-965d-92816f6c5274';
      break;
    case 'Baby Doll (베이비돌)':
      alreadyExistingVenueId = '84666f0f-8d41-431c-a16c-98af65cb196c';
      break;
    case '엠팟홀 (구. 삼익아트홀)':
      alreadyExistingVenueId = 'e3b56076-7042-47cc-9899-80f93cbf3f5b';
      break;
    case '한국방송회관 코바코홀 (구. 브로드홀)':
      alreadyExistingVenueId = '8ced6eb9-0dea-41b5-9b04-cad781f1ec83';
      break;
    case 'et theatre 1 (구. 눈빛극장)':
      alreadyExistingVenueId = '12ace886-1dfc-474e-9c13-d4bd3b3ed749';
      break;
    case '천안어린이꿈누리터(구. 천안시 어린이 회관)':
      alreadyExistingVenueId = '5f21bc1d-9824-405c-bbf0-ad8b56d72449';
      break;
    case '칸타빌레 클래식 아트홀':
      alreadyExistingVenueId = '47e5d97f-bd08-48e0-ba6b-9777450577e9';
      break;
    case '디라이트 아트 홀':
      alreadyExistingVenueId = '0ee10aad-39d3-4a24-9567-1d6dd9ebe511';
      break;
    case '제이원 씨어터 (구. 서완소극장, 구. 씨어터고리)':
      alreadyExistingVenueId = '7dfec303-8226-4adc-8b53-555d328e5cf5';
      break;
    case '극장 봄 (봄소극장)':
      alreadyExistingVenueId = '0f885b2e-01f0-4697-bdbd-1d220552e747';
      break;
    case '강릉단오제전수교육관 (구. 단오문화관)':
      alreadyExistingVenueId = '0e1e77be-6973-41a0-8ebd-4e1908d95dcf';
      break;
    case '창조소극장 (구. 민아트홀)':
      alreadyExistingVenueId = 'd575a084-fa9d-41dc-8fcb-bdd5f774d135';
      break;
    case '노원구민의전당(구. 노원구민회관)':
      alreadyExistingVenueId = 'be26ade3-f942-44db-95c6-5be1748a7a4b';
      break;
    case '서초문화예술회관(구. 서초구민회관)':
      alreadyExistingVenueId = '8b7f588e-0426-4462-b5bc-eb3def704f58';
      break;
    case '미아리고개예술극장(구. 미아리예술극장)':
      alreadyExistingVenueId = '9aec18fd-c5c7-4be2-ad7d-1efc197a4ac8';
      break;
    case '전통공연창작마루 광무대':
      alreadyExistingVenueId = 'e892e1b5-bce8-4b18-91c4-4824575b697d';
      break;
    case '부산북구문화예술회관 (구.북구문화빙상센터)':
      alreadyExistingVenueId = '077d591e-4731-4ec7-8e49-0dd6158f1971';
      break;
    case 'CLUB bender(클럽 벤더)':
      alreadyExistingVenueId = '086ef019-7cfa-48dd-b160-9812a9503f90';
      break;
    case '얼라이브홀(구. 크랙홀)':
      alreadyExistingVenueId = '91aa905a-7f48-4c71-b06a-e2561126678b';
      break;
    case '문기타, 문씨어터 [진주]':
      alreadyExistingVenueId = '56924276-fe6c-4298-82c7-e4d014fc12cd';
      break;
    case '뜻밖의 극장(구. 해우소소극장)':
      alreadyExistingVenueId = '06396c3d-65b3-4434-a121-85a078e6f2ee';
      break;
    case '민송아트홀 (구. 브로드웨이아트홀)':
      alreadyExistingVenueId = '73cc51b7-b8de-46d3-9005-bdb6c4daa707';
      break;
    case '소극장 플랫폼74':
      alreadyExistingVenueId = 'f25c2aec-3003-4400-91d7-a7005ac67acc';
      break;
    case '예술의전당 [서울]':
      alreadyExistingVenueId = '0ab15b5d-73ac-4f29-ac15-53aa2a12d95d';
      break;
    case 'JCC 아트센터':
      alreadyExistingVenueId = '2f6c8b48-ddc6-49a7-a217-83b2c0cc3df6';
      break;
    case '평택시남부문예회관':
      alreadyExistingVenueId = '296183d7-3bc8-4ccd-9e6b-aed4b7a37173';
      break;
    case '평택시북부문예회관':
      alreadyExistingVenueId = 'ccc6ccde-888d-4a63-ab6d-412ae68fecac';
      break;
    case '성남아트센터':
      alreadyExistingVenueId = 'c90aa6e9-cb7c-4b3b-8181-0821e6692082';
      break;
    case '마포아트센터':
      alreadyExistingVenueId = 'ef3d2100-41ac-4255-b232-12bec63e2d3a';
      break;
    case '대전예술의전당':
      alreadyExistingVenueId = '5aba1787-b5f4-43b9-b8e5-f8ab5a685bf8';
      break;
    case '한국콘텐츠진흥원 CKL스테이지':
      alreadyExistingVenueId = 'f5c8c360-571e-4422-add5-b3dbd7f0f52f';
      break;
    case '음악공간 벙커 [일산]':
      alreadyExistingVenueId = '4317ef1f-d5d3-4389-8f0f-c7d58672cc43';
      break;
    case 'G스페이스홀 (지스페이스홀)':
      alreadyExistingVenueId = '463a540c-f177-4be3-9d28-cee65c4f16b7';
      break;
    case 'GS아트센터 (GS아트센터)':
      alreadyExistingVenueId = '97a14419-dfe0-450c-8e63-47cadca6e214';
      break;
    case '스케치홀 (구.소극장 선물 1관)':
      alreadyExistingVenueId = '6dad0dc3-333d-4b7a-aa15-5832309545bb';
      break;
    case 'K-POP STAGE (구. 윤형빈소극장 [홍대] )':
      alreadyExistingVenueId = '3dd727ea-d661-4a15-b99f-adf1118a5270';
      break;
    case '에이치아츠 (H-Art)':
      alreadyExistingVenueId = '8db30137-ec14-402d-baf7-0c99538b5b02';
      break;
    case '문래재즈IN':
      alreadyExistingVenueId = 'ef01b94d-f9d3-4039-8045-789263135fc4';
      break;
    case '서울문화재단 대학로극장 쿼드 (예술청)':
      alreadyExistingVenueId = '87c691d1-f4f7-4c75-a944-9245855ac693';
      break;
    case '논산아트센터(구. 논산문화예술회관)':
      alreadyExistingVenueId = '32cf20df-c9a9-4854-b1bf-066d2bb11989';
      break;
    case '청라복합문화센터 블루노바홀':
      alreadyExistingVenueId = '42d4466b-6145-4a1e-b977-f6b3d0c1e51a';
      break;
    case '가정생활문화센터 (구.가정청소년문화의집)':
      alreadyExistingVenueId = 'a3dd472e-e6af-4e78-b63b-aa30afb3bf81';
      break;
    case '티오엠씨어터(구. 문화공간필링)':
      alreadyExistingVenueId = '32c2acba-1a74-468e-9d18-6dad7f65f75b';
      break;
    case 'IPAC홀 (인터내셔널퍼포밍아트센터)':
      alreadyExistingVenueId = 'b96d1fdd-5d1b-4d37-9570-2e8e3ba61b44';
      break;
    case '아트센터소극장 (시네라마 아트센터)':
      alreadyExistingVenueId = '0b556844-c75a-4525-9c9a-eb27d476d11e';
      break;
    case '경북고령대가야문화누리 (구. 대가야국악당)':
      alreadyExistingVenueId = '476eedfd-ea34-469e-b6b9-0b6db103fc13';
      break;
    case '광주북구문화센터 (양산도서관)':
      alreadyExistingVenueId = 'd04158fd-f763-415e-bed0-c430ceee862a';
      break;
    case '안동시청 대동관(구. 안동시민회관)':
      alreadyExistingVenueId = 'c953a304-37c2-40ad-af07-df2417270fdf';
      break;
    case '쇼킹 케이팝 센터 (ShowKing K-POP Center)':
      alreadyExistingVenueId = 'dcbac8c6-7645-4f5e-b13a-5126655605d9';
      break;
    case '소명아트홀 (구.메가폴리스아트홀)':
      alreadyExistingVenueId = 'dfbf5eb7-a97b-4a3f-ba9a-75bece56602c';
      break;
    case '음악공간 중력장':
      alreadyExistingVenueId = 'efa1b50e-c69e-4ce7-91ab-5815d2b72d14';
      break;
    case '스튜디오 바이탈 바이브':
      alreadyExistingVenueId = '382002d1-8e3f-4220-92b9-d544edcc9f5c';
      break;
    case '파랑새극장(구. 샘터파랑새극장)':
      alreadyExistingVenueId = 'c1b03b48-5047-4c55-b7bc-f7eb6fcf5968';
      break;
    case '자양스테이션(파리뮤직포럼)':
      alreadyExistingVenueId = '28938749-b8cc-451a-a98e-0fea8991de9e';
      break;
    case '하하아트홀 (구. 성원아트홀)':
      alreadyExistingVenueId = 'a0150031-da37-48e3-b8d0-6b44dd5cc0ac';
      break;
    case '서울호서예술실용전문학교':
      alreadyExistingVenueId = '85fd415f-970a-4788-b97a-a113444c2988';
      break;
    case '아르코 꿈밭극장 (구.학전)':
      alreadyExistingVenueId = '763d73cf-bb05-4434-86ba-1467a19fdebd';
      break;
    case '스페이스 아텔 (space Artel)':
      alreadyExistingVenueId = '0c47afcd-1975-44e7-94cb-757dbbe6cf23';
      break;
    default:
      break;
  }

  if (alreadyExistingVenueId !== null) {
    const { data: existing, error } = await supabase
      .from('Venue')
      .select('*')
      .eq('id', alreadyExistingVenueId)
      .single(); // 1개만 가져온다는 의도 명확히
    if (error) {
      console.log(error);
    }
    return {
      existingVenue: existing,
      kakaoSearchFirstResult: null,
    };
  }
  const kakaoSearchResponse = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${venue}`,
    {
      headers: {
        Authorization: `KakaoAK ${Deno.env.get('KAKAO_REST_API_KEY')}`,
      },
    }
  );
  const kakaoJson = await kakaoSearchResponse.json();

  const venueName = kakaoJson?.documents?.[0]?.place_name ?? '';

  const { data, error } = await supabase.from('Venue').select('*').eq('name', venueName).limit(1); // 하나만 조회

  if (error) {
    console.log(error);
  }

  const existingVenue = data?.[0];

  return {
    existingVenue,
    kakaoSearchFirstResult: kakaoJson?.documents?.[0],
  };
}

async function connectOrCreatePoster(eventId: string, kopisPosterUrl: string) {
  // 2. 연결된 concertsOnDetailImages 존재 여부 확인
  const { data: postersOnConcert, error: postersLinkError } = await supabase
    .from('ConcertsOnPosters')
    .select('concertId')
    .eq('concertId', eventId)
    .limit(1);

  const alreadyConnectedPoster = !postersLinkError && postersOnConcert.length > 0;
  console.log('connectOrCreate', alreadyConnectedPoster, eventId);

  if (alreadyConnectedPoster) {
    return;
  }

  const { keys } = await uploadImageByResolutions({
    originalImageUrl: kopisPosterUrl,
    concertId: eventId,
    index: 0,
    type: 'poster',
  });

  await Promise.all(
    keys
      .filter((key) => !!key)
      .map(async (key) => {
        const posterId = randomUUID();
        console.log('posterId', posterId);
        const { data: poster, error: posterError } = await supabase
          .from('Poster')
          .insert({
            id: posterId,
            imageURL: `https://api.billets.coldsurf.io/v1/image?key=${key}`,
            keyId: key,
          })
          .select('*')
          .single();

        if (posterError) {
          console.error('포스터 생성 실패:', posterError);
          throw posterError;
        }

        const { error: relationError } = await supabase.from('ConcertsOnPosters').insert({
          posterId: poster.id,
          concertId: eventId,
        });

        if (relationError) {
          console.error('ConcertsOnPosters 생성 실패:', relationError);
        }
      })
  );
}

async function connectOrCreateVenue(venue: string, eventId: string) {
  const { existingVenue, kakaoSearchFirstResult } = await findVenue(venue);

  if (!existingVenue && !kakaoSearchFirstResult) {
    const { data: connected } = await supabase
      .from('ConcertsOnVenues')
      .select('concertId') // 꼭 필요한 필드만
      .eq('concertId', eventId)
      .maybeSingle();

    if (!connected) {
      console.log('not connected venue:', eventId, venue);
      await sendSlack({
        text: `🛠️ not connected venue: ${adminHost}/concert/${eventId}, ${venue}`,
      });
    }
  }

  if (!existingVenue) {
    if (kakaoSearchFirstResult) {
      const lat = +kakaoSearchFirstResult?.y;
      const lng = +kakaoSearchFirstResult?.x;
      const geohash = ngeohash.encode(lat, lng, 12);

      // 1. Venue 생성
      const venueId = randomUUID();
      console.log('venueId', venueId);
      const placeName = kakaoSearchFirstResult?.place_name;
      const { data: createdVenue, error: venueError } = await supabase
        .from('Venue')
        .insert({
          id: venueId,
          lat,
          lng,
          name: placeName,
          address: kakaoSearchFirstResult?.road_address_name,
          geohash,
          slug: await generateSlug(placeName),
        })
        .select('id') // 생성된 id를 받아오기 위해 select 사용
        .single(); // 하나의 row만 반환

      if (venueError || !createdVenue) {
        console.error('Venue 생성 실패:', venueError);
        // 필요하면 return 처리
      }

      // 2. ConcertsOnVenues 연결 정보 추가
      const { error: joinError } = await supabase.from('ConcertsOnVenues').insert({
        concertId: eventId,
        venueId: createdVenue?.id ?? '',
      });

      if (joinError) {
        console.error('ConcertsOnVenues 연결 실패:', joinError);
      }
    }
  } else {
    // 1. 기존 연결 확인
    const { data: connected, error: checkError } = await supabase
      .from('ConcertsOnVenues')
      .select('*')
      .eq('concertId', eventId)
      .eq('venueId', existingVenue.id)
      .maybeSingle(); // 혹시 없을 수도 있으므로 maybeSingle

    if (checkError) {
      console.error('연결 여부 확인 중 오류:', checkError);
    }

    // 2. 연결이 없다면 추가
    if (!connected) {
      const { error: insertError } = await supabase.from('ConcertsOnVenues').insert({
        concertId: eventId,
        venueId: existingVenue.id,
      });

      if (insertError) {
        console.error('ConcertsOnVenues 생성 오류:', insertError);
      }
    }
  }
}

const replacements = [
  [/#/g, 'no'],
  [/&/g, 'and'],
  [/%/g, 'percent'],
] as const;

function preprocess(title: string) {
  return replacements.reduce((acc, [regex, value]) => acc.replace(regex, value), title);
}

// 서수 접미사 함수
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatDateSlug(date: Date): string {
  const day = Number(format(date, 'd')); // 1~31
  const month = format(date, 'MMM').toLowerCase(); // "Oct" → "oct"
  const ordinal = getOrdinalSuffix(day);
  return `${day}${ordinal}-${month}`;
}

export async function generateSlug(title: string) {
  try {
    let slug = slugify.default(preprocess(`${title}`), {
      replacement: '-', // 공백을 "-"로 변환
      lower: true, // 소문자로 변환
      strict: false, // 특수 문자 제거
      remove: /[[\]*+~.()'"?!:@,<>〈〉]/g, // 특정 특수문자 제거
    });

    // Check for existing slugs in the database
    const res = await supabase.from('Concert').select('*').eq('slug', slug).maybeSingle(); // 해당 slug가 없을 수도 있으므로 maybeSingle 사용

    if (res.error) {
      console.error('Concert 조회 중 오류:', res.error);
    }

    let { data: existing } = res;

    // If slug already exists, append a number
    if (existing) {
      let counter = 1;
      let newSlug: string;
      do {
        newSlug = `${slug}-${counter}`;
        const { data: newData } = await supabase
          .from('Concert')
          .select('*')
          .eq('slug', newSlug)
          .maybeSingle();

        console.log({
          text: `while: newData ${newData}`,
        });
        existing = newData;
        counter++;
      } while (existing);
      slug = newSlug;
    }
    return slug;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// limit(동시 실행 개수)는 예를 들어 3개로 설정
const limit = pLimit(25);
const throttle = pThrottle({
  limit: 10,
  interval: 1000,
});

/**
 *
 * @param {number} page
 * @param {string} category
 * @returns
 */
async function insertKOPISEvents(
  page: number,
  category: (typeof KOPISEVENT_CATEGORIES)[keyof typeof KOPISEVENT_CATEGORIES]
) {
  // 현재 날짜
  const today = new Date();

  // 7일 전
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const currentDate = format(sevenDaysAgo, 'yyyyMMdd');
  const endDate = '20261231';
  const rows = 50;

  const response = await fetch(
    `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${kopisKey}&stdate=${currentDate}&eddate=${endDate}&rows=${rows}&cpage=${page}&shcate=${category}`
  );
  const xmlText = await response.text();

  const { dbs } = parser.parse(xmlText);
  const { db } = dbs;

  // @ts-expect-error: dbItem is any
  const items = db.map((dbItem) => ({
    id: dbItem.mt20id,
    title: dbItem.prfnm,
    poster: dbItem.poster,
    date: dbItem.prfpdfrom,
    venue: dbItem.fcltynm,
    area: dbItem.area,
  }));

  // 병렬 처리 시작
  await Promise.all(
    // @ts-expect-error: dbItem is any
    items.map((item) =>
      limit(async () => {
        const { data: kopis } = await supabase
          .from('KOPISEvent')
          .select('concertId')
          .eq('id', item.id)
          .single();
        const { data: existing } = await supabase
          .from('Concert')
          .select('*')
          .eq('id', kopis?.concertId ?? '')
          .single();

        if (existing) {
          console.log(`already existing: ${existing.id}`);
          await connectEventCategory(existing.id, category);
          await connectLocationCity(existing.id, item.area);
          await connectOrCreateVenue(item.venue, existing.id);
          await connectOrCreatePoster(existing.id, item.poster);
        } else {
          console.log(`not existing, ${item.title}`);
          const locationCityId = areaToLocationCityId(item.area);
          const dateSlug = formatDateSlug(new Date(item.date));
          const slug = await generateSlug(
            `${item.title}-${dateSlug}-${item.venue}-${item.area}-티켓`
          );

          const concertId = randomUUID();
          console.log('concertId', concertId);
          const { data: event, error: createConcertError } = await supabase
            .from('Concert')
            .insert({
              id: concertId,
              title: item.title,
              slug,
              date: new Date(item.date).toISOString(),
              isKOPIS: true,
              locationCityId: locationCityId ?? null,
              eventCategoryId: categoryToEventCategoryId(category),
            })
            .select('*')
            .single();

          if (createConcertError) {
            console.error('Concert 생성 실패:', createConcertError);
            await sendSlack({
              text: `Concert 생성 실패: ${JSON.stringify(createConcertError)}`,
            });
            throw createConcertError;
          }

          const { error: createKopisError } = await supabase.from('KOPISEvent').insert({
            id: item.id,
            concertId: event.id,
          });

          if (createKopisError) {
            console.error('KOPISEvent 생성 실패:', createKopisError);
          }

          await connectOrCreatePoster(event.id, item.poster);

          await connectOrCreateVenue(item.venue, event.id);

          await sendSlack({
            text: `🎉 newly created event, https://coldsurf.io/event/${slug}`,
          });
        }
      })
    )
  );

  return {
    items,
  };
}

function extractFirstTimes(input: string) {
  const regex = /[가-힣A-Z]+[\w\s~]*(\([\d:,]+\))/g; // Matches each day and its times
  const matches = input.match(regex);

  if (!matches) return [];

  return matches
    .map((match) => {
      const timeMatch = match.match(/\d{2}:\d{2}/); // Extract the first time
      return timeMatch ? timeMatch[0] : null;
    })
    .filter(Boolean); // Filter out null values
}

/**
 *
 * @param {string} kopisEventId
 * @param {string} timeString ex) 14:00
 */
async function updateTime(kopisEventId: string, eventDateString: Date) {
  const { data: kopisEventData, error: kopisError } = await supabase
    .from('KOPISEvent')
    .select('concertId')
    .eq('id', kopisEventId)
    .single();

  if (kopisError || !kopisEventData?.concertId) return;

  const { error: updateError } = await supabase
    .from('Concert')
    .update({
      date: eventDateString.toISOString(),
    })
    .eq('id', kopisEventData.concertId);

  if (updateError) {
    throw updateError;
  }
}

async function connectOrCreateDetailImage(kopisEventId: string, detailImageUrls: string[]) {
  const { data: kopisEventData, error: kopisError } = await supabase
    .from('KOPISEvent')
    .select('concertId')
    .eq('id', kopisEventId)
    .single();

  if (kopisError || !kopisEventData?.concertId) {
    console.error('KOPISEvent not found');
    return;
  }

  const concertId = kopisEventData.concertId;

  // 2. 연결된 concertsOnDetailImages 존재 여부 확인
  const { data: detailImagesOnConcert, error: detailImagesLinkError } = await supabase
    .from('ConcertsOnDetailImages')
    .select('concertId')
    .eq('concertId', concertId)
    .limit(1);

  if (detailImagesLinkError) {
    console.error('Error checking detailImages connection:', detailImagesLinkError);
    return;
  }

  const alreadyConnected = detailImagesOnConcert.length > 0;

  console.log(detailImageUrls);

  if (!alreadyConnected) {
    await Promise.all(
      detailImageUrls.map(async (detailImageUrl, index) => {
        // 3-0. upload detail image
        const { keys } = await uploadImageByResolutions({
          originalImageUrl: detailImageUrl,
          concertId,
          index,
          type: 'detail-image',
        });
        console.log({
          text: 'uploadDetailImage',
        });

        await Promise.all(
          keys
            .filter((key) => !!key)
            .map(async (key) => {
              // 3-1. DetailImage 생성
              const detailImageId = randomUUID();
              console.log('detailImageId', detailImageId);
              const { data: createdDetailImage, error: detailImageError } = await supabase
                .from('DetailImage')
                .insert({
                  id: detailImageId,
                  imageURL: `https://api.billets.coldsurf.io/v1/image?key=${key}`,
                  keyId: key,
                })
                .select('*')
                .single();

              console.log({
                text: 'createDetailImage',
              });

              if (detailImageError) {
                console.error('Error creating detail image:', detailImageError);
                await sendSlack({
                  text: `Error creating detail image: ${detailImageError}`,
                });
                return;
              }

              // 3-2. ConcertsOnDetailImages 연결
              const { error: connectError } = await supabase.from('ConcertsOnDetailImages').insert({
                concertId,
                detailImageId: createdDetailImage.id,
              });

              if (connectError) {
                console.error('Error connecting detail image to concert:', connectError);
              }
            })
        );
      })
    );
  }
}

async function connectOrCreateTicket(
  kopisEventId: string,
  ticketSeller: string,
  ticketURL: string
) {
  // 1. KOPISEvent에서 concertId 조회
  const { data: kopisEventData, error: kopisError } = await supabase
    .from('KOPISEvent')
    .select('concertId')
    .eq('id', kopisEventId)
    .single();

  if (kopisError || !kopisEventData?.concertId) {
    console.error('KOPISEvent not found');
    return;
  }

  const concertId = kopisEventData.concertId;

  // 2. 연결된 concertsOnTickets 존재 여부 확인
  const { data: ticketsOnConcert, error: ticketLinkError } = await supabase
    .from('ConcertsOnTickets')
    .select('concertId')
    .eq('concertId', concertId)
    .limit(1);

  if (ticketLinkError) {
    console.error('Error checking ticket connection:', ticketLinkError);
    return;
  }

  const alreadyConnected = ticketsOnConcert.length > 0;

  if (!alreadyConnected) {
    // 3-1. Ticket 생성
    const ticketId = randomUUID();
    console.log('ticketId', ticketId);
    const { data: createdTicket, error: ticketError } = await supabase
      .from('Ticket')
      .insert({
        id: ticketId,
        openDate: new Date().toISOString(),
        seller: ticketSeller,
        sellingURL: ticketURL,
      })
      .select()
      .single();

    if (ticketError) {
      console.error('Error creating ticket:', ticketError);
      await sendSlack({
        text: `Error creating ticket: ${ticketError}`,
      });
      return;
    }

    // 3-2. ConcertsOnTickets 연결
    const { error: connectError } = await supabase.from('ConcertsOnTickets').insert({
      concertId,
      ticketId: createdTicket.id,
    });

    if (connectError) {
      console.error('Error connecting ticket to concert:', connectError);
    }
  }
}

async function insertKOPISEventDetail(kopisEventId: string) {
  const response = await fetch(
    `http://www.kopis.or.kr/openApi/restful/pblprfr/${kopisEventId}?service=${Deno.env.get('KOPIS_KEY') ?? ''}`
  );
  const xmlText = await response.text();

  console.log(xmlText);

  const { dbs } = parser.parse(xmlText);

  const { db } = dbs;
  if (!db.relates) {
    return;
  }
  const { relates, dtguidance, prfpdfrom, styurls } = db;

  const parseDetailImage = (styurls: { styurl: string | string[] }) => {
    if (Array.isArray(styurls.styurl)) {
      return styurls.styurl;
    }
    return [styurls.styurl];
  };

  const detailImageUrl = parseDetailImage(styurls);
  console.log({
    text: `detailImageUrl: ${detailImageUrl}`,
  });
  if (detailImageUrl) {
    await connectOrCreateDetailImage(kopisEventId, detailImageUrl);
  }

  if (dtguidance && prfpdfrom) {
    const times = extractFirstTimes(dtguidance);
    if (times[0]) {
      /**
       * prfpdfrom: ex) 2024.01.01
       */
      // 문자열을 Date 객체로 파싱 (타임존 없음)
      const localDate = parse(`${prfpdfrom} ${times[0]}`, 'yyyy.MM.dd HH:mm', new Date());
      // 그걸 Asia/Seoul 기준으로 UTC로 변환
      const utcDate = fromZonedTime(localDate, 'Asia/Seoul');
      await updateTime(kopisEventId, utcDate);
    }
  }

  if (!relates.relate) {
    return;
  }
  const { relate } = relates;
  if (Array.isArray(relate)) {
    await Promise.all(
      relate.map(async (relate) => {
        if (relate.relatenm && relate.relateurl) {
          const { relatenm: ticketSeller, relateurl: ticketSellingURL } = relate;
          await connectOrCreateTicket(kopisEventId, ticketSeller, ticketSellingURL);
        }
      })
    );
  }
  if (!relate.relatenm || !relate.relateurl) {
    return;
  }
  const { relatenm: ticketSeller, relateurl: ticketSellingURL } = relate;

  await connectOrCreateTicket(kopisEventId, ticketSeller, ticketSellingURL);
}

async function sync(
  page: number,
  category: (typeof KOPISEVENT_CATEGORIES)[keyof typeof KOPISEVENT_CATEGORIES]
) {
  try {
    const { items } = await insertKOPISEvents(page, category);

    // insert를 "속도 제한"으로 감싼 래퍼
    const throttledInsert = throttle(async (id: string) => {
      try {
        await insertKOPISEventDetail(id);
        return id;
      } catch {
        return undefined;
      }
    });

    const successIds = await Promise.all(
      // @ts-expect-error: items is any
      items.map((item) =>
        limit(async () => {
          return await throttledInsert(item.id);
        })
      )
    );

    console.log(successIds);
  } catch (e) {
    console.error(e);
  }
}

serve(async (req) => {
  const body = await req.json();

  const page = body.page;
  const category = body.category;

  if (!page || !category) {
    return new Response(null, {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 400,
    });
  }

  const categoryValue = KOPISEVENT_CATEGORIES[category as keyof typeof KOPISEVENT_CATEGORIES];
  if (!categoryValue) {
    return new Response(null, {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 400,
    });
  }

  await sendSlack({
    text: `🔥 Sync in progress... ${page}, ${category}`,
  });

  await sync(+page, categoryValue);

  await sendSlack({
    text: `🔥 Sync done! ${page}, ${category}`,
  });

  return new Response(null, {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  });
});

/* eslint-disable @typescript-eslint/no-var-requires */
import { S3Client as AWSS3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import dotenv from 'dotenv';
import ngeohash from 'ngeohash';
import xml2js from 'xml2js';
import { generateSlug } from './generateSlug.mjs';

dotenv.config();

const S3Client = new AWSS3Client({
  region: process.env.COLDSURF_AWS_REGION,
  credentials: {
    accessKeyId: process.env.COLDSURF_AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.COLDSURF_AWS_SECRET_ACCESS_KEY ?? '',
  },
});

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

const parser = new xml2js.Parser({ explicitArray: false });

const KOPISEVENT_CATEGORIES = {
  대중음악: 'CCCD',
  연극: 'AAAA',
  '서양음악(클래식)': 'CCCA',
  '한국음악(국악)': 'CCCC',
  뮤지컬: 'GGGA',
  '무용(서양/한국무용)': 'BBBC',
  대중무용: 'BBBE',
};

function categoryToEventCategoryId(category) {
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

function areaToLocationCityId(area) {
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

function extractFirstTimes(input) {
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

async function uploadPoster(posterUrl) {
  const fetchedPoster = await fetch(posterUrl);
  const buffer = await fetchedPoster.arrayBuffer();
  const posterKey = `billets/poster-thumbnails/${new Date().toISOString()}`;
  await S3Client.send(
    new PutObjectCommand({
      Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
      Key: posterKey,
      Body: buffer,
      ContentType: 'image/png',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  return {
    posterKey,
  };
}

async function findVenue(venue) {
  let alreadyExistingVenueId = null;
  switch (venue) {
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
    default:
      break;
  }

  if (alreadyExistingVenueId !== null) {
    const existing = await dbClient.venue.findUnique({
      where: {
        id: alreadyExistingVenueId,
      },
    });
    return {
      existingVenue: existing,
      kakaoSearchFirstResult: null,
    };
  }
  const kakaoSearchResponse = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${venue}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
      },
    }
  );
  const kakaoJson = await kakaoSearchResponse.json();
  const existingVenue = (
    await dbClient.venue.findMany({
      where: {
        name: kakaoJson?.documents?.[0]?.place_name ?? '',
      },
    })
  ).at(0);

  return {
    existingVenue,
    kakaoSearchFirstResult: kakaoJson?.documents?.[0],
  };
}

/**
 *
 * @param {string} kopisEventId
 * @param {string} timeString ex) 14:00
 */
async function updateTime(kopisEventId, eventDate) {
  const existingEvent = await dbClient.concert.findFirst({
    where: {
      kopisEvent: {
        id: kopisEventId,
      },
    },
  });
  if (!existingEvent) {
    return;
  }
  await dbClient.concert.update({
    where: {
      id: existingEvent.id,
    },
    data: {
      date: eventDate,
    },
  });
}

async function connectOrCreateTicket(kopisEventId, ticketSeller, ticketURL) {
  const existingEvent = await dbClient.concert.findFirst({
    where: {
      kopisEvent: {
        id: kopisEventId,
      },
    },
  });
  if (!existingEvent) {
    return;
  }
  const connectedTicket = (
    await dbClient.concertsOnTickets.findMany({
      where: {
        concertId: existingEvent.id,
      },
    })
  ).at(0);

  if (!connectedTicket) {
    const createdTicket = await dbClient.ticket.create({
      data: {
        openDate: new Date(),
        seller: ticketSeller,
        sellingURL: ticketURL,
      },
    });
    await dbClient.concertsOnTickets.create({
      data: {
        concertId: existingEvent.id,
        ticketId: createdTicket.id,
      },
    });
  }
}

async function connectEventCategory(eventId, category) {
  const eventCategoryId = categoryToEventCategoryId(category);
  if (!eventCategoryId) {
    return;
  }
  await dbClient.concert.update({
    where: {
      id: eventId,
    },
    data: {
      eventCategory: {
        connect: {
          id: eventCategoryId,
        },
      },
    },
  });
}

async function connectLocationCity(eventId, area) {
  const locationCityId = areaToLocationCityId(area);
  if (!locationCityId) {
    return;
  }
  await dbClient.concert.update({
    where: {
      id: eventId,
    },
    data: {
      locationCity: {
        connect: {
          id: locationCityId,
        },
      },
    },
  });
}

async function connectOrCreateVenue(venue, eventId) {
  const { existingVenue, kakaoSearchFirstResult } = await findVenue(venue);

  if (!existingVenue && !kakaoSearchFirstResult) {
    const connected = (
      await dbClient.concertsOnVenues.findMany({
        where: {
          concertId: eventId,
        },
      })
    ).at(0);
    if (!connected) {
      console.log('not connected venue:', eventId, venue);
    }
  }

  if (!existingVenue) {
    if (kakaoSearchFirstResult) {
      const lat = +kakaoSearchFirstResult?.y;
      const lng = +kakaoSearchFirstResult?.x;
      const geohash = ngeohash.encode(lat, lng, 12);
      const createdVenue = await dbClient.venue.create({
        data: {
          lat,
          lng,
          name: kakaoSearchFirstResult?.place_name,
          address: kakaoSearchFirstResult?.road_address_name,
          geohash,
        },
      });
      await dbClient.concertsOnVenues.create({
        data: {
          concertId: eventId,
          venueId: createdVenue.id,
        },
      });
    }
  } else {
    const connected = await dbClient.concertsOnVenues.findUnique({
      where: {
        concertId_venueId: {
          concertId: eventId,
          venueId: existingVenue.id,
        },
      },
    });
    if (!connected) {
      await dbClient.concertsOnVenues.create({
        data: {
          concertId: eventId,
          venueId: existingVenue.id,
        },
      });
    }
  }
}

/**
 *
 * @param {number} page
 * @param {string} category
 * @returns
 */
async function insertKOPISEvents(page, category) {
  const currentDate = format(new Date(), 'yyyyMMdd');
  const endDate = '20261231';
  const response = await fetch(
    `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.KOPIS_KEY}&stdate=${currentDate}&eddate=${endDate}&rows=100&cpage=${page}&shcate=${category}`
  );
  const xmlText = await response.text();

  const parsePromise = () =>
    new Promise((resolve, reject) => {
      parser.parseString(xmlText, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.dbs);
      });
    });

  const dbs = await parsePromise();
  const { db } = dbs;
  const items = db.map((dbItem) => {
    return {
      id: dbItem.mt20id,
      title: dbItem.prfnm,
      poster: dbItem.poster,
      date: dbItem.prfpdfrom,
      venue: dbItem.fcltynm,
      area: dbItem.area,
    };
  });

  for (const item of items) {
    const existing = (
      await dbClient.concert.findMany({
        where: {
          kopisEvent: {
            id: item.id,
          },
        },
      })
    ).at(0);
    if (existing) {
      await connectEventCategory(existing.id, category);
      await connectLocationCity(existing.id, item.area);
      await connectOrCreateVenue(item.venue, existing.id);
    } else {
      const locationCityId = areaToLocationCityId(item.area);
      const slug = await generateSlug(item.title);
      const event = await dbClient.concert.create({
        data: {
          title: item.title,
          slug,
          date: new Date(item.date),
          isKOPIS: true,
          kopisEvent: {
            create: {
              id: item.id,
            },
          },
          ...(locationCityId && {
            locationCity: {
              connect: {
                id: locationCityId,
              },
            },
          }),
          eventCategory: {
            connect: {
              id: categoryToEventCategoryId(category),
            },
          },
        },
      });
      const { posterKey } = await uploadPoster(item.poster);
      const poster = await dbClient.poster.create({
        data: {
          imageURL: `https://api.billets.coldsurf.io/v1/image?key=${posterKey}`,
        },
      });
      await dbClient.concertsOnPosters.create({
        data: {
          posterId: poster.id,
          concertId: event.id,
        },
      });
      await connectOrCreateVenue(item.venue, event.id);
      console.log('newly created event', event.id);
    }
  }

  return {
    items,
  };
}

async function insertKOPISEventDetail(kopisEventId) {
  const response = await fetch(
    `http://www.kopis.or.kr/openApi/restful/pblprfr/${kopisEventId}?service=${process.env.KOPIS_KEY}`
  );
  const xmlText = await response.text();

  const parsePromise = () =>
    new Promise((resolve, reject) => {
      parser.parseString(xmlText, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.dbs);
      });
    });

  const dbs = await parsePromise();
  const { db } = dbs;
  if (!db.relates) {
    return;
  }
  const { relates, dtguidance, prfpdfrom } = db;

  if (dtguidance && prfpdfrom) {
    const times = extractFirstTimes(dtguidance);
    if (times[0]) {
      /**
       * prfpdfrom: ex) 2024.01.01
       */
      const eventDate = new Date(`${prfpdfrom} ${times[0]}`);
      await updateTime(kopisEventId, eventDate);
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

const success = [];

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

async function main() {
  try {
    await dbClient.$connect();
    const { items } = await insertKOPISEvents(2, KOPISEVENT_CATEGORIES['한국음악(국악)']);
    await dbClient.$disconnect();
    await Promise.all(
      items.map(async (item, index) => {
        await sleep();
        await dbClient.$connect();
        await insertKOPISEventDetail(item.id);
        console.log(item.id, index);
        success.push(item.id);
        await dbClient.$disconnect();
      })
    );
  } catch (e) {
    console.error(e);
  } finally {
    console.log(success);
    await dbClient.$disconnect();
  }
}

main();

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function restore남부터미널() {
  try {
    await dbClient.$connect();
    const ids = [];

    await Promise.all(
      ids.map(async (concertId) => {
        const existing = await dbClient.concertsOnVenues.findUnique({
          where: {
            concertId_venueId: {
              concertId,
              venueId: 'ab49e350-1f23-4c17-9d43-d4197dc230e2',
            },
          },
        });

        if (existing) {
          await dbClient.concertsOnVenues.delete({
            where: {
              concertId_venueId: {
                concertId,
                venueId: 'ab49e350-1f23-4c17-9d43-d4197dc230e2',
              },
            },
          });
        }

        await dbClient.concertsOnVenues.create({
          data: {
            concertId,
            venueId: '0ab15b5d-73ac-4f29-ac15-53aa2a12d95d',
          },
        });
      })
    );
  } catch (e) {
    console.error(e);
  } finally {
    await dbClient.$disconnect();
  }
}

// restore남부터미널()

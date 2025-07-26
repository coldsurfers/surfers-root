export const TEST_UPLOAD_INPUT_DATA = {
  artist: '해리스타일스',
  date: '2023-03-25T11:00:00.000Z',
  posterURLs: [
    'https://fstvllife-images.s3.ap-northeast-2.amazonaws.com/poster-thumbnails/2023-01-23T01:42:26.603Z',
  ],
  tickets: [
    {
      openDate: '2022-11-25T03:00:00.000Z',
      price: 86000,
      priceCurrency: 'KRW',
      seller: '예스24',
      sellingURL: 'https://ticket.yes24.com/harrystyles',
    },
  ],
  title: '해리스타일스 내한공연',
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_ORDER_BY_CREATED_AT = 'desc';

export const COOKIE_ACCESS_TOKEN_KEY = '@wamuseum/accessToken';
export const COOKIE_REFRESH_TOKEN_KEY = '@wamuseum/refreshToken';

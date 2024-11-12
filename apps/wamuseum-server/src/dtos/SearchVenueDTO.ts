import axios from 'axios'
import { z } from 'zod'
import { KAKAO_SEARCH_LOCAL_BY_KEYWORD_URL } from '../libs/constants'

export const kakaoSearchDocumentSchema = z.object({
  address_name: z.string(),
  category_group_code: z.string(),
  category_group_name: z.string(),
  category_name: z.string(),
  distance: z.string(),
  id: z.string(),
  phone: z.string(),
  place_name: z.string(),
  place_url: z.string(),
  road_address_name: z.string(),
  x: z.string(),
  y: z.string(),
})

export const kakaoSearchSchema = z.object({
  documents: z.array(kakaoSearchDocumentSchema),
  meta: z.object({
    is_end: z.boolean(),
    pageable_count: z.number(),
    same_name: z.object({
      keyword: z.string(),
      region: z.array(z.unknown()),
      selected_region: z.string(),
    }),
    total_count: z.number(),
  }),
})

type SearchVenueDTOProps = z.infer<typeof kakaoSearchDocumentSchema>
export type SearchVenueDTOSerialized = z.infer<typeof kakaoSearchDocumentSchema>

export default class SearchVenueDTO {
  props: SearchVenueDTOProps

  constructor(props: SearchVenueDTOProps) {
    this.props = props
  }

  static async search(keyword: string) {
    const { data } = await axios.get<z.infer<typeof kakaoSearchSchema>>(
      `${KAKAO_SEARCH_LOCAL_BY_KEYWORD_URL}?query=${keyword}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.WAMUSEUM_SERVER_KAKAO_REST_API_KEY}`,
        },
      },
    )

    return data.documents.map((document) => new SearchVenueDTO(document))
  }

  serialize(): SearchVenueDTOSerialized {
    return {
      ...this.props,
    }
  }
}

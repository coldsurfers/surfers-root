import { mmkvKeys } from './constants'
import { mmkvInstance } from './mmkvInstance'

export const concertDetailCountForStoreReviewStorage = {
  set: (value: number) => {
    mmkvInstance.set(mmkvKeys.concertDetailCountForStoreReview, value)
  },
  get: () => {
    return mmkvInstance.getNumber(mmkvKeys.concertDetailCountForStoreReview)
  },
}

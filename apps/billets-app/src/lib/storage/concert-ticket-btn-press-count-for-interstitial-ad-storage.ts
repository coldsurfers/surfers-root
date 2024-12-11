import { mmkvKeys } from './constants'
import { mmkvInstance } from './mmkvInstance'

export const concertTicketBtnPressCountForInterstitialAdStorage = {
  set: (value: number) => {
    mmkvInstance.set(mmkvKeys.concertTicketBtnPressCountForInterstitialAd, value)
  },
  get: () => {
    return mmkvInstance.getNumber(mmkvKeys.concertTicketBtnPressCountForInterstitialAd)
  },
}

import { requestReview } from 'react-native-store-review'

export const useStoreReview = () => {
  const _requestReview = () => {
    requestReview()
  }
  return {
    requestReview: _requestReview,
  }
}

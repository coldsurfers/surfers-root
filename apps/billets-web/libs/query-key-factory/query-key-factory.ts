import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'

const billets = createQueryKeys('billets', {
  concerts: ['concerts'],
})

export const queryKeys = mergeQueryKeys(billets)

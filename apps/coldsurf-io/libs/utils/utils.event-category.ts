import { cache } from 'react'
import { apiClient } from '../openapi-client'

export const validateEventCategoryParam = cache(async (eventCategoryParam: string) => {
  const eventCategory = (() => {
    const decoded = decodeURIComponent(eventCategoryParam)
    return `${decoded[0].toUpperCase()}${decoded.slice(1)}`
  })()
  const eventCategories = await apiClient.eventCategory.getEventCategories()

  const isValidEventCategory = eventCategories.some((c) => {
    return c.name === eventCategory
  })
  if (!isValidEventCategory) {
    return {
      isValid: false,
      data: null,
    } as const
  }
  const remoteEventCategory = eventCategories.find((c) => c.name === eventCategory)
  if (!remoteEventCategory) {
    return {
      isValid: false,
      data: null,
    } as const
  }
  return {
    isValid: true,
    data: {
      ...remoteEventCategory,
    },
  } as const
})

export const getEventCategoryUIName = (originalName: string) => {
  switch (originalName) {
    case 'Gigs':
      return '콘서트'
    case 'Theatre':
      return '연극 / 뮤지컬'
    case 'Dance':
      return '무용'
    default:
      return originalName
  }
}

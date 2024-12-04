import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { LatLng } from '../types/LatLng'

// if you prefer to declare everything in one file
export const v1QueryKeyFactory = createQueryKeyStore({
  users: {
    all: ['v1', 'users'],
    me: ['v1', 'users', 'me'],
  },
  concerts: {
    all: ['v1', 'concerts'],
    list: (params: { latLng: LatLng }) => ['v1', 'concerts', 'list', params],
    listByVenueId: (params: { venueId: string }) => ['v1', 'concerts', 'list', 'venueId', params],
    listByArtistId: (params: { artistId: string }) => ['v1', 'concerts', 'list', 'artistId', params],
    searchList: (params: { keyword: string }) => ['v1', 'concerts', 'search-list', params],
    detail: (params: { concertId: string }) => ['v1', 'concerts', 'detail', params],
    subscribedList: ['v1', 'concerts', 'subscribed-list'],
    subscribed: (params: { concertId: string }) => ['v1', 'concerts', 'subscribed', params],
  },
  search: {
    all: ['v1', 'search'],
    list: (params: { keyword: string }) => ['v1', 'search', 'list', params],
  },
  artists: {
    detail: (params: { id: string }) => ['v1', 'artists', params],
  },
  venues: {
    detail: (params: { id: string }) => ['v1', 'venues', params],
  },
})

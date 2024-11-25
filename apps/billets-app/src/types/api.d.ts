/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v1/auth/email/confirm-auth-code': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['ConfirmAuthCodeBody']
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ConfirmAuthCodeSuccessResponse']
          }
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/auth/email/send-auth-code': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['ConfirmAuthCodeSuccessResponse']
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ConfirmAuthCodeSuccessResponse']
          }
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/auth/signin': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['SignUpBody']
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SignUpSuccessResponse']
          }
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/auth/signup': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['SignUpBody']
        }
      }
      responses: {
        /** @description Default Response */
        201: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SignUpSuccessResponse']
          }
        }
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/concert/': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query: {
          latitude?: string
          longitude?: string
          offset: string
          size: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ConcertSearchSuccessResponse']
          }
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/concert/{id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ConcertDetailSuccessResponse']
          }
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/concert/search': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query: {
          keyword: string
          offset: string
          size: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ConcertSearchSuccessResponse']
          }
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/fcm/token': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['PostFCMTokenBody']
        }
      }
      responses: {
        /** @description Default Response */
        201: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['PostFCMTokenSuccessResponse']
          }
        }
      }
    }
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/search/': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query: {
          keyword: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SearchDTOSerialized'][]
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/subscribe/artist/{id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SubscribedArtistDTOSerialized']
          }
        }
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    delete: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SubscribedArtistDTOSerialized']
          }
        }
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/subscribe/concert': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query: {
          offset: string
          size: string
        }
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SubscribedConcertSerializedList']
          }
        }
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/subscribe/concert/{id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SubscribeConcertDTOSerialized']
          }
        }
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['SubscribeConcertBody']
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SubscribeConcertDTOSerialized']
          }
        }
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    delete: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody: {
        content: {
          'application/json': components['schemas']['SubscribeConcertBody']
        }
      }
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SubscribeConcertDTOSerialized']
          }
        }
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/subscribe/venue/{id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SubscribeVenueSerialized']
          }
        }
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    delete: {
      parameters: {
        query?: never
        header?: never
        path: {
          id: string
        }
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['SubscribeVenueSerialized']
          }
        }
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['ErrorResponse']
          }
        }
      }
    }
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/v1/user/me': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: never
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown
          }
          content: {
            'application/json': components['schemas']['GetMeSuccessResponse']
          }
        }
      }
    }
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    ConcertDetailParams: {
      /** Format: uuid */
      id: string
    }
    ConcertDetailSuccessResponse: {
      artists: {
        name: string
        profileImageUrl: string
      }[]
      /** Format: date-time */
      date: string
      /** Format: uuid */
      id: string
      posters: {
        imageUrl: string
      }[]
      tickets: {
        /** Format: date-time */
        openDate: string
        prices: {
          currency: string
          id: string
          price: number
        }[]
        seller: string
        url: string
      }[]
      title: string
      venues: {
        venueTitle: string
      }[]
    }
    ConcertListQueryString: {
      latitude?: string
      longitude?: string
      offset: string
      size: string
    }
    ConcertListSuccessResponse: components['schemas']['ConcertDetailSuccessResponse'][]
    ConcertSearchParams: {
      keyword: string
      offset: string
      size: string
    }
    ConcertSearchSuccessResponse: components['schemas']['ConcertDetailSuccessResponse'][]
    ConfirmAuthCodeBody: {
      authCode: string
      /** Format: email */
      email: string
    }
    ConfirmAuthCodeSuccessResponse: {
      /** Format: email */
      email: string
    }
    ErrorResponse: {
      code: string
      message: string
    }
    GetMeSuccessResponse: {
      email: string
      id: string
      provider: string
    }
    GetSubscribedConcertListQueryString: {
      offset: string
      size: string
    }
    PostFCMTokenBody: {
      fcmToken: string
    }
    PostFCMTokenSuccessResponse: {
      id: string
      token: string
    }
    SearchDTOSerialized:
      | {
          id: string
          name: string
          profileImgUrl: string
          /** @enum {string} */
          type: 'artist'
        }
      | {
          id: string
          name: string
          /** @enum {string} */
          type: 'venue'
        }
      | {
          /** Format: date-time */
          date: string
          id: string
          thumbnailImgUrl: string
          title: string
          /** @enum {string} */
          type: 'concert'
          venueTitle: string
        }
    SearchListQuerystring: {
      keyword: string
    }
    SendAuthCodeBody: {
      /** Format: email */
      email: string
    }
    SendAuthCodeSuccessResponse: {
      /** Format: email */
      email: string
    }
    SignInBody: {
      email: string
      password?: string
      provider: 'google' | 'apple' | 'email'
      token?: string
    }
    SignInSuccessResponse: {
      authToken: {
        accessToken: string
        refreshToken: string
      }
      user: components['schemas']['GetMeSuccessResponse']
    }
    SignUpBody: {
      email: string
      password?: string
      provider: 'google' | 'apple' | 'email'
      token?: string
    }
    SignUpSuccessResponse: {
      authToken: {
        accessToken: string
        refreshToken: string
      }
      user: components['schemas']['GetMeSuccessResponse']
    }
    SubscribeArtistParams: {
      id: string
    }
    SubscribeConcertBody: {
      id: string
    }
    SubscribeConcertDTOSerialized: {
      concertId: string
      userId: string
    }
    SubscribeConcertParams: {
      id: string
    }
    SubscribedArtistDTOSerialized: {
      artistId: string
      userId: string
    }
    SubscribedConcertSerializedList: components['schemas']['SubscribeConcertDTOSerialized'][]
    SubscribeVenueParams: {
      id: string
    }
    SubscribeVenueSerialized: {
      userId: string
      venueId: string
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}
export type $defs = Record<string, never>
export type operations = Record<string, never>

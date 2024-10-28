import { gql } from '@apollo/client'

export const AuthenticateEmailAuthRequestMutation = gql`
  mutation AuthenticateEmailAuthRequest(
    $input: AuthenticateEmailAuthRequestInput!
  ) {
    authenticateEmailAuthRequest(input: $input) {
      ... on EmailAuthRequest {
        authenticated
        createdAt
        email
        id
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const CreateConcertMutation = gql`
  mutation CreateConcert($input: CreateConcertInput!) {
    createConcert(input: $input) {
      ... on Concert {
        id
        title
        date
        createdAt
        updatedAt
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const CreateConcertPosterMutation = gql`
  mutation CreateConcertPoster($input: CreateConcertPosterInput!) {
    createConcertPoster(input: $input) {
      ... on Poster {
        id
        imageURL
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const CreateEmailAuthRequestMutation = gql`
  mutation CreateEmailAuthRequest($input: CreateEmailAuthRequestInput!) {
    createEmailAuthRequest(input: $input) {
      authenticated
      createdAt
      email
      id
    }
  }
`

export const CreateUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ... on User {
        createdAt
        email
        id
        isAdmin
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const LoginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ... on UserWithAuthToken {
        authToken {
          accessToken
          refreshToken
        }
        user {
          createdAt
          email
          id
          isAdmin
        }
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const LogoutMutation = gql`
  mutation Logout {
    logout {
      ... on User {
        id
        email
      }
    }
  }
`

export const REMOVE_CONCERT_MUTATION = gql`
  mutation RemoveConcert($input: RemoveConcertInput!) {
    removeConcert(input: $input) {
      ... on RemovedConcert {
        id
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const UPDATE_CONCERT_POSTER_MUTATION = gql`
  mutation UpdateConcert($input: UpdateConcertInput!) {
    updateConcert(input: $input) {
      ... on Concert {
        id
        artist
        title
        location
        date
        posters {
          id
          imageURL
        }
        tickets {
          id
          openDate
          seller
          sellingURL
          ticketPrices {
            id
            title
            price
            priceCurrency
          }
        }
        createdAt
        updatedAt
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

export const UpdateConcertPosterMutation = gql`
  mutation UpdateConcertPoster($input: UpdateConcertPosterInput!) {
    updateConcertPoster(input: $input) {
      ... on ConcertPoster {
        id
        imageURL
      }
      ... on HttpError {
        code
        message
      }
    }
  }
`

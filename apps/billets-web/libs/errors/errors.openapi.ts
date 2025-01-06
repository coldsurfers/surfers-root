import { components } from 'types/api'

export class OpenApiError extends Error {
  code: components['schemas']['ErrorResponse']['code']
  constructor(error: components['schemas']['ErrorResponse']) {
    super(error.message)
    this.message = error.message
    this.code = error.code
  }
}

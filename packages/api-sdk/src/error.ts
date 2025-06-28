import type { components } from '../types/api';

export class OpenApiError extends Error {
  code: components['schemas']['ErrorResponseDTOSchema']['code'];
  constructor(error: components['schemas']['ErrorResponseDTOSchema']) {
    super(error.message);
    this.message = error.message;
    this.code = error.code;
    Object.setPrototypeOf(this, OpenApiError.prototype); // Ensures instanceof works correctly
  }
}

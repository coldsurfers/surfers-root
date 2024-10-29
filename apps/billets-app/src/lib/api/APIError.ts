export default class APIError extends Error {
  status: number;
  constructor(errorOptions: {message: string}, httpOptions: {status: number}) {
    super(errorOptions.message);
    this.message = errorOptions.message;
    this.status = httpOptions.status;
  }
}

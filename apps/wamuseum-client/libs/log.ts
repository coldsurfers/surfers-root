export const log = (message: unknown) =>
  process.env.NODE_ENV === 'development' && console.log(message);

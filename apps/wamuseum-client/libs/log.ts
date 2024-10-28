const log = (message: any) =>
  process.env.NODE_ENV === 'development' && console.log(message)

export default log

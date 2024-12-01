// eslint-disable-next-line import/no-extraneous-dependencies
import Axios from 'axios'

const axiosClient = Axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
})

export default axiosClient

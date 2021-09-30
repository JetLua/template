import axios from 'axios'

const fetch = axios.create({
  baseURL: '/'
})

export default fetch

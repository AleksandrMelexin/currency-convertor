import axios from 'axios'

const apiClient = axios.create({
  baseURL: "https://api.exchangerate.host",
  timeout: 10000,
  params: { 
    access_key: "bae39a234569400598e455d605020258",
  }
})

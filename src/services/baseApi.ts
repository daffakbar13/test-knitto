import axios from 'axios'

function createInstance() {
  const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  })
  instance.interceptors.response.use((res) => res.data)
  return instance
}

export const knittoApi = createInstance()

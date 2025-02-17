import axios from 'axios'

const http = axios.create()
// http.defaults.baseURL = '/api'

http.interceptors.request.use((config) => {
  // 如果存在 token，则在请求头中加入 token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // redirect to login
    }
    return Promise.reject(error)
  },
)

export { http }

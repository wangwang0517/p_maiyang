import http from '../utils/htttp'

export function login (data) {
  return http.post('/mo/login/common', data)
}

export function getInfo () {
  return http.get('/mo/admin')
}

import http from '../utils/htttp'

export function login (data) {
  return http({
    url: '/mo/login/common',
    method: 'POST',
    data
  })
}

export function getInfo () {
  return http({
    url: '/mo/admin',
    method: 'GET'
  })
}

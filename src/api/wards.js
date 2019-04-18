import http from '../utils/htttp'

export function getWardsList (data) {
  return http.get(`/mo/wards/list?current=${data.current}&size=${data.size}`)
}

export function saveWards (data) {
  return http.post('/mo/wards/add', data)
}

export function deleteWards (data) {
  return http.delete(`/mo/wards/delete?id=${data.id}`)
}

export function setNurse (data) {
  return http.put('/mo/wards/set', data)
}

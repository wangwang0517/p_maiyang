import http from '../utils/htttp'

export function login (data) {
  return http.post('/mo/login/common', data)
}

export function getInfo () {
  return http.get('/mo/admin')
}

export function updateInfo (data) {
  let config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  return http.put('/mo/admin', data, config)
}

export function getNurseList (data) {
  return http.get(`/mo/user/list?current=${data.current}&size=${data.size}`)
}

export function saveNurse (data) {
  return http.post('/mo/user/add', data)
}

export function deleteNurse (data) {
  return http.delete(`/mo/user/delete?id=${data.id}`)
}

export function getNurseInfo (data) {
  return http.get(`/mo/user/one?id=${data.id}`)
}

export function updateNurseInfo (id, data) {
  return http.put(`/mo/user/mod?id=${id}`, data)
}
export function getUserWards () {
  return http.get('/mo/user/own')
}


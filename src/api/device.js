import http from '../utils/htttp'

export function getDeviceList (data) {
  return http.get(`/mo/device/list?current=${data.current}&size=${data.size}&bind=${data.bind}&state=${data.state}`)
}
export function saveDevice (data) {
  return http.post('/mo/device/add', data)
}

export function deleteDevice (data) {
  return http.delete(`/mo/device/delete?id=${data.id}`)
}

export function getDeviceInfo (data) {
  return http.get(`/mo/device/one?id=${data.id}`)
}

export function updateDeviceInfo (id, data) {
  return http.put(`/mo/device/mod?id=${id}`, data)
}


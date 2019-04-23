import http from '../utils/htttp'

export function getAlarmList (data) {
  return http.get(`/mo/alarmlog/listAll?current=${data.current}&size=${data.size}&state=${data.state}`)
}

export function getPatientAlarmList (data) {
  return http.get(`/mo/alarmlog/list?current=${data.current}&size=${data.size}&patientId=${data.patientId}`)
}

export function getPatientRecordList (data) {
  return http.get(`/mo/patientlog/list?current=${data.current}&size=${data.size}&patientId=${data.patientId}`)
}

export function handlePatientAlarm (id) {
  return http.put(`/mo/alarmlog/handle?patientId=${id}`)
}

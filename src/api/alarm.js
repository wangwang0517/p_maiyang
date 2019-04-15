import http from '../utils/htttp'

export function getAlarmList (data) {
  return http.get(`/mo/alarmlog/listAll?current=${data.current}&size=${data.size}&state=${data.state}`)
}

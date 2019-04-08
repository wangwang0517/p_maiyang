import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export const login = data => {
  return { id: 1, username: 'admin', password:'123456'}
  // axios.post('/login', data)
  //   .then(response => {
  //     return response
  //   }, err => {
  //     return err
  //   })
  //   .catch(err => {
  //     return err
  //   })
}

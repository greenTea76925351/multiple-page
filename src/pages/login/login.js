import './login.less'
import { _login } from '@/utils/serverAPI.js' //api接口
import { $get } from '@/utils/http.js' //get请求
console.log(_login)
console.log($('#app').html())

let getInfo = async _ => {
  let data = await $get(_login);
  console.log(data)
} 
getInfo()
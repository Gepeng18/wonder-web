const user = require('./modules/user.api')
const role = require('./modules/role.api')
const menu = require('./modules/menu.api')
const dict = require('./modules/dict.api')

const api = {
    user,
    role,
    menu,
    dict
}
import Vue from "vue";

Vue.prototype.$api = api

export default api


// const api = {}
// // 自动导入文件
// const files = require.context('./modules', true, /\.api\.js$/) // 模块接口名称必须是：模块名称.api.js
//
// files.keys().forEach((item)=>{
//
//     let start = item.indexOf('/') + 1
//     let end = item.indexOf('.api.js')
//     let name = item.substring(start, end)
//
//     api[name] = files(item)
// })
//
// import Vue from "vue";
//
// Vue.prototype.$api = api
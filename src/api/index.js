const user = require('./modules/user.api')
const role = require('./modules/role.api')
const menu = require('./modules/menu.api')
const dict = require('./modules/dict.api')
const dept = require('./modules/dept.api')
const dataScope = require('./modules/dataScope.api')

const api = {
    user,
    role,
    menu,
    dict,
    dept,
    dataScope
}
import Vue from "vue";

Vue.prototype.$api = api

export default api

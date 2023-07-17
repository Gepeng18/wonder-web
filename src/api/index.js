const user = require('./modules/user.api')
const role = require('./modules/role.api')
const menu = require('./modules/menu.api')
const dict = require('./modules/dict.api')
const dept = require('./modules/dept.api')
const rule = require('./modules/rule.api')
const mark = require('./modules/mark.api')
const api = {
    user,
    role,
    menu,
    dict,
    dept,
    rule,
    mark
}
import Vue from "vue";

Vue.prototype.$api = api

export default api

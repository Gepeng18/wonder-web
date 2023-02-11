const user = require('./modules/user.api')
const role = require('./modules/role.api')
const menu = require('./modules/menu.api')
const dict = require('./modules/dict.api')
// export default {
//     ...api,
// }

const api = {
    user,
    role,
    menu,
    dict
}
import Vue from "vue";

Vue.prototype.$api = api

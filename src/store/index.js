import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        // 存储 token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    },

    mutations: {
        logined(state, res) {
            state.token = res.token;
            localStorage.setItem('token', res.token);
        },
        logout(state) {
            localStorage.clear()
            console.log('执行了 退出登录')
            state.token = ''
            router.push('/login')
        },



    }
})

export default store;

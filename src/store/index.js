import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        // 存储 token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',

        tabList:[],   //动态标签页
        userRoutes: [],  // 用户的路由信息,
        test: 111111111111
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

        addTab: (state, tab) => {
            // 如果tab已经存在，不添加新的tabs
            if (state.tabList.some(item => item.path === tab.path)) return
            state.tabList.push(tab)
            if (state.tabList.length > 1)
                state.tabList[0].closable = true
        },

        // setUserRoutes (state, payload) {
        //     state.userRoutes = payload
        // },
        increment(state){
            state.test++
        },

        //请求后端获取路由
        setUserRoutes(state, res) {
            state.userRoutes = res
        }
    },
    getters: {
        // 获取tbsList
        getTabs: (state) => {
            return state.tabList
        },

        userRoutes (state) {
            return state.userRoutes
        }
    },
    actions: {

    }
})


Vue.prototype.$store = store
export default store;

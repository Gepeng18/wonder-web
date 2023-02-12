import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        // 存储 token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',

        tabList:[],   //动态标签页
        dynamicRoutes: [] // 动态路由
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

        DYNAMIC_ROUTES (state, routes) {
            state.dynamicRoutes = routes
        }

    },
    getters: {
        // 获取tbsList
        getTabs: (state) => {
            return state.tabList
        },
        getDynamicRoutes:(state) => {
            return state.dynamicRoutes
        }
    },
    actions: {
        dynamicRoutes ({commit}, routes) {
            commit('DYNAMIC_ROUTES', routes)
        }

    },
    modules: {

    }
})

export default store;

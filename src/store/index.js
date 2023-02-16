import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
import api from "@/api";

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

        setUserRoutes (state, payload) {
            state.userRoutes = payload
        },
        increment(state){
            state.test++
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
        //请求后端获取路由
        setUserRoutes({state, commit}) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                //如果第一次进入项目，没有路由则请求后端，动态设置路由
                if (!state.userRoutes.length) {
                    console.log('动态路由为空')
                    api.menu.getRoutes().then(res => {
                        // 提交mutatuons存储路由到vuex
                        commit("setUserRoutes", res);
                        console.log('获取到的动态路由：', res)
                        resolve()
                    })
                }
                resolve()
            })
        }
    }
})


Vue.prototype.$store = store
export default store;

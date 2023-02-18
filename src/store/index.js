import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
import api from "@/api";
import {handleTree} from "@/utils/MenuHandle"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentPath:'',
        token: '',
        activeTab: '',
        tabList: [],   //动态标签页
        user: {},
        userRoutes: [],  // 用户的路由信息,
        userMenus: [],
        userRoles: [],
        userDepts: [],
        userPerMits: []
    },

    mutations: {
        login(state, payload) {
            state.token = payload.token;
            sessionStorage.setItem('token', payload.token);
            state.user = payload.userInfo;
        },
        logout() {
            sessionStorage.clear()
            router.push('/login')
        },

        addTab: (state, tab) => {
            // 如果tab已经存在，不添加新的tabs
            if (state.tabList.some(item => item.path === tab.path))
                return
            state.tabList.push(tab)
            if (state.tabList.length > 1)
                state.tabList[0].closable = true
        },

        setActiveTab(state, activeTab) {
            state.activeTab = activeTab
            state.currentPath = activeTab
        },

        setUserRoutes(state, payload) {
            state.userRoutes = payload
            sessionStorage.setItem('userRoutes', JSON.stringify(payload))
        },
        setUserMenus(state, payload) {
            state.userMenus = payload
            sessionStorage.setItem('userMenus', JSON.stringify(payload))
        },
        setUserPermits(state, payload) {
            state.userPerMits = payload
            sessionStorage.setItem('userPerMits', payload)
        },
        setUserRoles(state, payload) {
            state.userRoles = payload
            sessionStorage.setItem('userRoles', JSON.stringify(payload))
        },
        setUserDepts(state, payload) {
            state.userDepts = payload
            sessionStorage.setItem('userDepts', payload)
        },

        RESET_STATE: (state) => {
            state.token = ''
            state.activeTab = ''
            state.tabList = []
            state.user = {}
            state.userRoutes = []
            state.userMenus = []
            state.userRoles = []
            state.userDepts = []
            state.userPerMits = []
        },
    },
    getters: {
        getTabs: (state) => {
            return state.tabList
        },
        activeTab(state) {
            return state.activeTab
        },
        userRoutes(state) {
            return state.userRoutes
        },
        userMenus(state) {
            return state.userMenus
        },
        userPermits(state) {
            return state.userPerMits
        },
        userRoles(state) {
            return state.userRoles
        },
        userDepts(state) {
            return state.userDepts
        },
        currentPath(state){
            return state.currentPath
        }
    },
    actions: {
        getUserMenu(context) {
            if (!context.getters.userMenus.length) {
                api.menu.findByUserId().then(res => {
                    let {permits, routes, menus} = handleTree(res)
                    context.commit('setUserRoutes', routes)
                    context.commit('setUserPermits', permits)
                    context.commit('setUserMenus', menus)
                    //生成动态路由
                    context.dispatch('setDynamicRoutes')
                })
            }
        },
        setDynamicRoutes(context) {
            console.log('setDynamicRoutes', context.state.userRoutes)
            context.state.userRoutes.forEach(item => {
                router.addRoute('index', {
                    path: item.path,
                    meta: {
                        auth: item.auth,
                        title: item.title
                    },
                    component: resolve => require([`@/views/${item.component}`], resolve)
                })
            })
        }

    }
})


Vue.prototype.$store = store
export default store;

import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
import api from "@/api";
import {handleTree} from "@/utils/MenuHandle"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentPath:'',
        activeTab: '',
        tabList: [],   //动态标签页
        userinfo: {},
        userRoutes: [],  // 用户的路由信息,
        userMenus: [],
        userPerMits: [],
        tabContentHeight: '500',
        mainContentHeight: '500'
    },

    mutations: {
        login(state, payload) {
            state.userinfo = payload;
            /*if (payload.deptList.length === 1){
                state.userinfo.currentDeptId = payload.deptList[0].id
            }
            if (payload.roleList.length === 1){
                state.userinfo.currentRoleId = payload.roleList[0].id
            }*/

            if (payload.deptList.length >= 1){
                state.userinfo.currentDeptId = payload.deptList[0].id
            }
            if (payload.roleList.length >= 1){
                state.userinfo.currentRoleId = payload.roleList[0].id
            }
        },

        logout() {
            localStorage.clear()
            store.commit('RESET_STATE')
            router.replace({name: 'hello'})
        },

        clear(){
            localStorage.clear()
            store.commit('RESET_STATE')
        },

        addTab: (state, tab) => {
            // 如果tab已经存在，不添加新的tabs
            if (state.tabList.some(item => item.path === tab.path))
                return
            state.tabList.push(tab)
            state.tabList[0].closable = state.tabList.length !== 1;
        },
        setTabs(state, tabs){
            if (tabs.length === 1)
                tabs[0].closable = false
            state.tabList = tabs
        },

        setActiveTab(state, activeTab) {
            state.activeTab = activeTab
            state.currentPath = activeTab
        },

        setUserRoutes(state, payload) {
            state.userRoutes = payload
            localStorage.setItem('userRoutes', JSON.stringify(payload))
        },
        setUserMenus(state, payload) {
            state.userMenus = payload
            localStorage.setItem('userMenus', JSON.stringify(payload))
        },
        setUserPermits(state, payload) {
            state.userPerMits = payload
            localStorage.setItem('userPerMits', payload)
        },

        setTabContentHeight(state, payload){
            state.tabContentHeight = payload - 145
            state.mainContentHeight = payload - 64
        },

        RESET_STATE: (state) => {
            console.log('重置store')
            localStorage.clear()
            state.activeTab = ''
            state.tabList = []
            state.userinfo = {}
            state.userRoutes = []
            state.userMenus = []
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
        currentPath(state){
            return state.currentPath
        }
    },
    actions: {
        getUserMenu(context) {
            console.log('context.getters.userMenus.length', context.getters.userMenus.length)
            if (!context.getters.userMenus.length) {
                api.menu.findByUserId().then(res => {
                    let {permits, routes, menus} = handleTree(res)
                    console.log('permits = ', permits)
                    console.log('routes = ', routes)
                    console.log('menus = ', menus)

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
                if (item.inFrame){
                    // console.log('框架内 -> ', item)
                    router.addRoute('index', {
                        name: item.routeName,
                        path: item.path,
                        meta: {
                            auth: !!item.permission,
                            title: item.name,
                            isUrl: item.isUrl
                        },
                        component: resolve => require([`@/views/${item.component}`], resolve)
                    })
                }else {
                    // console.log('框架外 -> ', item)
                    if (item.isUrl){
                        router.addRoute({
                            name: item.routeName,
                            path: '/' + item.path,
                            meta: {
                                auth: !!item.permission,
                                title: item.name,
                                isUrl: true
                            }
                        })
                    }else {
                        router.addRoute({
                            name: item.routeName,
                            path: item.path,
                            meta: {
                                auth: !!item.permission,
                                title: item.name,
                                isUrl: false
                            },
                            component: resolve => {if (item.component) {require([`@/views/${item.component}`], resolve)}}
                        })
                    }
                }
            })
        }

    }
})


Vue.prototype.$store = store
export default store;

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
// import {fnAddDynamicMenuRoutes} from "@/utils/getAsyncRouter";
// import api from "@/api";
// import store from '@/store/index'

Vue.use(VueRouter)

const baseRoutes = [

    {
        path: '/',
        meta: {
            auth: false
        },
        redirect: 'login',
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            auth: false
        },
        component: () => import('@/views/login/login.vue')
    },
    {
        name: 'index',
        path: '/index',
        meta: {
            auth: true
        },
        component: () => import('@/views/index/index.vue'),
        children: [
            // {
            //     name:'home',
            //     path: '/home',
            //     meta: {
            //         auth: true,
            //         title:'首页'
            //     },
            //     component:()=>import('@/views/home/Home.vue')
            // },
            // {
            //     path: '/system/user',
            //     meta: {
            //         auth: true,
            //         title: '用户1'
            //     },
            //     component:()=>import('@/views/system/user/User.vue')
            // },
            // {
            //     path: '/system/role',
            //     meta: {
            //         auth: true,
            //         title: '角色'
            //     },
            //     component:()=>import('@/views/system/role/Role.vue')
            // },
            // {
            //     path: '/system/menu',
            //     meta: {
            //         auth: true,
            //         title: '菜单'
            //     },
            //     component:()=>import('@/views/system/menu/Menu.vue')
            // },
            // {
            //     path: '/system/dict',
            //     meta: {
            //         auth: true,
            //         title: '字典'
            //
            //     },
            //     component:()=>import('@/views/system/dict/Dict.vue')
            // },
            // {
            //     path: '/system/dictData',
            //     meta: {
            //         auth: true,
            //         keepAlive: false
            //     },
            //     component:()=>import('@/views/system/dict/DictData.vue')
            // }
        ]
    },


]

const createRouter = () => new VueRouter({
    mode: 'history',
    routes: baseRoutes
})

const router = createRouter()


import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import api from "@/api";
// import api from "@/api";
// import {fnAddDynamicMenuRoutes} from "@/utils/getAsyncRouter";


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}



/**
 * 路由拦截
 * 权限验证
 */
let isToken = true
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 验证当前路由所有的匹配中是否需要有登录验证的
    if (to.meta.auth) {
        console.log('需要权限')
        const token = store.state.token
        if (token && token !== 'undefined') {
            console.log('token', token)
            if (isToken && !store.getters.userRoutes.length) {
                console.log('用户动态路由为空')
                api.menu.getRoutes().then(res => {
                    store.commit("setUserRoutes", res)
                    res.forEach(item => {
                        console.log('item', item)
                        router.addRoute('index', {
                            path: item.path,
                            meta: {
                                auth: item.auth,
                                title: item.title
                            },
                            component: resolve => require([`@/views/${item.component}`], resolve)
                        })
                    })
                    isToken = false
                    console.log('router.getRoutes()', router.getRoutes())
                    next({...to, replace: true})
                })

            }
        } else {
            console.log('需要权限, 但是没有token')

            // 没有登录的时候跳转到登录界面
            // 携带上登陆成功之后需要跳转的页面完整路径
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        console.log('不不 需要权限')

        // 不需要身份校验 直接通过
        next()
    }

})

router.afterEach(() => {
    NProgress.done()
})

export default router

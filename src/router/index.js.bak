import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
// import {fnAddDynamicMenuRoutes} from "@/utils/getAsyncRouter";
// import api from "@/api";
// import store from '@/store/index'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        meta: {
            auth: false
        },
        redirect: 'login',
        children:[

        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            auth: false
        },
        component:()=>import('@/views/login/login.vue')
    },
    {
        path: '/index',
        meta: {
            auth: true
        },
        component:()=>import('@/views/index/index.vue'),
        children: [
            {
                name:'home',
                path: '/home',
                meta: {
                    auth: true,
                    title:'首页'
                },
                component:()=>import('@/views/home/Home.vue')
            },
            {
                path: '/system/user',
                meta: {
                    auth: true,
                    title: '用户'
                },
                component:()=>import('@/views/system/user/User.vue')
            },
            {
                path: '/system/role',
                meta: {
                    auth: true,
                    title: '角色'
                },
                component:()=>import('@/views/system/role/Role.vue')
            },
            {
                path: '/system/menu',
                meta: {
                    auth: true,
                    title: '菜单'
                },
                component:()=>import('@/views/system/menu/Menu.vue')
            },
            {
                path: '/system/dict',
                meta: {
                    auth: true,
                    title: '字典'

                },
                component:()=>import('@/views/system/dict/Dict.vue')
            },
            {
                path: '/system/dictData',
                meta: {
                    auth: true,
                    keepAlive: false
                },
                component:()=>import('@/views/system/dict/DictData.vue')
            }
        ]
    },


]

const router = new VueRouter({
    routes
})

import NProgress from 'nprogress';

import 'nprogress/nprogress.css';


/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach( (to, from, next) => {
    NProgress.start()
    // 验证当前路由所有的匹配中是否需要有登录验证的
    if (to.meta.auth) {
        const token = store.state.token
        if (token && token !== 'undefined') {
            next()
        } else {
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
        // 不需要身份校验 直接通过
        next()
    }
})

router.afterEach(() => {
    NProgress.done()
})

//
// // 白名单
// const whiteList = ['/login'] // no redirect whitelist
//
// // 导航守卫
// router.beforeEach((to, from, next) => {
//     // try {
//         // 判断是否已经获取过动态菜单，未获取，则需要获取一次
//         let dynamicRoutes = store.getters['getDynamicRoutes']
//         console.log('dynamicRoutes', dynamicRoutes)
//         console.log('to', to)
//         if (dynamicRoutes.length === 0) {
//             if (whiteList.indexOf(to.path) !== -1) {
//                 next()
//             } else {
//                 console.log(11111111)
//                 api.menu.treeList().then(res => {
//                     let menuRouter = fnAddDynamicMenuRoutes(res[0].children)
//                     store.dispatch('app/dynamicRoutes', menuRouter).then(() => {
//                         router.addRoutes(dynamicRoutes)
//                         next({...to, replace: true})
//                     })
//                 })
//             }
//         } else {
//             console.log(222222)
//             // 路由已存在或已缓存路由
//             if (to.meta.requireAuth) {
//                 if (sessionStorage.getItem('loginName') !== null) {
//                     // 判断本地是否存在token
//                     next()
//                 } else {
//                     // 未登录,跳转到登陆页面
//                     next({path: '/login'})
//                 }
//             } else {
//                 if (whiteList.indexOf(to.path) !== -1) {
//                     next()
//                 } else {
//                     if (sessionStorage.getItem('loginName') !== null) {
//                         // 判断本地是否存在token
//                         next(`/?redirect=${to.path}`)
//                     } else {
//                         next(`/login?redirect=${to.path}`)
//                     }
//                 }
//             }
//         }
//     // } catch (error) {
//     //     console.log('出错了')
//     //     console.log(error)
//     // }
// })


export default router

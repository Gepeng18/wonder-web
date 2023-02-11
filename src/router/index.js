import Vue from 'vue'
import VueRouter from 'vue-router'
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
                    auth: true
                },
                component:()=>import('@/views/home/Home.vue')
            },
            {
                path: '/system/user',
                meta: {
                    auth: true
                },
                component:()=>import('@/views/system/user/User.vue')
            },
            {
                path: '/system/role',
                meta: {
                    auth: true
                },
                component:()=>import('@/views/system/role/Role.vue')
            },
            {
                path: '/system/menu',
                meta: {
                    auth: true
                },
                component:()=>import('@/views/system/menu/Menu.vue')
            },
            {
                path: '/system/dict',
                meta: {
                    auth: true
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


/**
 * 路由拦截
 * 权限验证
 */
// router.beforeEach( (to, from, next) => {
//     // 验证当前路由所有的匹配中是否需要有登录验证的
//     if (to.meta.auth) {
//         const token = store.state.token
//         if (token && token !== 'undefined') {
//             next()
//         } else {
//             // 没有登录的时候跳转到登录界面
//             // 携带上登陆成功之后需要跳转的页面完整路径
//             next({
//                 name: 'login',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             })
//         }
//     } else {
//         // 不需要身份校验 直接通过
//         next()
//     }
// })

export default router

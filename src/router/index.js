import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from "@/store";

// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location){
    return originalPush.call(this , location).catch(err=>err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location){
    return originalReplace.call(this , location).catch(err=>err)
}


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
        /*
          如上 redirect 的时候需要
          this.$router.push({name: 'login'})
          this.$router.push({path: '/login'})
        */
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
            {
                // TODO 怎么跟数据库菜单表中的按钮绑定？肯定不能写死在这里
                name: 'rule-index',
                path: '/rule-index',
                meta: {
                    auth: true,
                    title: '规则',
                },
                component: () => import('@/views/system/rule/index.vue'),
            }
        ]
    },

]

const createRouter = () => new VueRouter({
    mode: 'history',
    routes: baseRoutes
})

const router = createRouter()

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
        const token = store.state.userinfo.token
        if (token && token !== 'undefined') {
            if (isToken && !store.state.userRoutes.length) {
                store.dispatch('getUserMenu').then(() => {
                    isToken = false
                    next({...to, replace: true})
                })
            }
            next()
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

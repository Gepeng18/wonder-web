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
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const baseRoutes = [
    {
        path: '/',
        meta: {
            auth: false
        },
        redirect: '/hello',
    },
    {
        name: 'hello',
        path: '/hello',
        meta: {
            auth: false
        },
        component: () => import('@/views/hello/index.vue')
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
        children: []
    },

]

const createRouter = () => new VueRouter({
    // mode: 'history',
    routes: baseRoutes
})

const router = createRouter()

/**
 * 路由拦截
 * 权限验证
 */

// let isToken = true
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 验证当前路由所有的匹配中是否需要有登录验证的
    if (to.meta.auth) {
        console.log('需要权限')
        const token = store.state.userinfo.token

        if (token && token !== 'undefined') {
            if (store.state.userRoutes.length === 0) {
                store.dispatch('getUserMenu').then(() => {
                    // isToken = false
                    next({...to, replace: true})
                })
            }

            if (to.meta.isUrl) {
                window.open(to.path.substring(1), '_blank');
                router.back()
                NProgress.done()
                return
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
        console.log('to', to)
        if (to.meta.isUrl) {
            console.log(2222)
            //FIXME 在首页点击百度没问题，但进入二级目录后打开百度有问题，meta变空了，url前面拼接了/system
            window.open(to.path.substring(to.path.indexOf("http")), '_blank');
            // router.push({path: from.path})
            NProgress.done()
            return
        }

        // 不需要身份校验 直接通过
        next()
    }

})

router.afterEach(() => {
    NProgress.done()
})

export default router

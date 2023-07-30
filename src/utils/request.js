import axios from 'axios'
import {Message, Loading} from 'element-ui'
import store from "@/store";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    withCredentials: false, //跨域请求时发送cookies
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    timeout: process.env.VUE_APP_HTTP_TIMEOUT // 请求超时
})


//当前正在请求的数量
let needLoadingRequestCount = 0;

//loading对象
let loading = null;

function showLoading(target = '', show = true) {
    needLoadingRequestCount++
    // if (loading == null && target != null){
    if (loading == null && show) {
        loading = Loading.service({
            lock: true,
            text: "加载中",
            background: 'rgba(0, 0, 0, 0.1)',
            target: target || '#main'
            // fullscreen: true
        });
    }
}

//隐藏loading
function hideLoading() {
    needLoadingRequestCount--
    setTimeout(() => {
        if (loading !== null && needLoadingRequestCount === 0) {
            loading.close();
            loading = null;
        }
    }, 500)
}

//请求拦截器
service.interceptors.request.use(
    config => {
        showLoading(config.headers.target, config.headers.showLoading)
        // 判断是否存在token，把token添加点请求头中，每次请求携带token传给后端
        if (store.state.userinfo.token) {
            // 请求头的 Token 加上 token 数据
            config.headers.Authorization = store.state.userinfo.token;
            config.headers.RoleId = store.state.userinfo.currentRoleId;
            config.headers.DeptId = store.state.userinfo.currentDeptId;
        } else {
            console.log('no token');
        }
        return config
    },
    error => {
        //处理错误请求
        return Promise.reject(error)
    }
)
//响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        console.log("进入响应拦截", res)
        hideLoading()
        switch (res.code) {
            case 200:
                return Promise.resolve(res.data) //请求成功
            case 401:
                Message.error('登录后重试')
                store.commit('logout')
                return Promise.reject(res)
            default:
                Message.error(res.msg)
                return Promise.reject(res)
        }
    },
    error => {
        hideLoading()
        Message.error('请求失败：' + error)
        //处理错误响应
        return Promise.reject(error)
    }
)
export default service

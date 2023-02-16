import axios from 'axios'
import { Message } from 'element-ui'
import store from "@/store";

const service = axios.create({
    baseURL: 'http://127.0.0.1/admin',
    withCredentials: true, //跨域请求时发送cookies
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    timeout: 10000 // 请求超时
})

//请求拦截器
service.interceptors.request.use(
    config => {
        // const onAuthPath =[
        //     '/auth'
        // ]
        // if ()

        // 判断是否存在token,把token添加点请求头中，每次请求携带token传给后端
        if (store.state.token != null && store.state.token !== "") {
            // 请求头的 Token 加上 token 数据
            config.headers.Token = 'Bearer ' + store.state.token;
            // console.log(config.headers);
        }else {
            console.log('no token');
        }
        // console.log("进入请求拦截")
        return config
    },
    error => {
        //处理错误请求
        return Promise.reject(error)
    }
)
//响应拦截器
service.interceptors.response.use(
    response=> {
        const res = response.data
        console.log("进入响应拦截", res)
        switch (res.code){
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
        Message.error('http.status != 200, ' + error)
        //处理错误响应
        return Promise.reject(error)
    }
)
export default service

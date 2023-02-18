import request from "@/utils/request";
//登录
export const loginByPassword = params => request({
    url: '/auth/login',
    method: 'post',
    params
})

//获取验证码
export const getCode = (headers= {}) => request({
    url: '/auth/getCode',
    method: 'get',
    headers
})

export const findUserPage = (data = {}, headers= {}) => request({
    url: '/user/list',
    method: 'post',
    data,
    headers
})

export const resetPWD = (data = {}) => request({
    url: '/user/resetPWD',
    method: 'post',
    data
})

export const findUserById = (params) => request({
    url: '/user/findById',
    method: 'get',
    params
})

export const edit = (data = {}) => request({
    url: '/user/edit',
    method: 'post',
    data
})

export const getUserLoginInfo = () => request({
    url: '/user/getUserLoginInfo',
    method: 'get'
})

import request from "@/utils/request";

const prefix = '/user'

//登录
export const loginByUsername = data => request({
    url: '/auth/login/username',
    method: 'post',
    data
})

//获取验证码
export const getCode = (headers= {}) => request({
    url: '/auth/getCode',
    method: 'get',
    headers
})

export const page = (data = {}, headers= {}) => request({
    url: prefix + '/page',
    method: 'post',
    data,
    headers
})

export const resetPWD = (data = {}) => request({
    url: prefix + '/resetPWD',
    method: 'post',
    data
})

export const findUserById = (params) => request({
    url: prefix + '/findById',
    method: 'get',
    params
})

export const update = (data = {}) => request({
    url: prefix + '/update',
    method: 'post',
    data
})

export const getUserLoginInfo = () => request({
    url: prefix + '/getUserLoginInfo',
    method: 'get'
})

export const enabledSwitch = (id) => request({
    url: prefix + '/enabledSwitch/' + id,
    method: 'get'
})

export const getById = (id) => request({
    url: prefix + '/get/' + id,
    method: 'get'
})

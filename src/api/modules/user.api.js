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
    method: 'get',
    data,
    headers
})

export const resetPWD = (data = {}, headers ={showLoading: false}) => request({
    url: prefix + '/resetPWD',
    method: 'put',
    data,
    headers
})

export const update = (data = {}) => request({
    url: prefix,
    method: 'put',
    data
})

export const save = (data = {}) => request({
    url: prefix,
    method: 'post',
    data
})

export const getUserLoginInfo = () => request({
    url: prefix + '/getUserLoginInfo',
    method: 'get'
})

export const enabledSwitch = (id, headers ={showLoading: false}) => request({
    url: prefix + '/enabledSwitch/' + id,
    method: 'put',
    headers
})

export const getById = (id) => request({
    url: prefix + '/' + id,
    method: 'get'
})

export const del = (id, headers= {showLoading: false}) => request({
    url: prefix + '/' + id,
    method: 'get',
    headers
})

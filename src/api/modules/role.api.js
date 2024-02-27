import request from "@/utils/request";

const prefix = '/role'

export const page = (data = {}, headers ={}) => request({
    url: prefix + '/page',
    method: 'get',
    data,
    headers
})

export const list = (data = {}, headers ={}) => request({
    url: prefix + '/list',
    method: 'get',
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

export const get = (id) => request({
    url: prefix + '/' + id,
    method: 'get'
})

// 状态更改
export const enabledSwitch = (id, headers ={showLoading: false}) => request({
    url: prefix + '/enabledSwitch/' + id,
    method: 'put',
    headers
})

// 删除
export const del = (id) => request({
    url: prefix + '/' + id,
    method: 'delete'
})

export const bindingRule = (params, headers ={showLoading: true, target: '#dataScopeDialog'}) => request({
    url: prefix + '/bindingRule',
    method: 'put',
    params,
    headers
})

export const unBindingRule = (params, headers ={showLoading: true, target: '#dataScopeDialog'}) => request({
    url: prefix + '/unBindingRule',
    method: 'put',
    params,
    headers
})

import request from "@/utils/request";

const prefix = '/mark'

export const page = (data = {}, headers ={}) => request({
    url: prefix + '/page',
    method: 'post',
    data,
    headers
})

export const list = (data = {}, headers ={}) => request({
    url: prefix + '/list',
    method: 'post',
    data,
    headers
})

export const update = (data = {}) => request({
    url: prefix + '/update',
    method: 'post',
    data
})

export const save = (data = {}) => request({
    url: prefix + '/save',
    method: 'post',
    data
})

export const get = (id) => request({
    url: prefix + '/get/' + id,
    method: 'get'
})

// 状态更改
export const enabledSwitch = (id, headers ={showLoading: false}) => request({
    url: prefix + '/enabledSwitch/' + id,
    method: 'get',
    headers
})

// 删除
export const del = (id) => request({
    url: prefix + '/delete/' + id,
    method: 'get'
})

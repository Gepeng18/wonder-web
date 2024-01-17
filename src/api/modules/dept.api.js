import request from "@/utils/request";

const prefix = '/dept'

export const tree = (data = {}, headers= {}) => request({
    url: prefix + '/tree',
    method: 'get',
    data,
    headers
})

export const list = (data = {},  headers= {}) => request({
    url: prefix + '/list',
    method: 'get',
    data,
    headers
})

export const update = (data = {},  headers= {showLoading: true}) => request({
    url: prefix,
    method: 'put',
    data,
    headers
})

export const save = (data = {}, headers = {showLoading: false}) => request({
    url: prefix,
    method: 'post',
    data,
    headers
})

export const getById = (id, headers= {}) => request({
    url: prefix + '/' + id,
    method: 'get',
    headers
})

export const del = (id, headers= {showLoading: false}) => request({
    url: prefix + '/' + id,
    method: 'delete',
    headers
})

export const enabledSwitch = (id, headers = {showLoading: false}) => request({
    url: prefix + '/enabledSwitch/' + id,
    method: 'put',
    headers
})

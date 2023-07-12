import request from "@/utils/request";

const prefix = '/dept'

export const tree = (data = {}, headers= {}) => request({
    url: prefix + '/tree',
    method: 'post',
    data,
    headers
})

export const list = (data = {},  headers= {}) => request({
    url: prefix + '/list',
    method: 'post',
    data,
    headers
})

export const update = (data = {},  headers= {showLoading: true}) => request({
    url: prefix + '/update',
    method: 'post',
    data,
    headers
})

export const save = (data = {}, headers = {showLoading: false}) => request({
    url: prefix + '/save',
    method: 'post',
    data,
    headers
})

export const getById = (id, headers= {}) => request({
    url: prefix + '/get/' + id,
    method: 'get',
    headers
})

export const del = (id, headers= {showLoading: false}) => request({
    url: prefix + '/delete/' + id,
    method: 'get',
    headers
})

export const enabledSwitch = (id, headers = {showLoading: false}) => request({
    url: prefix + '/enabledSwitch/' + id,
    method: 'get',
    headers
})

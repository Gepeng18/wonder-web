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

export const update = (data = {},  headers= {}) => request({
    url: prefix + '/update',
    method: 'post',
    data,
    headers
})

export const getById = (id, headers= {}) => request({
    url: prefix + '/get/' + id,
    method: 'get',
    headers
})

export const del = (id, headers= {}) => request({
    url: prefix + '/delete/' + id,
    method: 'get',
    headers
})

export const enabledSwitch = (id) => request({
    url: prefix + '/enabledSwitch/' + id,
    method: 'get'
})

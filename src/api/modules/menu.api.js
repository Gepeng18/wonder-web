import request from "@/utils/request";

const prefix = '/menu'

export const treeList = (data = {}) => request({
    url: prefix + '/treeList',
    method: 'get',
    data
})

export const list = (data = {},  headers= {}) => request({
    url: prefix + '/list',
    method: 'get',
    data,
    headers
})

export const get = (id) => request({
    url: prefix + '/' + id,
    method: 'get'
})

export const findByUserId = () => request({
    url: prefix + '/findByUserId',
    method: 'get',
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

export const del = (id, headers= {showLoading: false}) => request({
    url: prefix + '/' + id,
    method: 'get',
    headers
})

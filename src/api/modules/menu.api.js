import request from "@/utils/request";

const prefix = '/menu'

export const treeList = (data = {}) => request({
    url: prefix + '/treeList',
    method: 'post',
    data
})

export const list = (data = {},  headers= {}) => request({
    url: prefix + '/list',
    method: 'post',
    data,
    headers
})

export const get = (id) => request({
    url: prefix + '/get/' + id,
    method: 'get'
})

export const findByUserId = () => request({
    url: prefix + '/findByUserId',
    method: 'get',
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

export const del = (id, headers= {showLoading: false}) => request({
    url: prefix + '/delete/' + id,
    method: 'get',
    headers
})

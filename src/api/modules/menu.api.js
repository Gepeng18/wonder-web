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



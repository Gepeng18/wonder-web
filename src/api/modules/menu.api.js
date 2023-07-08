import request from "@/utils/request";

export const treeList = (data = {}) => request({
    url: '/menu/treeList',
    method: 'post',
    data
})

export const list = (data = {},  headers= {}) => request({
    url: '/menu/list',
    method: 'post',
    data,
    headers
})

export const findById = (id) => request({
    url: '/menu/get/' + id,
    method: 'get'
})

export const findByUserId = () => request({
    url: '/menu/findByUserId',
    method: 'get',
})



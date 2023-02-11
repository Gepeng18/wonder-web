import request from "@/utils/request";

export const treeList = (data = {}) => request({
    url: '/menu/treeList',
    method: 'post',
    data
})

export const list = (data = {}) => request({
    url: '/menu/list',
    method: 'post',
    data
})

export const findById = (params = {}) => request({
    url: '/menu/findById',
    method: 'get',
    params
})



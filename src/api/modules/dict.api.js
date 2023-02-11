import request from "@/utils/request";

export const findById = (params = {}) => request({
    url: '/dict/findById',
    method: 'get',
    params
})

export const list = (data = {}) => request({
    url: '/dict/list',
    method: 'post',
    data
})

export const findByType = (params = {}) => request({
    url: '/dict/findByType',
    method: 'get',
    params
})



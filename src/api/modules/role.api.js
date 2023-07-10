import request from "@/utils/request";

const prefix = '/role'

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

export const edit = (data = {}) => request({
    url: '/role/edit',
    method: 'post',
    data
})

export const get = (id) => request({
    url: prefix + '/get/' + id,
    method: 'get'
})

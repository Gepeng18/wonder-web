import request from "@/utils/request";

const prefix = '/rule'

export const page = (data = {}, headers= {}) => request({
    url: prefix + '/page',
    method: 'post',
    data,
    headers
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

export const getById = (id) => request({
    url: prefix + '/get/' + id,
    method: 'get'
})

export const del = (id, headers= {showLoading: false}) => request({
    url: prefix + '/delete/' + id,
    method: 'get',
    headers
})

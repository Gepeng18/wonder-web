import request from "@/utils/request";

const prefix = '/rule'

export const page = (data = {}, headers= {}) => request({
    url: prefix + '/page',
    method: 'get',
    data,
    headers
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

export const getById = (id) => request({
    url: prefix + '/' + id,
    method: 'get'
})

export const del = (id, headers= {showLoading: false}) => request({
    url: prefix + '/' + id,
    method: 'delete',
    headers
})

export const getByMarkId = (markId) => request({
    url: prefix + '/getByMarkId/' + markId,
    method: 'get'
})

export const getByRoleIdAndMarkId = (params) => request({
    url: prefix + '/getByRoleIdAndMarkId',
    method: 'get',
    params
})

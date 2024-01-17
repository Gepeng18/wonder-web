import request from "@/utils/request";

const prefix = '/dict'

export const get = (id, headers = {}) => request({
    url: prefix + '/' + id,
    method: 'get',
    headers
})

export const page = (data = {}, headers = {}) => request({
    url: prefix + '/page',
    method: 'get',
    data,
    headers
})

export const list = (data = {}, headers = {}) => request({
    url: prefix + '/list',
    method: 'get',
    data,
    headers
})

export const findByDictCode = (dictCode, headers = {}) => request({
    url: prefix + '/findByDictCode/' + dictCode,
    method: 'get',
    headers
})

export const update = (data = {}, headers = {}) => request({
    url: prefix,
    method: 'put',
    data,
    headers
})

export const save = (data = {}, headers = {}) => request({
    url: prefix,
    method: 'post',
    data,
    headers
})

export const del = (id, headers = {}) => request({
    url: prefix + '/' + id,
    method: 'delete',
    headers
})



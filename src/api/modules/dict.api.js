import request from "@/utils/request";

const prefix = '/dict'

export const findById = (params = {}) => request({
    url: '/findById',
    method: 'get',
    params
})

export const get = (id, headers = {}) => request({
    url: prefix + '/get/' + id,
    method: 'get',
    headers
})

export const page = (data = {}, headers = {}) => request({
    url: prefix + '/page',
    method: 'post',
    data,
    headers
})

export const list = (data = {}, headers = {}) => request({
    url: prefix + '/list',
    method: 'post',
    data,
    headers
})

export const findByDictCode = (dictCode, headers = {}) => request({
    url: prefix + '/findByDictCode/' + dictCode,
    method: 'get',
    headers
})



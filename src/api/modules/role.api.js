import request from "@/utils/request";

export const findPage = (data = {}) => request({
    url: '/role/list',
    method: 'post',
    data
})

export const edit = (data = {}) => request({
    url: '/role/edit',
    method: 'post',
    data
})


import request from "@/utils/request";

const prefix = '/file'
export const upload = (data = {}, headers = {}) => request({
    url: prefix + '/upload',
    method: 'post',
    data,
    headers
})

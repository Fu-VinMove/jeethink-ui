import request from '@/utils/request'

export function createText(data) {
  return request({
    url: '/text/createText',
    method: 'post',
    data: data,
    responseType:'blob'
  })
}

export function getPDF() {
  return request({
    url: '/text/getPDF',
    method: 'get',
    responseType:'arraybuffer'
  })
}

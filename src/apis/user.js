import ajax from '@/utils/request'

export function login(data) {
  return ajax({
    url: '/adminRoot/login',
    method: 'post',
    params: data
  })
}

export function logout() {
  return ajax({
    url: '/adminRoot/logout',
    method: 'get'
  })
}

export function getInfo(data) {
  return ajax({
    url: '/admin/infoByName',
    method: 'get',
    params: data
  })
}

export function updatePassword(data) {
  return ajax({
    url: '/adminRoot/updatePassword',
    method: 'post',
    data: ajax.form(data)
  })
}

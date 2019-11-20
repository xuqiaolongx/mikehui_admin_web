import ajax from '@/utils/request'

export function login(data) {
  return ajax({
    url: '/adminRoot/login',
    method: 'post',
    params: data
  })
}

export function loginOut() {
  return ajax({
    url: '/adminRoot/logout',
    method: 'get'
  })
}

// 获取归属品牌列表
export function getAffiliationBrandList() {
  return ajax({
    url: '/admin/member/affiliation',
    method: 'get'
  })
}

// 获取会员列表
export function getMemberList() {
  return ajax({
    url: '/admin/member/vipLevel',
    method: 'get'
  })
}

// 1.返回省级地区
export function getRoot() {
  return ajax({
    url: '/admin/merchantReturnAddress/getRoot',
    method: 'get'
  })
}

// 2.返回市级地区
export function getCity(params) {
  return ajax({
    url: '/admin/merchantReturnAddress/getCity',
    method: 'get',
    params
  })
}

// 3.返回区级地区
export function getDistrict(params) {
  return ajax({
    url: '/admin/merchantReturnAddress/getDistrict',
    method: 'get',
    params
  })
}

// 4.根据ID回显
export function getReturnCity(params) {
  return ajax({
    url: '/admin/merchantReturnAddress/upwardSearch',
    method: 'get',
    params
  })
}

// 获取主营类目
export function getCategoryOneLevel() {
  return ajax({
    url: '/admin/productCategory/one',
    method: 'get'
  })
}

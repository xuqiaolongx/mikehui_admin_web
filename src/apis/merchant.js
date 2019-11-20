import ajax from '@/utils/request'

// 商家管理 ----------------------------
// 获取列表
export function getMerchantList(data) {
  return ajax({
    url: '/admin/merchant/list',
    method: 'get',
    params: data
  })
}
// 获取详情
export function getMerchantDetails(data) {
  return ajax({
    url: '/admin/merchant/edit',
    method: 'get',
    params: data
  })
}

// 修改
export function MerchantUpdate(data) {
  return ajax({
    url: '/admin/merchant/update',
    method: 'post',
    data
  })
}

// 审核
export function MerchantAudit(data) {
  return ajax({
    url: '/admin/merchant/audit',
    method: 'post',
    data: ajax.form(data)
  })
}

// 店铺管理 ----------------------------
// 获取列表
export function getShopList(data) {
  return ajax({
    url: '/admin/shop/list',
    method: 'get',
    params: data
  })
}
// 获取详情
export function getShopDetails(data) {
  return ajax({
    url: '/admin/shop/edit',
    method: 'get',
    params: data
  })
}

// 修改
export function ShopUpdate(data) {
  return ajax({
    url: '/admin/shop/update',
    method: 'post',
    data
  })
}

// 审核
export function ShopAudit(data) {
  return ajax({
    url: '/admin/shop/audit',
    method: 'post',
    data: ajax.form(data)
  })
}

import ajax from '@/utils/request'

// 销售订单 ----------------------------

// 获取列表
export function getSaleOrderList(data) {
  return ajax({
    url: '/admin/orders/list',
    method: 'get',
    params: data
  })
}

// 查看详情
export function getSaleOrderDetails(data) {
  return ajax({
    url: '/admin/orders/edit',
    method: 'get',
    params: data
  })
}

// 退货订单 ----------------------------

// 获取列表
export function getReturnOrderList(data) {
  return ajax({
    url: '/admin/refundOrders/list',
    method: 'get',
    params: data
  })
}

// 查看详情
export function getReturnOrderDetails(data) {
  return ajax({
    url: '/admin/refundOrders/edit',
    method: 'get',
    params: data
  })
}

import ajax from '@/utils/request'

// 用户信息 ----------------------------

// 获取列表
export function getMemberList(data) {
  return ajax({
    url: '/admin/member/list',
    method: 'get',
    params: data
  })
}

// 查看详情
export function getMemberDetails(data) {
  return ajax({
    url: '/admin/member/edit',
    method: 'get',
    params: data
  })
}

// 米宝流水记录 ----------------------------

// 获取列表
export function getFlowRecordList(data) {
  return ajax({
    url: '/epointrecords/list',
    method: 'get',
    params: data
  })
}
// 用户收藏店铺 ----------------------------

// 获取列表
export function getShopCollectionList(data) {
  return ajax({
    url: '/admin/favoriteShop/list',
    method: 'get',
    params: data
  })
}
// 获取详情
export function getShopCollectionDetails(data) {
  return ajax({
    url: '/admin/favoriteShop/edit',
    method: 'get',
    params: data
  })
}
// 用户收藏商品 ----------------------------

// 获取列表
export function getGoodsCollectionList(data) {
  return ajax({
    url: '/admin/favoriteProduct/list',
    method: 'get',
    params: data
  })
}
// 获取详情
export function getGoodsCollectionDetails(data) {
  return ajax({
    url: '/admin/favoriteProduct/edit',
    method: 'get',
    params: data
  })
}
// 用户浏览记录 ----------------------------

// 获取列表
export function getBrowsingHistoryList(data) {
  return ajax({
    url: '/admin/member/historyList',
    method: 'get',
    params: data
  })
}
// 获取详情
export function getBrowsingHistoryDetails(data) {
  return ajax({
    url: '/admin/member/historyDetail',
    method: 'get',
    params: data
  })
}

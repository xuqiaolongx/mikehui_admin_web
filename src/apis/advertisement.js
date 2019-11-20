import ajax from '@/utils/request'

/**
 * 广告管理-首页轮播图广告
 */

// 首页轮播图-列表
export function ByAdvertisingList(params) {
  return ajax({
    url: '/admin/advertising/ByAdvertisingList',
    method: 'get',
    params
  })
}

// 首页轮播图-删除
export function ByAdvertisingDelete(data) {
  return ajax({
    url: '/admin/advertising/ByAdvertisingDelete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 首页轮播图-添加
export function ByAdvertisingSave(data) {
  return ajax({
    url: '/admin/advertising/ByAdvertisingSave',
    method: 'post',
    data: ajax.form(data)
  })
}

// 首页轮播图-获取信息
export function ByAdvertisingEdit(params) {
  return ajax({
    url: '/admin/advertising/ByAdvertisingEdit',
    method: 'get',
    params
  })
}

// 首页轮播图-更新
export function ByAdvertisingUpdate(data) {
  return ajax({
    url: '/admin/advertising/ByAdvertisingUpdate',
    method: 'post',
    data: ajax.form(data)
  })
}

/**
 * 广告管理-新品快报
 */

// 新品快报-列表
export function NewProductList(params) {
  return ajax({
    url: '/admin/advertising/NewProductList',
    method: 'get',
    params
  })
}

// 新品快报-删除
export function NewProductDelete(data) {
  return ajax({
    url: '/admin/advertising/NewProductDelete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 新品快报-添加
export function NewProductSave(data) {
  return ajax({
    url: '/admin/advertising/NewProductSave',
    method: 'post',
    data: ajax.form(data)
  })
}

// 新品快报-获取信息
export function NewProductEdit(params) {
  return ajax({
    url: '/admin/advertising/NewProductEdit',
    method: 'get',
    params
  })
}

// 新品快报-更新
export function NewProductUpdate(data) {
  return ajax({
    url: '/admin/advertising/NewProductUpdate',
    method: 'post',
    data: ajax.form(data)
  })
}

/**
 * 广告管理-今日必拼
 */

// 今日必拼-列表
export function TodayGroupList(params) {
  return ajax({
    url: '/admin/advertising/TodayGroupList',
    method: 'get',
    params
  })
}

// 今日必拼-删除
export function TodayGroupDelete(data) {
  return ajax({
    url: '/admin/advertising/TodayGroupDelete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 今日必拼-添加
export function TodayGroupSave(data) {
  return ajax({
    url: '/admin/advertising/TodayGroupSave',
    method: 'post',
    data: ajax.form(data)
  })
}

// 今日必拼-获取信息
export function TodayGroupEdit(params) {
  return ajax({
    url: '/admin/advertising/TodayGroupEdit',
    method: 'get',
    params
  })
}

// 今日必拼-更新
export function TodayGroupUpdate(data) {
  return ajax({
    url: '/admin/advertising/TodayGroupUpdate',
    method: 'post',
    data: ajax.form(data)
  })
}

/**
 * 广告管理-拼团推介
 */

// 拼团推介-列表
export function GroupToPromoteList(params) {
  return ajax({
    url: '/admin/advertising/GroupToPromoteList',
    method: 'get',
    params
  })
}

// 拼团推介-删除
export function GroupToPromoteDelete(data) {
  return ajax({
    url: '/admin/advertising/GroupToPromoteDelete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 拼团推介-添加
export function GroupToPromoteSave(data) {
  return ajax({
    url: '/admin/advertising/GroupToPromoteSave',
    method: 'post',
    data: ajax.form(data)
  })
}

// 拼团推介-获取信息
export function GroupToPromoteEdit(params) {
  return ajax({
    url: '/admin/advertising/GroupToPromoteEdit',
    method: 'get',
    params
  })
}

// 拼团推介-更新
export function GroupToPromoteUpdate(data) {
  return ajax({
    url: '/admin/advertising/GroupToPromoteUpdate',
    method: 'post',
    data: ajax.form(data)
  })
}

/**
 * 广告管理-分类广告轮播图
 */

// 分类广告轮播图-列表
export function ClassifiedList(params) {
  return ajax({
    url: '/admin/advertising/ClassifiedList',
    method: 'get',
    params
  })
}

// 分类广告轮播图-删除
export function ClassifiedDelete(data) {
  return ajax({
    url: '/admin/advertising/ClassifiedDelete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 分类广告轮播图-添加
export function ClassifiedSave(data) {
  return ajax({
    url: '/admin/advertising/ClassifiedSave',
    method: 'post',
    data: ajax.form(data)
  })
}

// 分类广告轮播图-获取信息
export function ClassifiedEdit(params) {
  return ajax({
    url: '/admin/advertising/ClassifiedEdit',
    method: 'get',
    params
  })
}

// 分类广告轮播图-更新
export function ClassifiedUpdate(data) {
  return ajax({
    url: '/admin/advertising/ClassifiedUpdate',
    method: 'post',
    data: ajax.form(data)
  })
}

/**
 * 广告管理-当地特产轮播图
 */

// 当地特产轮播图-列表
export function LocalSpecialityList(params) {
  return ajax({
    url: '/admin/advertising/LocalSpecialityList',
    method: 'get',
    params
  })
}

// 当地特产轮播图-删除
export function LocalSpecialityDelete(data) {
  return ajax({
    url: '/admin/advertising/LocalSpecialityDelete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 当地特产轮播图-添加
export function LocalSpecialitySave(data) {
  return ajax({
    url: '/admin/advertising/LocalSpecialitySave',
    method: 'post',
    data: ajax.form(data)
  })
}

// 当地特产轮播图-获取信息
export function LocalSpecialityEdit(params) {
  return ajax({
    url: '/admin/advertising/LocalSpecialityEdit',
    method: 'get',
    params
  })
}

// 当地特产轮播图-更新
export function LocalSpecialityUpdate(data) {
  return ajax({
    url: '/admin/advertising/LocalSpecialityUpdate',
    method: 'post',
    data: ajax.form(data)
  })
}

/**
 * 广告管理-精选特广告商品
 */

// 精选特广告商品-列表
export function PickedSpecialityList(params) {
  return ajax({
    url: '/admin/advertising/PickedSpecialityList',
    method: 'get',
    params
  })
}

// 精选特广告商品-删除
export function PickedSpecialityDelete(data) {
  return ajax({
    url: '/admin/advertising/PickedSpecialityDelete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 精选特广告商品-添加
export function PickedSpecialitySave(data) {
  return ajax({
    url: '/admin/advertising/PickedSpecialitySave',
    method: 'post',
    data: ajax.form(data)
  })
}

// 精选特广告商品-获取信息
export function PickedSpecialityEdit(params) {
  return ajax({
    url: '/admin/advertising/PickedSpecialityEdit',
    method: 'get',
    params
  })
}

// 精选特广告商品-更新
export function PickedSpecialityUpdate(data) {
  return ajax({
    url: '/admin/advertising/PickedSpecialityUpdate',
    method: 'post',
    data: ajax.form(data)
  })
}

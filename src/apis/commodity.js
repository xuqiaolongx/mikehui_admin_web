import ajax from '@/utils/request'

// 商品分类 ------------------------------

// 获取商品分类一级列表
export function getProductCategoryFirstList() {
  return ajax({
    url: '/admin/productCategory/one',
    method: 'get'
  })
}

// 获取商品分类下级列表
export function getProductCategoryNextList(data) {
  return ajax({
    url: '/admin/productCategory/twoOrThree',
    method: 'get',
    params: data
  })
}

// 获取商品分类列表
export function getProductCategoryList() {
  return ajax({
    url: '/admin/productCategory/list',
    method: 'get'
  })
}

// 添加商品分类
export function addProductCategory(data) {
  return ajax({
    url: '/admin/productCategory/add',
    method: 'post',
    params: data
  })
}

// 删除商品分类
export function deleteProductCategory(data) {
  return ajax({
    url: '/admin/productCategory/delete',
    method: 'post',
    params: data
  })
}

// 编辑商品分类-获取详情
export function editProductCategory(data) {
  return ajax({
    url: '/admin/productCategory/edit',
    method: 'get',
    params: data
  })
}

// 更新商品分类
export function updateProductCategory(data) {
  return ajax({
    url: '/admin/productCategory/update',
    method: 'post',
    data: ajax.form(data)
  })
}

// 商品列表 ------------------------------

// 获取商品列表
export function productList(data) {
  return ajax({
    url: '/admin/Product/list',
    method: 'get',
    params: data
  })
}

// 获取商品详情
export function productDetails(data) {
  return ajax({
    url: '/admin/Product/edit',
    method: 'get',
    params: data
  })
}

// 商品评论 ------------------------------

// 获取商品评论列表
export function commentList(data) {
  return ajax({
    url: '/admin/productComment/list',
    method: 'get',
    params: data
  })
}

// 获取评论详细
export function commentDetails(data) {
  return ajax({
    url: '/admin/productComment/edit',
    method: 'get',
    params: data
  })
}

/**
 *  商品分类
 */

// 获取所有一级分类
export function oneCategory() {
  return ajax({
    url: '/admin/productCategory/one',
    method: 'get'
  })
}

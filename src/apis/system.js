import ajax from '@/utils/request'

// 管理员管理 ----------------------------

// 获取列表
export function getAdminList(data) {
  return ajax({
    url: '/admin/list',
    method: 'get',
    params: data
  })
}

// 查看详情
export function getAdminInfo(data) {
  return ajax({
    url: '/admin/info',
    method: 'get',
    params: data
  })
}

// 新增
export function addAdmin(data) {
  return ajax({
    url: '/admin/add',
    method: 'post',
    data: data
  })
}

// 删除
export function delAdmin(data) {
  return ajax({
    url: '/admin/delete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 修改
export function updateAdmin(data) {
  return ajax({
    url: '/admin/update',
    method: 'post',
    data: data
  })
}

// 角色管理 ----------------------------
// 获取列表
export function getRoleList(data) {
  return ajax({
    url: '/role/list',
    method: 'get',
    params: data
  })
}

// 查看详情
export function getRoleInfo(data) {
  return ajax({
    url: '/role/edit',
    method: 'get',
    params: data
  })
}

// 新增
export function addRole(data) {
  return ajax({
    url: '/role/add',
    method: 'post',
    data: data
  })
}

// 删除
export function delRole(data) {
  return ajax({
    url: '/role/delete',
    method: 'post',
    data: ajax.form(data)
  })
}

// 修改
export function updateRole(data) {
  return ajax({
    url: '/role/update',
    method: 'post',
    data: data
  })
}

// 权限列表
export function getAuthoritiesList(data) {
  return ajax({
    url: '/role/getAllAuthorities',
    method: 'get',
    params: data
  })
}

// 标签设置 ----------------------------
// 获取标签
export function getTagList(data) {
  return ajax({
    url: '/admin/findAllCommentTags',
    method: 'get'
  })
}
// 更改标签
export function updateTagList(data) {
  return ajax({
    url: '/admin/updateCommentTag',
    method: 'post',
    data
  })
}

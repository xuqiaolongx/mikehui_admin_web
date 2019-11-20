import Layout from '@/layout'

const system = {
  path: '/system',
  component: Layout,
  alwaysShow: true,
  name: 'system',
  redirect: '/system/role',
  meta: { title: '设置', icon: 'system' },
  children: [
    {
      path: 'role',
      component: () => import('@/pages/system/role/index'),
      name: 'Role',
      meta: { title: '角色设置', noCache: true, roles: ['role'] }
    },
    {
      path: 'role-edit',
      component: () => import('@/pages/system/role/roleEdit'),
      name: 'RoleEdit',
      meta: { title: '编辑角色', noCache: true, roles: ['role'] },
      hidden: true
    },
    {
      path: 'role-add',
      component: () => import('@/pages/system/role/roleEdit'),
      name: 'RoleEdit-Add',
      meta: { title: '新增角色', noCache: true, roles: ['role'] },
      hidden: true
    },
    {
      path: 'admin',
      component: () => import('@/pages/system/admin/index'),
      name: 'Admin_',
      meta: { title: '管理员设置', onCache: true, roles: ['admin'] }
    },
    {
      path: 'admin-edit',
      component: () => import('@/pages/system/admin/adminEdit'),
      name: 'AdminEdit',
      meta: { title: '编辑管理员', noCache: true, roles: ['admin'] },
      hidden: true
    },
    {
      path: 'admin-add',
      component: () => import('@/pages/system/admin/adminEdit'),
      name: 'AdminEdit-Add',
      meta: { title: '新增管理员', noCache: true, roles: ['admin'] },
      hidden: true
    },
    {
      path: 'setting',
      component: () => import('@/pages/system/setting'),
      name: 'Setting',
      meta: { title: '系统设置' }
    }
  ]
}

export default system

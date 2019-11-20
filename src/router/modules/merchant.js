import Layout from '@/layout'

const router = {
  path: '/merchant',
  component: Layout,
  alwaysShow: true,
  name: 'merchant',
  redirect: '/merchant/merchant-manage',
  meta: { title: '商家管理', icon: 'merchant' },
  children: [
    {
      path: 'merchant-category',
      component: () => import('@/pages/merchant/merchantCategory/index'),
      name: 'MerchantCategory',
      meta: { title: '商家分类', noCache: true }
    },
    {
      path: 'merchant-manage',
      component: () => import('@/pages/merchant/merchantManage/index'),
      name: 'MerchantManage',
      meta: { title: '商家管理', noCache: true }
    },
    {
      path: 'merchant-manage-edit',
      component: () => import('@/pages/merchant/merchantManage/merchantManageEdit'),
      name: 'MerchantManageEdit',
      meta: { title: '商家编辑', noCache: true },
      hidden: true
    }
  ]
}

export default router

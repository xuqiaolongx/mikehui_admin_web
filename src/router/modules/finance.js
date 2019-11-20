import Layout from '@/layout'

const router = {
  path: '/finance',
  component: Layout,
  alwaysShow: true,
  name: 'finance',
  redirect: '/finance/rebate-setting',
  meta: { title: '财务管理', icon: 'finance' },
  children: [
    {
      path: 'rebate-setting',
      component: () => import('@/pages/finance/rebateSetting'),
      name: 'RebateSetting',
      meta: { title: '返点设置', noCache: true }
    },
    {
      path: 'rebate-flow',
      component: () => import('@/pages/finance/rebateFlow'),
      name: 'RebateFlow',
      meta: { title: '返点流水', noCache: true }
    }
  ]
}

export default router

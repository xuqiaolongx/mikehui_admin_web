import Layout from '@/layout'

const router = {
  path: '/analyse',
  component: Layout,
  alwaysShow: true,
  name: 'analyse',
  redirect: '/analyse/analyse-classify',
  meta: { title: '营业分析', icon: 'analyse' },
  children: [
    {
      path: 'analyse-classify',
      component: () => import('@/pages/analyse/ruleClassify'),
      name: 'ruleClassify',
      meta: { title: '规则分类' }
    },
    {
      path: 'analyse-list',
      component: () => import('@/pages/analyse/ruleList'),
      name: 'ruleList',
      meta: { title: '规则列表' }
    },
    {
      path: 'helpCenter-classify',
      component: () => import('@/pages/analyse/helpCenterClassify'),
      name: 'helpCenterClassify',
      meta: { title: '帮助中心分类' }
    },
    {
      path: 'helpCenter-list',
      component: () => import('@/pages/analyse/helpCenterList'),
      name: 'helpCenterList',
      meta: { title: '帮助中心列表' }
    }
  ]
}

export default router

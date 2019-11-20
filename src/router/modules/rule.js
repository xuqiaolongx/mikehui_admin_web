import Layout from '@/layout'

const router = {
  path: '/rule',
  component: Layout,
  alwaysShow: true,
  name: 'rule',
  redirect: '/rule/rule-classify',
  meta: { title: '规则管理', icon: 'rule' },
  children: [
    {
      path: 'rule-classify',
      component: () => import('@/pages/rule/ruleClassify'),
      name: 'ruleClassify',
      meta: { title: '规则分类' }
    },
    {
      path: 'rule-list',
      component: () => import('@/pages/rule/ruleList'),
      name: 'ruleList',
      meta: { title: '规则列表' }
    },
    {
      path: 'helpCenter-classify',
      component: () => import('@/pages/rule/helpCenterClassify'),
      name: 'helpCenterClassify',
      meta: { title: '帮助中心分类' }
    },
    {
      path: 'helpCenter-list',
      component: () => import('@/pages/rule/helpCenterList'),
      name: 'helpCenterList',
      meta: { title: '帮助中心列表' }
    }
  ]
}

export default router

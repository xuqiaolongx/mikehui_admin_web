import Layout from '@/layout'

const router = {
  path: '/member',
  component: Layout,
  alwaysShow: true,
  name: 'member',
  redirect: '/member/member-info',
  meta: { title: '用户管理', icon: 'user' },
  children: [
    {
      path: 'member-info',
      component: () => import('@/pages/member/memberInfo/index'),
      name: 'MemberInfo',
      meta: { title: '用户信息' }
    },
    {
      path: 'member-info-details',
      component: () => import('@/pages/member/memberInfo/memberInfoDetails'),
      name: 'MemberInfoDetails',
      meta: { title: '用户信息详情', noCache: true },
      hidden: true
    }
  ]
}

export default router

import Layout from '@/layout'

const router = {
  path: '/comment',
  component: Layout,
  alwaysShow: true,
  name: 'comment',
  redirect: '/item/item-message',
  meta: { title: '评论管理', icon: 'comment' },
  children: [
    {
      path: 'comment',
      component: () => import('@/pages/comment/comment'),
      name: 'Comment',
      meta: { title: '评论查询', noCache: true }
    }
  ]
}

export default router

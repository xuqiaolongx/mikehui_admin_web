import Layout from '@/layout'

const router = {
  path: '/item',
  component: Layout,
  alwaysShow: true,
  name: 'item',
  redirect: '/item/item-message',
  meta: { title: '项目管理', icon: 'component' },
  children: [
    {
      path: 'item-message',
      component: () => import('@/pages/item/itemMessage'),
      name: 'ItemMessage',
      meta: { title: '项目信息', noCache: true }
    }
  ]
}

export default router

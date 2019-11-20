import Layout from '@/layout'

const router = {
  path: '/marketing',
  component: Layout,
  alwaysShow: true,
  name: 'marketing',
  redirect: '/marketing/shop-coupons',
  meta: { title: '营销管理', icon: 'marketing' },
  children: [
    {
      path: 'shop-coupons',
      component: () => import('@/pages/marketing/shopCoupons'),
      name: 'shopCoupons',
      meta: { title: '店铺优惠券管理' }
    },
    {
      path: 'goods-coupons',
      component: () => import('@/pages/marketing/goodsCoupons'),
      name: 'goodsCoupons',
      meta: { title: '商品优惠券管理' }
    },
    {
      path: 'seckill',
      component: () => import('@/pages/marketing/seckill'),
      name: 'seckill',
      meta: { title: '限时秒杀管理' }
    },
    {
      path: 'clearance',
      component: () => import('@/pages/marketing/clearance'),
      name: 'clearance',
      meta: { title: '清仓专场管理' }
    },
    {
      path: 'rushToBuy',
      component: () => import('@/pages/marketing/rushToBuy'),
      name: 'rushToBuy',
      meta: { title: '清仓专场管理' }
    }
  ]
}

export default router

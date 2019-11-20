import Layout from '@/layout'

const router = {
  path: '/order',
  component: Layout,
  alwaysShow: true,
  name: 'order',
  redirect: '/order/order',
  meta: { title: '订单管理', icon: 'order' },
  children: [
    {
      path: 'order',
      component: () => import('@/pages/order/order/index'),
      name: 'OrderList',
      meta: { title: '预约订单' }
    },
    {
      path: 'order-details',
      component: () => import('@/pages/order/order/orderDetails'),
      name: 'OrderDetails',
      meta: { title: '预约订单详情' },
      hidden: true
    },
    {
      path: 'sale',
      component: () => import('@/pages/order/sale/index'),
      name: 'SaleOrderList',
      meta: { title: '销售订单' }
    },
    {
      path: 'sale-details',
      component: () => import('@/pages/order/sale/saleOrderDetails'),
      name: 'SaleOrderDetails',
      meta: { title: '销售订单详情' },
      hidden: true
    },
    {
      path: 'return',
      component: () => import('@/pages/order/return/index'),
      name: 'ReturnOrderList',
      meta: { title: '退货订单' }
    },
    {
      path: 'return-details',
      component: () => import('@/pages/order/return/returnOrderDetails'),
      name: 'ReturnOrderDetails',
      meta: { title: '退货订单详情', noCache: true },
      hidden: true
    }
  ]
}

export default router

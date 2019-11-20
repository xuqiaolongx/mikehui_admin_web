import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

import merchantRouter from './modules/merchant'
import itemRouter from './modules/item'
import orderRouter from './modules/order'
import commentRouter from './modules/comment'
import memberRouter from './modules/member'
import financeRouter from './modules/finance'
import marketingRouter from './modules/marketing'
import analyseRouter from './modules/analyse'
import advertiseRouter from './modules/advertise'
import ruleRouter from './modules/rule'
import systemRouter from './modules/system'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'home' }
      },
      {
        path: '/password',
        component: () => import('@/pages/system/password'),
        name: 'Password',
        meta: { title: '修改密码', noCache: true },
        hidden: true
      },
      {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        hidden: true,
        meta: { title: '401', noCache: true }
      },
      {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        hidden: true,
        meta: { title: '404', noCache: true }
      }
    ]
  }
]
export const asyncRoutes = [
  merchantRouter,
  itemRouter,
  orderRouter,
  commentRouter,
  memberRouter,
  financeRouter,
  marketingRouter,
  analyseRouter,
  advertiseRouter,
  ruleRouter,
  systemRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

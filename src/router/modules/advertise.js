import Layout from '@/layout'

const advertise = {
  path: '/advertise',
  component: Layout,
  alwaysShow: true,
  name: 'advertise',
  redirect: '/advertise/rotary-advertising',
  meta: { title: '推广管理', icon: 'advertise' },
  children: [
    {
      path: 'rotary-advertising',
      component: () => import('@/pages/advertise/indexBanner/rotaryAdvertising'),
      name: 'rotaryAdvertising',
      meta: { title: '首页轮播广告图' }
    },
    {
      path: 'advertise-detail',
      component: () => import('@/pages/advertise/indexBanner/bannerDetail'),
      name: 'bannerDetail',
      hidden: true,
      meta: { title: '首页轮播广告详情' }
    },
    {
      path: 'product-advertising',
      component: () => import('@/pages/advertise/productBanner/productAdvertise'),
      name: 'productAdvertise',
      meta: { title: '新品快报广告' }
    },
    {
      path: 'product-advertise-detail',
      component: () => import('@/pages/advertise/productBanner/bannerDetail'),
      name: 'productBannerDetail',
      hidden: true,
      meta: { title: '新品快报广告详情' }
    },
    {
      path: 'today-advertising',
      component: () => import('@/pages/advertise/todayCollage/todayAdvertise'),
      name: 'todayAdvertise',
      meta: { title: '今日必拼广告' }
    },
    {
      path: 'today-advertise-detail',
      component: () => import('@/pages/advertise/todayCollage/bannerDetail'),
      name: 'todayBannerDetail',
      hidden: true,
      meta: { title: '今日必拼广告详情' }
    },
    {
      path: 'recommend-advertising',
      component: () => import('@/pages/advertise/recommend/recommendAdvertise'),
      name: 'recommendAdvertise',
      meta: { title: '拼团推荐商品广告' }
    },
    {
      path: 'recommend-advertise-detail',
      component: () => import('@/pages/advertise/recommend/bannerDetail'),
      name: 'recommendBannerDetail',
      hidden: true,
      meta: { title: '拼团推荐商品广告详情' }
    },
    {
      path: 'category-advertising',
      component: () => import('@/pages/advertise/category/categoryAdvertise'),
      name: 'categoryAdvertise',
      meta: { title: '分类广告轮播图' }
    },
    {
      path: 'category-advertise-detail',
      component: () => import('@/pages/advertise/category/bannerDetail'),
      name: 'categoryBannerDetail',
      hidden: true,
      meta: { title: '分类广告详情' }
    },
    {
      path: 'localProduct-advertising',
      component: () => import('@/pages/advertise/localProduct/localProductAdvertise'),
      name: 'localProductAdvertise',
      meta: { title: '当地特产广告轮播图' }
    },
    {
      path: 'localProduct-advertise-detail',
      component: () => import('@/pages/advertise/localProduct/bannerDetail'),
      name: 'localProductBannerDetail',
      hidden: true,
      meta: { title: '当地特产广告详情' }
    },
    {
      path: 'selectSpec-advertising',
      component: () => import('@/pages/advertise/selectSpec/selectSpecAdvertise'),
      name: 'selectSpecAdvertise',
      meta: { title: '精品特产广告轮播图' }
    },
    {
      path: 'selectSpec-advertise-detail',
      component: () => import('@/pages/advertise/selectSpec/bannerDetail'),
      name: 'selectSpecBannerDetail',
      hidden: true,
      meta: { title: '精品特产商品广告详情' }
    }
  ]
}

export default advertise

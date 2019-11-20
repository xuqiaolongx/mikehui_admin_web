export const parseType = function(type) {
  switch (type) {
    case '首页轮播图': {
      return 'Slideshow'
    }
    case '今日必拼': {
      return 'Collage'
    }
    case '拼团推荐商品': {
      return 'CollageProduct'
    }
    case '新品快报': {
      return 'New'
    }
    case '分类轮播图': {
      return 'CategorySlideshow'
    }
    case '当地特产': {
      return 'LocalSpecialty'
    }
    case '精选特产': {
      return 'SelectSpecialty'
    }
  }
}

export const parseBanner = function(banner) {
  switch (banner) {
    case '某商品': {
      return 'Product'
    }
    case '某店铺': {
      return 'Shop'
    }
    case '某分类或分类列表': {
      return 'Category'
    }
    case '限时秒杀': {
      return 'SecKill'
    }
    case '清仓专场 ': {
      return 'Clean'
    }
    case '天天拼团': {
      return 'CollageEveryDay'
    }
    case '1元抢购': {
      return 'One'
    }
    case '9.9特卖': {
      return 'NineNine'
    }
    case '当地特产': {
      return 'specialty'
    }
  }
}

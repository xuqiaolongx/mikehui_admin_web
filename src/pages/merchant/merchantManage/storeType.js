/* 门店类型
-------------------------- */
const STORE_TYPE_PERSONAL = 'Personal'
const STORE_TYPE_INDIVIDUAL = 'Business'
const STORE_TYPE_COUNTER = 'Shoppe'
const STORE_TYPE_MONOPOLIZE = 'Stores'
const STORE_TYPE_COMMON = 'General'

export const storeTypes = {
  Personal: STORE_TYPE_PERSONAL,
  Business: STORE_TYPE_INDIVIDUAL,
  Shoppe: STORE_TYPE_COUNTER,
  Stores: STORE_TYPE_MONOPOLIZE,
  General: STORE_TYPE_COMMON
}

export const parseType = function(type) {
  switch (type) {
    case STORE_TYPE_PERSONAL:
      return '个人'
    case STORE_TYPE_INDIVIDUAL:
      return '个体工商户'
    case STORE_TYPE_COUNTER:
      return '专柜店'
    case STORE_TYPE_MONOPOLIZE:
      return '专营店'
    case STORE_TYPE_COMMON:
      return '普通店'
  }
}

export const encodeType = function(type) {
  switch (type) {
    case '个人':
      return STORE_TYPE_PERSONAL
    case '个体工商户':
      return STORE_TYPE_INDIVIDUAL
    case '专柜店':
      return STORE_TYPE_COUNTER
    case '专营店':
      return STORE_TYPE_MONOPOLIZE
    case '普通店':
      return STORE_TYPE_COMMON
  }
}

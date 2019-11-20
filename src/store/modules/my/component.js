// 公共组件的数据来源
import { getProductCategoryList } from '@/apis/commodity'
import { getRoleList } from '@/apis/system'
import { getAffiliationBrandList, getMemberList } from '@/apis/common'

const modifyCategoryList = data => {
  return JSON.parse(JSON.stringify(data)
    .replace(/"name"/g, '"label"').replace(/"categoryLv2"/g, '"children"').replace(/"categoryLv3"/g, '"children"'))
}
const modifyBrandList = data => {
  return data.map(item => {
    return { label: item.affiliation, value: item.affiliation }
  })
}
const modifyMemberList = data => {
  return data.map(item => {
    return { label: item.vipLevel, value: item.vipLevel }
  })
}
const modifyRoleList = data => {
  return data.map(item => {
    return { label: item.name, value: item.id }
  })
}

const state = {
  categoryList: [],
  brandList: [],
  memberList: [],
  roleList: []
}

const mutations = {
  SET_CATEGORYLIST: (state, list) => {
    state.categoryList = list
  },
  SET_BRANDLIST: (state, list) => {
    state.brandList = list
  },
  SET_MEMBERLIST: (state, list) => {
    state.memberList = list
  },
  SET_ROLRLIST: (state, list) => {
    state.roleList = list
  }
}

const actions = {
  // 分类列表
  getProductCategoryList({ commit }) {
    return new Promise((resolve, reject) => {
      getProductCategoryList().then(response => {
        response.length > 0 && commit('SET_CATEGORYLIST', modifyCategoryList(response))
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 归属品牌列表
  getAffiliationBrandList({ commit }) {
    return new Promise((resolve, reject) => {
      getAffiliationBrandList().then(response => {
        (response.length > 0 && response[0]) && commit('SET_BRANDLIST', modifyBrandList(response))
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 会员列表
  getMemberList({ commit }) {
    return new Promise((resolve, reject) => {
      getMemberList().then(response => {
        response.length > 0 && commit('SET_MEMBERLIST', modifyMemberList(response))
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 权限列表
  getRoleList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getRoleList(data).then(response => {
        response.list.length > 0 && commit('SET_ROLRLIST', modifyRoleList(response.list))
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

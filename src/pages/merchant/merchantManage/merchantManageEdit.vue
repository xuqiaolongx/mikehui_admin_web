<template>
  <div class="settleIn">
    <h1> {{ `${settleInTypeCN}店铺备案` }}</h1>
    <div class="settleIn-container">
      <el-form ref="formValue" :model="formValue" class="settleIn-form" label-width="150px" disabled>
        <div class="settleIn-form-title">
          <span class="title-number">NO:1</span>
          <span>个人信息</span>
        </div>
        <el-form-item
          label="店铺负责人姓名"
          prop="name"
          :rules="rulesForm.name"
          class="settleIn-form-item"
        >
          <el-input v-model.trim="formValue.name" type="name" />
        </el-form-item>
        <el-form-item
          label="负责人手机号码"
          prop="phone"
          :rules="rulesForm.phone"
          class="settleIn-form-item"
        >
          <el-input v-model.trim="formValue.phone" type="phone" />
        </el-form-item>
        <el-form-item
          label="店铺主营类目"
          prop="category"
          :rules="rulesForm.category"
          class="settleIn-form-item"
        >
          <el-select
            v-model="formValue.categoryIdList"
            placeholder="请选择主营类目"
            multiple
            style="width: 350px"
          >
            <el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="身份证号码"
          prop="merchantCard"
          :rules="rulesForm.merchantCard"
          class="settleIn-form-item"
        >
          <el-input v-model.trim="formValue.merchantCard" type="merchantCard" />
        </el-form-item>
        <el-form-item
          label="联系地址"
          prop="areaId"
          :rules="rulesForm.areaId"
          class="settleIn-form-item"
          style="width: 700px"
        >
          <div class="flex-vertical">
            <el-select :value="province" @change="(value) => regionChange('province', value)">
              <el-option v-for="(item, index) in provinceList" :key="index" :label="item.name" :value="JSON.stringify(item)" />
            </el-select>
            <el-select style="margin: 0 20px" :value="city" @change="(value) => regionChange('city', value)">
              <el-option v-for="(item, index) in cityList" :key="index" :label="item.name" :value="JSON.stringify(item)" />
            </el-select>
            <el-select :value="area" @change="(value) => regionChange('area', value)">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="JSON.stringify(item)" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="address"
          :rules="rulesForm.address"
          class="settleIn-form-item"
        >
          <el-input v-model.trim="formValue.address" type="address" />
        </el-form-item>
        <div class="settleIn-form-title">
          <span class="title-number">NO:2</span>
          <span>个人上传证照</span>
        </div>
        <el-form-item
          label="上传身份证"
          prop="merchantCardImages"
          :rules="rulesForm.merchantCardImages"
          class="settleIn-form-item"
        >
          <div class="flex-vertical">
            <upload-id-card
              :img-src="require('@/assets/images/front-of-id-card.png')"
              :image-url="formValue.merchantCardImages[0]"
              @emitData="(value) => formValue.merchantCardImages[0] = value"
            />
            <upload-id-card
              :img-src="require('@/assets/images/back-of-id-card.png')"
              style="margin-left: 30px"
              :image-url="formValue.merchantCardImages[1]"
              @emitData="(value) => formValue.merchantCardImages[1] = value"
            />
          </div>
        </el-form-item>
        <div v-if="settleInType !== 'Personal'">
          <div class="settleIn-form-title">
            <span class="title-number">NO:3</span>
            <span>企业信息</span>
          </div>
          <el-form-item
            label="营业执照名称"
            prop="licenseName"
            :rules="rules_no3.licenseName"
            class="settleIn-form-item"
          >
            <el-input v-model.trim="formValue.licenseName" type="text" />
          </el-form-item>
          <el-form-item
            label="统一社会信用代码"
            prop="licenseCode"
            :rules="rules_no3.licenseCode"
            class="settleIn-form-item"
          >
            <el-input v-model.trim="formValue.licenseCode" type="text" />
          </el-form-item>
          <el-form-item
            label="营业执照期限"
            prop="licenseValidityTime"
            :rules="rules_no3.licenseValidityTime"
            class="settleIn-form-item"
          >
            <el-date-picker
              v-model="formValue.licenseValidityTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            />
          </el-form-item>
          <el-form-item
            label="上传营业执照"
            prop="licenseImage"
            :rules="rules_no3.licenseImage"
            class="settleIn-form-item"
          >
            <upload-id-card
              :img-src="require('@/assets/images/bussiness-liences.png')"
              :image-url="formValue.licenseImage"
              class="liences"
              @emitData="(value) => formValue.licenseImage = value"
            />
          </el-form-item>
          <el-form-item
            label="公司法人姓名"
            prop="legalName"
            :rules="rules_no3.legalName"
            class="settleIn-form-item"
          >
            <el-input v-model.trim="formValue.legalName" type="text" />
          </el-form-item>
          <el-form-item
            label="法人手机号码"
            prop="legalPhone"
            :rules="rules_no3.legalPhone"
            class="settleIn-form-item"
          >
            <el-input v-model.number="formValue.legalPhone" type="text" />
          </el-form-item>
          <el-form-item
            label="身份证号码"
            prop="legalCard"
            :rules="rules_no3.legalCard"
            class="settleIn-form-item"
          >
            <el-input v-model.trim="formValue.legalCard" type="text" />
          </el-form-item>
          <el-form-item
            label="上传身份证"
            prop="legalCardImages"
            :rules="rules_no3.legalCardImages"
            class="settleIn-form-item"
          >
            <div class="flex-vertical">
              <upload-id-card
                :img-src="require('@/assets/images/front-of-id-card.png')"
                :image-url="formValue.legalCardImages[0]"
                @emitData="(value) => formValue.legalCardImages[0] = value"
              />
              <upload-id-card
                :img-src="require('@/assets/images/back-of-id-card.png')"
                :image-url="formValue.legalCardImages[1]"
                style="margin-left: 30px"
                @emitData="(value) => formValue.legalCardImages[1] = value"
              />
            </div>
          </el-form-item>
        </div>
        <div v-if="settleInType === 'Shoppe' || settleInType === 'Stores'">
          <div class="settleIn-form-title">
            <span class="title-number">NO:4</span>
            <span>商标授权信息</span>
          </div>
          <div v-for="(item, index) in authorizationList" :key="index">
            <el-form-item label="品牌类型" class="settleIn-form-item">
              <el-radio-group v-model="authorizationList[index].brand">
                <el-radio label="自营品牌">自营品牌</el-radio>
                <el-radio label="授权品牌">授权品牌</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="品牌名称" class="settleIn-form-item">
              <el-input v-model.trim="authorizationList[index].brandName" type="text" />
            </el-form-item>
            <el-form-item label="商标注册证或授权书（二选一）" class="settleIn-form-item">
              <div class="flex-vertical">
                <upload-id-card
                  :img-src="require('@/assets/images/bussiness-liences.png')"
                  :image-url="authorizationList[index].trademarkImage"
                  @emitData="(value) => authorizationList[index].trademarkImage = value"
                />
              </div>
            </el-form-item>
          </div>
          <!-- <el-form-item class="settleIn-form-item" label="">
            <el-button class="margin-bottom-20" icon="el-icon-plus" @click="addAuthority">新增商标授权</el-button>
          </el-form-item> -->
        </div>
      </el-form>
      <div class="bottom-container">
        <div class="is-black">
          <span>是否列为黑名单</span>
          <el-switch v-model="isBlack" :disabled="!settleInType" />
        </div>
        <div class="bottom-bar">
          <el-button @click="$router.push('/merchant/merchant-manage')">返回</el-button>
          <el-button v-if="settleInType" type="primary" @click="submitForm">修改</el-button>
          <el-button v-if="state === '待审核'" type="success" @click="audit('Pass')">通过</el-button>
          <el-button v-if="state === '待审核'" type="danger" @click="rejectVisible = true">驳回</el-button>
        </div>
      </div>
      <el-dialog title="请输入驳回理由" :visible.sync="rejectVisible" width="500px">
        <el-input v-model="rejectReason" type="textarea" :rows="5" placeholder="请输入内容" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="rejectVisible = false">取 消</el-button>
          <el-button type="primary" @click="audit('UnPass')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import UploadIdCard from './UploadIdCard'
import { getRoot, getCity, getDistrict, getReturnCity, getCategoryOneLevel } from '@/apis/common'
import { MerchantUpdate, getMerchantDetails, MerchantAudit } from '@/apis/merchant'
import { parseType } from './storeType'
import { validIdCard, validPhone } from '@/utils/validate'

export default {
  name: 'MerchantManageEdit',
  components: { UploadIdCard },
  data() {
    const validateIdCard = (rule, value, callback) => {
      if (!validIdCard(value)) {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validEmptyArr = (rule, value, callback) => {
      const validEvery = value.some(item => !item)
      if (validEvery) {
        callback(new Error('请上传身份证正反面'))
      } else {
        callback()
      }
    }
    const query = this.$router.currentRoute.query
    return {
      id: query.id || '',
      settleInType: query.type || '',
      settleInTypeCN: query.type ? parseType(query.type) : '',
      state: query.state || '',
      formValue: {
        recordType: query ? parseType(query.type) : '', name: '', phone: '', categoryIdList: [],
        merchantCard: '', areaId: '', address: '', loginName: '', id: '',
        merchantCardImages: [], licenseName: '', licenseCode: '', licenseValidityTime: '',
        licenseImage: '', legalName: '', legalPhone: '', legalCard: '', legalCardImages: []
      },
      authorizationList: [
        { brand: '', brandName: '', trademarkImage: '' }
      ],
      categoryList: [],
      provinceList: [],
      cityList: [],
      areaList: [],
      province: '',
      city: '',
      area: '',
      rulesForm: {
        name: [{ required: true, trigger: 'blur', message: '请输入负责人姓名' }],
        phone: [{ required: true, trigger: 'blur', message: '请输入负责人手机号码', validator: validatePhone }],
        categoryIdList: [{ required: true, trigger: 'blur', message: '请选择店铺主营类目' }],
        merchantCard: [{ required: true, trigger: 'blur', validator: validateIdCard }],
        areaId: [{ required: true, trigger: 'blur', message: '请选择联系地址' }],
        address: [{ required: true, trigger: 'blur', message: '请添加详细地址' }],
        merchantCardImages: [{ required: true, trigger: 'blur', validator: validEmptyArr }]
      },
      rules_no3: {
        licenseName: [{ required: true, trigger: 'blur', message: '请输入营业执照名称' }],
        licenseCode: [{ required: true, trigger: 'blur', message: '请输入统一社会信用代码' }],
        licenseValidityTime: [{ required: true, trigger: 'blur', message: '请选择营业执照期限' }],
        licenseImage: [{ required: true, trigger: 'blur', message: '请上传营业执照' }],
        legalName: [{ required: true, trigger: 'blur', message: '请输入公司法人姓名' }],
        legalPhone: [{ required: true, trigger: 'blur', message: '请输入法人手机号码', validator: validatePhone }],
        legalCard: [{ required: true, trigger: 'blur', validator: validateIdCard }],
        legalCardImages: [{ required: true, trigger: 'blur', validator: validEmptyArr }]
      },
      // rules_no4: {
      //   brand: [{ required: true, trigger: 'blur', message: '请选择品牌类型' }],
      //   brandName: [{ required: true, trigger: 'blur', message: '请输入品牌名称' }],
      //   trademarkImage: [{ required: true, trigger: 'blur', message: '请上传商标注册证或授权书' }]
      // }
      isBlack: false,
      rejectVisible: false,
      rejectReason: ''
    }
  },
  watch: {
  },
  created() {
    this.getSettleInfo()
  },
  mounted() {
    this.getRootList()
    this.getProductCategory()
  },
  methods: {
    getSettleInfo() {
      // 根据入驻的类型 去掉form表单验证规则
      if (this.settleInType === 'Personal') {
        this.rules_no3 = {}
        this.authorizationList = []
      } else if (this.settleInType === 'Business' || this.settleInType === 'General') {
        this.authorizationList = []
      }
      // 已注册，但是还未备案
      if (!this.settleInType) return this.$message.warning('该商家还未进行备案！')
      // 获取备案信息（回显）
      getMerchantDetails({ id: this.id })
        .then(res => {
          const productCategoryList = res.productCategoryList || []
          const data = Object.assign({}, res.merchantInfoDto, { categoryIdList: productCategoryList.map(item => item.id) })
          Object.keys(this.formValue)
            .forEach((item, index) => {
              this.formValue[item] = data[item] || ''
            })
          const authorizationList = res.merchantInfoDto.trademarkAuthorizationList || []
          this.authorizationList = authorizationList.map(item => ({
            brand: item.brand, brandName: item.brandName, trademarkImage: item.trademarkImage
          }))
          this.state = res.merchantInfoDto.auditStatus || ''
          this.isBlack = res.merchantInfoDto.isBlackList || false
          return getReturnCity({ areaId: res.merchantInfoDto.areaId })
        })
        .then(res => {
          this.regionChange('province', JSON.stringify(res[0]))
          this.regionChange('city', JSON.stringify(res[1]))
          this.regionChange('area', JSON.stringify(res[2]))
        })
    },
    // 添加商家商标
    addAuthority() {
      this.authorizationList.push({ brand: '', brandName: '', trademarkImage: '' })
    },
    audit(data) {
      if (data === 'Pass') {
        MerchantAudit({ status: 'Pass', id: this.id }).then(res => {
          this.$message.success('审核通过')
          this.$router.push('/merchant/merchant-manage')
        })
      } else if (data === 'UnPass') {
        MerchantAudit({ status: 'UnPass', id: this.id, rejectReason: this.rejectReason }).then(res => {
          this.$message.success('驳回成功')
          this.$router.push('/merchant/merchant-manage')
        })
      }
    },
    submitForm() {
      const merchant = this.formValue
      merchant['isBlackList'] = this.isBlack
      const { authorizationList } = this
      MerchantUpdate({ merchant, authorizationList })
        .then(res => {
          this.$message.success('修改备案成功')
          this.$router.push('/merchant/merchant-manage')
        })
        .catch(err => {
          this.$message.error(err.errmsg)
        })
      // this.$refs.formValue.validate((valid) => {
      //   if (valid) {
      //     const merchant = this.formValue
      //     this.merchant['isBlackList'] = this.isBlack
      //     const { authorizationList } = this
      //     if (this.settleInType === 'Shoppe' || this.settleInType === 'Stores') {
      //       // 验证NO：4商标的表单信息是否为空
      //       const validAuthor = authorizationList.every(item => {
      //         return Object.keys(item).some(child => !item[child])
      //       })
      //       if (validAuthor) return this.$message.warning('请填写完整的商标信息')
      //     }
      //     MerchantUpdate({ merchant, authorizationList })
      //       .then(res => {
      //         this.$message.success('修改备案成功')
      //         this.$router.push('/merchant/merchant-manage')
      //       })
      //       .catch(err => {
      //         this.$message.error(err.errmsg)
      //       })
      //   }
      // })
    },
    regionChange(prop, value) {
      this.formValue.areaId = ''
      if (prop === 'province') {
        this.province = value
        this.city = ''
        this.area = ''
        this.getCityList(JSON.parse(value).id)
      }
      if (prop === 'city') {
        this.city = value
        this.area = ''
        this.getAreaList(JSON.parse(value).id)
      }
      if (prop === 'area') {
        this.area = value
        this.formValue.areaId = JSON.parse(value).id
      }
    },
    getProductCategory() {
      getCategoryOneLevel().then(res => {
        this.categoryList = res
      })
    },
    getRootList() {
      getRoot().then(res => {
        this.provinceList = res
        this.getCityList(res[0].id)
      })
    },
    getCityList(areaId) {
      getCity({ areaId }).then(res => {
        this.cityList = res
        this.getAreaList(res[0].id)
      })
    },
    getAreaList(areaId) {
      getDistrict({ areaId }).then(res => {
        this.areaList = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 40px;
  text-align: center;
}
.settleIn{
  .flex-vertical {
    display: flex;
    align-items: center;
  }
  .settleIn-container{
    width: 800px;
    padding-left: 50px;
    margin: 0 auto;
    .settleIn-form{
      .settleIn-form-title{
        color: #000;
        font-size: 22px;
        margin-bottom: 10px;
        .title-number{
          color: #f76c6c;
          font-weight: bold;
        }
      }
      .settleIn-form-item{
        width: 500px;
        margin-left: 20px;
      }
    }
  }
}
.bottom-container {
    width: 800px;
    margin: 0 auto;
  .is-black {
    span {
      font-size: 14px;
      font-weight: 700;
      color: #606266;
      width: 170px;
      padding-right: 15px;
      text-align: right;
      display: inline-block;
    }
  }
  .bottom-bar {
    width: 540px;
    margin: 50px auto 100px;
    /deep/ .el-button {
      width: 110px;
    }
  }
}
</style>


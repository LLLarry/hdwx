import { reactive, toRefs } from '@vue/composition-api'
import { toast } from '@/assets/js/vant-helper'
import { getCaptchaData, registerDealerAaccount } from '@/require/auth'
import { getWechatPublicAccountInfo } from '@/utils/util'

export default (router, route, store) => {
  let timer = null
  // 校验手机号
  const checkPhone = phone => /^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)
  // 校验验证码 / 邀请码
  const checkCaptcha = captcha => /^\d{6}$/.test(captcha)
  // 校验验证码 / 邀请码
  const checkNull = value => value.trim() === ''
  const initData = reactive({
    mobile: '', // 用户输入的手机号
    invitecode: '', // 邀请码
    captcha: '', // 验证码
    expireTime: 0, // 过期时间
    showPopover: false,
    logoModel: createLogoModel(route, store)
  })

  // 设置邀请码，并开启定时器
  const setCaptcha = (expireTime) => {
    initData.expireTime = expireTime
    // 开启定时器
    timer = setInterval(() => {
      --initData.expireTime
      if (initData.expireTime <= 0) {
        clearInterval(timer)
        initData.captcha = ''
        initData.expireTime = 0
      }
    }, 1000)
  }

  // 获取邀请码
  const getCaptcha = () => {
    let { mobile } = initData
    mobile = mobile.trim()
    if (checkNull(mobile)) { toast('请先输入注册手机号'); return false }
    if (!checkPhone(mobile)) { toast('注册手机号格式不正确'); return false }
    getCaptchaData({ phone: mobile })
    .then(res => {
      if (res.code === 200) {
        toast('验证码获取成功', 'success')
        setCaptcha(180)
      } else {
        toast(res.message, 'fail')
      }
    })
    .catch(() => {
      toast('异常错误', 'fail')
    })
  }

  const submit = () => {
    if (!verifi()) return false
    registerDealerAaccount({ ...initData, expireTime: undefined })
    .then(res => {
      if (res.code === 200) {
        store.commit('setUser', res.userinfo)
        toast('注册成功', 'success')
        setTimeout(() => {
          router && router.replace({ path: '/' })
        }, 2000)
      } else {
        toast(res.message, 'fail')
      }
    })
    .catch(() => {
      toast('异常错误', 'fail')
    })
  }

  // 校验输入的内容
  const verifi = () => {
    let { mobile, invitecode, captcha } = initData
    mobile = mobile.trim()
    invitecode = invitecode.trim()
    captcha = captcha.trim()
    if (checkNull(mobile)) { toast('注册手机号不能为空'); return false }
    if (!checkPhone(mobile)) { toast('注册手机号格式不正确'); return false }
    if (checkNull(invitecode)) { toast('邀请码不能为空'); return false }
    if (!checkPhone(invitecode) && !checkCaptcha(invitecode)) { toast('邀请码格式不正确'); return false }
    if (checkNull(captcha)) { toast('验证码不能为空'); return false }
    if (!checkCaptcha(captcha)) { toast('验证码格式不正确'); return false }
    return true
  }
  return {
    ...toRefs(initData),
    getCaptcha,
    submit
  }
}

/**
 * 创建logoModel
 * @param {*} route
 * @param {*} store
 * @returns logoModel对象
 */
const createLogoModel = (route, store) => {
  const platform = Number.isNaN(Number(route.query.platform)) ? Number(store.state.user.platform) : Number(route.query.platform)
  const publicAccountInfo = getWechatPublicAccountInfo(platform)
  // 获取公众号名字缩写
  const name = (publicAccountInfo || getWechatPublicAccountInfo.DEFAULT).key
  // 获取title缩放比例
  const scale = (publicAccountInfo || getWechatPublicAccountInfo.DEFAULT).scale || 1
  // 获取logo图片路径
  const logoModel = getLogoModel(name, scale)
  return logoModel
}

/**
 * 获取logo图片信息
 * @param {*} name 公众号名称速写 scale title缩放比例
 * @returns { logo: logo路径, title: title图片路径 }
 */
const getLogoModel = (name, scale) => {
  const imgRequire = require.context('../../assets/images/logo/', true, /\.(png)|(jpg)$/)
  const logoModel = imgRequire.keys()
            .filter(path => path.includes(name))
            .reduce((acc, path) => {
              if (path.includes('_logo')) {
                acc.logo = imgRequire(path)
              } else {
                acc.title = imgRequire(path)
              }
              return acc
            }, {})
    logoModel.scale = scale
    return logoModel
}

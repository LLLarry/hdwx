<template>
  <div class="mine-setting">
    <hd-title class="bg-white">设置</hd-title>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="3">
        <template #title>
          <div class="d-flex align-items-center">
            <img
              class="icon-img margin-right-1"
              src="../../../assets/images/mine/设置@2x.png"
              alt=""
            />
            <span>设置</span>
          </div>
        </template>
        <van-cell-group>
          <van-cell v-for="one in wrapper" :key="one.key" :title="one.title">
            <template #right-icon>
              <van-switch
                size="24px"
                active-color="rgb(7, 193, 96)"
                v-model="one.checked"
                :loading="one.loading"
                @input="checked => handleInput(one.key, checked)"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item name="4">
        <template #title>
          <div class="d-flex align-items-center">
            <img
              class="icon-img margin-right-1"
              src="../../../assets/images/mine/线性客服耳机.png"
              alt=""
            />
            <span>客服电话</span>
          </div>
        </template>
        <div class="">
          <p class="text-size-sm text-p padding-x-3" style="line-height: 1.8;">
            充电页面展示的售后电话优先级为：
            <strong class="text-success">“模板电话”</strong> >
            <strong class="text-success">“客服电话”</strong> >
            <strong class="text-success">“商户注册电话”</strong>
          </p>
          <van-form>
            <div class="d-flex align-items-center">
              <van-field
                v-model="phone"
                name="phone"
                label="客服电话"
                placeholder="请输入客服电话"
                clearable
                :readonly="!editting"
                :inputclass="editting"
              />
              <van-icon
                name="edit"
                size="0.6rem"
                class="padding-2 text-success"
                @click="editting = true"
              />
            </div>
          </van-form>
          <div style="margin: 16px;" class="d-flex">
            <!-- <van-button
                            :disabled="editting"
                            round
                            block
                            size="small"
                            class="padding-y-3 margin-right-4"
                            type="info"
                            native-type="submit"
                            icon="edit"
                            @click="editting = true"
                        >编辑</van-button> -->
            <van-button
              :disabled="!editting"
              v-if="editting"
              round
              block
              size="small"
              class="padding-y-3 margin-right-4"
              type="primary"
              native-type="submit"
              icon="idcard"
              @click="changeServerPhone"
              >保存</van-button
            >
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { updateAccountPhoneById, settingAuthoritySwitch } from '@/require/mine'
import { mapState, mapMutations } from 'vuex'
// 同步关键字
// const syncKeys = ['withmess', 'ordermess', 'showincoins', 'incoinrefund', 'walletcommon']
export default {
  props: {
    authority: {
      type: Object,
      default: () => {}
    },
    servephone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeNames: [],
      checked: true,
      wrapper: [
        { title: '提现通知', key: 'withmess', checked: false },
        { title: '订单通知', key: 'ordermess', checked: false },
        { title: '是否显示投币收益 ', key: 'showincoins', checked: false },
        {
          title: '是否开通脉冲模块自动退费  ',
          key: 'incoinrefund',
          checked: false
        },
        { title: '是否开启自动提现  ', key: 'autoWithdraw', checked: false },
        {
          title: '是否开通合伙人自动分摊缴费  ',
          key: 'apportion',
          checked: false
        },
        { title: '是否开启用户钱包通用', key: 'walletcommon', checked: false }
      ],
      phone: '', // 客服电话
      editting: false // 是否正在编辑
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    authority: {
      handler(list) {
        this.wrapper = this.wrapper.map(item => {
          return {
            ...item,
            checked: list[item.key] === 1
          }
        })
      },
      immediate: true,
      deep: true
    },
    servephone: {
      handler(value) {
        this.phone = value
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['setShowincoins']),
    async changeServerPhone() {
      try {
        const { code, message } = await updateAccountPhoneById({
          type: 1,
          uid: this.user.id,
          phone: this.phone
        })
        if (code === 200) {
          this.editting = false
          this.$dialog
            .alert({
              title: '提示',
              message: '修改成功'
            })
            .then(() => {
              this.$emit('reloadData')
            })
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      }
    },
    // 监听开关点击
    async handleInput(key, checked) {
      console.log(key, checked)
      const one = this.wrapper.find(item => item.key === key)
      this.$set(one, 'loading', true)
      const flag = await this.changeSwitchSync({ [key]: checked ? 1 : 2 })
      if (flag) {
        one.checked = checked
      } else {
        one.checked = !checked
      }
      this.$delete(one, 'loading')
      // 当切换是否显示投币收益
      if (key === 'showincoins') {
        this.setShowincoins(checked ? 1 : 2)
      }
    },
    // 同步修改用户设置
    async changeSwitchSync(map = {}) {
      const { code, message } = await settingAuthoritySwitch(
        {
          ...map,
          merid: this.user.id,
          source: 2
        },
        false
      )
      if (code !== 200) {
        this.$toast(message)
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss">
.mine-setting {
  input[inputclass] {
    border: 1px solid #ccc;
    padding: 0 5px;
  }
}
</style>

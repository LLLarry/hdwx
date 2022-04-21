<template>
  <div class="car-system bg-gray">
    <van-nav-bar
        title="系统参数"
        left-text="返回"
        class="shadow position-fixed w-100"
        left-arrow
        @click-left="$router.go(-1)"
     />
      <main>
          <div class="margin-3 padding-1 bg-white rounded-md shadow">
                <van-form @submit="onSubmit">
                    <div class="d-flex align-items-center">
                        <van-field
                            v-model="model.cst"
                            name="cst"
                            label="刷卡扣费金额"
                            placeholder="刷卡扣费金额"
                            :rules="[{ pattern: /^([1-9]([0-9]{0,7})|([0]))(\.[0-9]{1,4})?$/, message: '请输入正确的刷卡扣费金额' }]"
                        />
                        <span class="padding-right-2 text-999 w-25 text-right">元</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <van-field
                            v-model="model.elec_pri"
                            name="elec_pri"
                            label="扣费单价"
                            placeholder="扣费单价"
                            :rules="[{ pattern: /^([1-9]([0-9]{0,7})|([0]))(\.[0-9]{1,4})?$/, message: '请输入正确的扣费单价' }]"
                        />
                        <span class="padding-right-2 text-999 w-25 text-right">元 / 度电</span>
                    </div>
                    <div style="margin: 16px;" class="d-flex justify-content-around">
                        <van-button type="info" icon="replay" size="small" class="w-25" @click="handleGet">获取</van-button>
                        <van-button type="primary" icon="setting-o" size="small" class="w-25" native-type="submit">设置</van-button>
                    </div>
                </van-form>
          </div>
      </main>
  </div>
</template>

<script>
import { wolfreadsys, wolfsetsys } from '@/require/device'
export default {
    data () {
        return {
            code: this.$route.params.code,
            model: {}
        }
    },
    mounted () {
        this.getSystem()
    },
    methods: {
        async onSubmit (value) {
             try {
                const { code, message } = await wolfsetsys({
                    ...this.model,
                    code: this.code
                })
                if (Number(code) === 200) {
                    this.$toast('设置成功')
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        handleGet ($event) {
            $event.preventDefault()
            this.getSystem()
        },
        // 获取系统参数信息
        async getSystem () {
            try {
                // eslint-disable-next-line camelcase
                const { code, message, cst, elec_pri } = await wolfreadsys({
                    code: this.code
                })
                if (Number(code) === 200) {
                    this.model = {
                        cst,
                        elec_pri
                    }
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        }
    }
}
</script>

<style lang="scss">
.car-system {
    min-height: 100vh;
    main {
        padding-top: 46px;
    }
}
</style>

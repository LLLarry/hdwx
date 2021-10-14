<template>
  <div class="device-channelvale bg-gray">
    <van-nav-bar
        title="报警系统"
        left-text="返回"
        class="shadow position-fixed w-100"
        left-arrow
        @click-left="$router.go(-1)"
     />
      <main>
          <div class="bg-white padding-1 margin-3">
            <van-form>
                <van-field
                    v-model="model.channelvale"
                    name="channelvale"
                    label="上次获取信道值"
                    label-class="w-50"
                    readonly
                />
                <van-field
                    v-model="model.operateTime"
                    name="operateTime"
                    label="上次操作时间"
                    label-class="w-50"
                    readonly
                />
                <div class="d-flex align-items-center">
                    <van-field
                        v-model="model.newChannelvale"
                        name="newChannelvale"
                        label="获取最新信道值"
                        label-class="w-50"
                        input-align="center"
                        readonly
                    />
                    <span class="padding-right-2 text-999 w-25 text-right">
                        <van-button block size="mini" type="primary" icon="replay" @click="handleGetChannelinfo">获取</van-button>
                    </span>
                </div>
                <div class="d-flex align-items-center">
                    <van-field
                        v-model="model.value"
                        name="value"
                        label="设置信道值"
                        label-class="w-50"
                        :set-input="setting"
                        :readonly="!setting"
                    />
                    <span class="padding-right-2 text-999 w-25 text-right">
                        <van-button block size="mini" type="info" icon="peer-pay" v-if="setting" @click="saveChannelvale">保存</van-button>
                        <van-button block size="mini" type="primary" icon="setting-o" v-else @click="setting = true">设置</van-button>
                    </span>
                </div>
                <!-- <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div> -->
            </van-form>
          </div>
      </main>
  </div>
</template>

<script>
import { inquireChannelvaleLogData, inquireChannelinfo, setChannelinfo } from '@/require/device'
import { fmtDate } from '@/utils/util'
export default {
    data () {
        return {
            code: this.$route.params.code,
            model: {},
            setting: false // 是否正在设置
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        async init () {
            try {
                const { code, message, channelvale, operateTime } = await inquireChannelvaleLogData({ code: this.code })
                if (code === 200) {
                    this.model = {
                        channelvale,
                        operateTime
                    }
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        async handleGetChannelinfo () {
            try {
                const { code, message, result } = await inquireChannelinfo({ code: this.code })
                if (code === 200) {
                    const modelCopy = { ...this.model }
                    if (modelCopy.newOperateTime) {
                        modelCopy.channelvale = modelCopy.newChannelvale
                        modelCopy.operateTime = modelCopy.newOperateTime
                    }
                    modelCopy.newChannelvale = result.channelinfo
                    modelCopy.newOperateTime = fmtDate(new Date())
                    this.model = modelCopy
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        saveChannelvale () {
            let { value = '' } = this.model
            value = value.trim()
            if (!/^\d+$/.test(value)) {
                return this.$dialog.alert({
                    title: '提示',
                    message: '设置的信道值必须为正整数'
                })
            }
            setChannelinfo({ code: this.code, channelnum: value })
            .then(({ message }) => {
                this.$toast(message)
                this.model.value = ''
                this.setting = false
            })
            .catch(() => {
                this.$toast('异常错误')
                this.model.value = ''
                this.setting = false
            })
        }
    }
}
</script>

<style lang="scss">
.device-channelvale {
    min-height: 100vh;
    main {
        padding-top: 56px;
        input[set-input] {
            border: 1px solid #ccc;
            padding: 0 10px;
        }
    }
}
</style>

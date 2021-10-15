<template>
  <div class="device-alarm bg-gray">
    <van-nav-bar
        title="报警系统"
        left-text="返回"
        class="shadow position-fixed w-100"
        left-arrow
        @click-left="$router.go(-1)"
     />
      <main>
          <div>
                <van-cell-group class="margin-bottom-3" v-for="item in list" :key="item.type">
                    <van-cell title="单元格" >
                        <template #title>
                            <div class="d-flex align-items-center">
                                <van-image
                                    width="45"
                                    height="45"
                                    fit="fill"
                                    round
                                    :src="item.icon"
                                />
                                <span class="margin-left-3">{{item.title}}</span>
                            </div>
                        </template>
                        <template #label>
                            <div class="d-flex margin-top-2">
                                <div class="font-weight-bold">
                                    <span>报警阈值：</span>
                                    <span>{{item.threshold}}</span>
                                </div>
                                <div class="margin-left-4 font-weight-bold">
                                    <span>当前温度：</span>
                                    <span>{{item.value}} {{ item.type === 1 ? '℃' : item.type === 3 ? 'W' : '' }}</span>
                                </div>
                            </div>
                        </template>
                        <template #right-icon>
                            <div class="d-flex">
                                <div class="d-flex flex-column justify-content-around" >
                                    <van-button type="primary" size="mini" icon="replay" @click="handleUpdate(item.type)">更新</van-button>
                                    <van-button type="info" size="mini" style="margin: 0;" icon="setting-o" @click="handleSet(item)">设置</van-button>
                                </div>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
          </div>
      </main>
      <van-action-sheet v-model="editShow" :title="`设置${editInfo.type === 1 ? '温度' : editInfo.type === 2 ? '烟感' : '总功率'}阈值`">
        <div class="content">
            <van-form @submit="onSubmit">
                <div class="d-flex align-items-center">
                    <van-field
                        v-model="editInfo.value"
                        name="value"
                        :label="`${editInfo.type === 1 ? '温度' : editInfo.type === 2 ? '烟感' : '总功率'}阈值`"
                        :placeholder="`${editInfo.type === 1 ? '温度' : editInfo.type === 2 ? '烟感' : '总功率'}阈值`"
                        :rules="[{ pattern: /^\d+$/, message: '设置的阈值必须为正整数' }]"
                    />
                    <span class="padding-right-2 text-999 w-25 text-right">{{ editInfo.type === 1 ? '℃' : editInfo.type === 3 ? 'W' : '' }}</span>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">保存设置阈值</van-button>
                </div>
            </van-form>
        </div>
      </van-action-sheet>
  </div>
</template>

<script>
import { getDeviceNowArgument, getDeviceSetArgument, setDeviceArgument, inquireWarnHot } from '@/require/device'
export default {
    data () {
        return {
            code: this.$route.params.code,
            list: [
                { title: '温度监控', type: 1, threshold: '', value: '', icon: require('@/assets/images/温度报警.png') },
                { title: '烟感监控', type: 2, threshold: '', value: '', icon: require('@/assets/images/烟雾告警.png') },
                { title: '总功率监控', type: 3, threshold: '', value: '', icon: require('@/assets/images/过载报警.png') }
            ],
            editShow: false,
            editInfo: {
                type: 1,
                value: ''
            }
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        async init () {
            try {
                const { code, message, ...result } = await inquireWarnHot({ code: this.code })
                if (code === 200) {
                    this.list = [
                        { title: '温度监控', type: 1, threshold: result.hotDoorsill, value: result.hotDoorsillData, icon: require('@/assets/images/温度报警.png') },
                        { title: '烟感监控', type: 2, threshold: result.smokeDoorsill, value: result.smokeDoorsillData, icon: require('@/assets/images/烟雾告警.png') },
                        { title: '总功率监控', type: 3, threshold: result.powerTotal, value: result.powerTotalData, icon: require('@/assets/images/过载报警.png') }
                    ]
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        // 获取报警系统
        async getDeviceAlarmSattus (type) {
            try {
                const { returncode, message, value } = await getDeviceNowArgument({ code: this.code, type })
                // eslint-disable-next-line eqeqeq
                if (returncode == 200) {
                    this.list[type - 1].value = value
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        // 获取报警系统阈值
        async getDeviceAlarmThreshold (type) {
            try {
                const { returncode, message, value } = await getDeviceSetArgument({ code: this.code, type })
                    this.list[type - 1].threshold = value
                // eslint-disable-next-line eqeqeq
                if (returncode == 200) {
                    this.list[type - 1].threshold = value
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                console.log(error)
                this.$toast('异常错误')
            }
        },
        handleSet (row) {
            this.editInfo = {
                type: row.type,
                value: row.threshold
            }
            this.editShow = true
        },
        async onSubmit () {
            try {
                this.editShow = false
                const { returncode, message } = await setDeviceArgument({ code: this.code, ...this.editInfo })
                // eslint-disable-next-line eqeqeq
                if (returncode == 200) {
                    this.$toast(`${this.editInfo.type === 1 ? '温度' : this.editInfo.type === 2 ? '烟感' : '总功率'}阈值设置成功`)
                    this.list[this.editInfo.type - 1].threshold = this.editInfo.value
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        async handleUpdate (type) {
            try {
                Promise.all([
                    this.getDeviceAlarmSattus(type),
                    this.getDeviceAlarmThreshold(type)
                ])
            } catch (error) {
                this.$toast('异常错误')
            }
        }
    }
}
</script>

<style lang="scss">
.device-alarm {
    min-height: 100vh;
    main {
        padding-top: 56px;
    }
}
</style>

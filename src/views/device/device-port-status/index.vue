<template>
  <div class="device-prot-status">
    <header class="padding-3">
      <div class="d-flex align-items-center">
        <h1 class="d-inline-block margin-right-1 text-success">
          <i class="iconfont icon-diannao text-size-lg"></i> {{ code }}
        </h1>
        <div class="d-inline-block text-333" v-if="result.devicename">
          （{{ result.devicename }}）
        </div>
      </div>
      <div class="text-999 margin-top-2">
        {{ result.hvName || '默认出产设置' }}
        <span v-if="result.areaname"> | {{ result.areaname }} </span>
      </div>
    </header>
    <hd-line />
    <van-tabs v-model="active" ref="top-tab">
      <van-tab title="端口状态">
        <div
          class="padding-x-3 tabContent bg-gray"
          ref="tabContent"
          :style="{ height: maxHeight + 'px' }"
        >
          <div class="padding-top-3">
            <div v-no-data="allPortStatusList.length <= 0"></div>
            <!-- <hd-card class="card rounded padding-2 margin-bottom-3 bg-white" v-for="item in allPortStatusList" :key="item.port">
                            <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                                <template>
                                    <div>
                                        <span class="device-item-title text-333">端口号：</span>
                                        <span class="device-item-content text-666">{{ item.port.padStart(2, '0') }}</span>
                                    </div>

                                    <div v-if="addr">
                                        <van-tag type="danger" v-if="item.portStatus == 2">使用</van-tag>
                                        <van-tag type="success" v-else-if="item.portStatus == 1">空闲</van-tag>
                                        <van-tag color="#969799" v-else-if="item.portStatus == 3">禁用端口</van-tag>
                                        <van-tag color="#969799" v-else-if="item.portStatus == 4">端口故障</van-tag>
                                         <van-tag type="success" v-else-if="item.portStatus == 5">充满，浮充</van-tag>
                                        <van-tag color="#969799" v-else>— —</van-tag>
                                    </div>
                                    <div v-else>
                                        <van-tag type="danger" v-if="item.portStatus == 2">使用</van-tag>
                                        <van-tag type="success" v-else-if="item.portStatus == 1">空闲</van-tag>
                                        <van-tag color="#969799" v-else>故障</van-tag>
                                    </div>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">充电时间：</span>
                                    <span class="device-item-content text-666">{{ item.time }} 分钟</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">充电功率：</span>
                                    <span class="device-item-content text-666">{{ item.power }} W</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">消耗电量：</span>
                                    <span class="device-item-content text-666">{{ item.elec / 100 }} 度</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="" v-if="item.updateTime">
                                <template>
                                    <span class="device-item-title text-333">更新时间：</span>
                                    <span class="device-item-content text-666">{{ item.updateTime | fmtDate }}</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="w-100">
                                <template>
                                    <van-button type="primary" class="padding-x-2 float-right" size="mini" @click="handleUpdateStatus(item)">更新</van-button>
                                    <van-button type="danger" class="padding-x-2 float-right margin-right-2" size="mini" @click="handleRemoteClose(item)">断电</van-button>
                                </template>
                            </hd-card-item>
                        </hd-card> -->
            <div class="post-list" v-if="allPortStatusList.length > 0">
              <van-sticky :offset-top="sticky">
                <van-row
                  class="d-flex post-border-row post-header margin-x-1 text-size-sm font-weight-bold"
                >
                  <van-col
                    :span="3"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    端口
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    状态
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    充电时间
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    充电功率
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    电量
                  </van-col>
                  <van-col
                    :span="5"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    操作
                  </van-col>
                </van-row>
              </van-sticky>
              <div class="padding-bottom-3">
                <van-row
                  class="d-flex post-border-row margin-x-1 text-size-sm text-666"
                  v-for="item in allPortStatusList"
                  :key="item.port"
                >
                  <van-col
                    :span="3"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    {{ String(item.port).padStart(2, '0') }}
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    <div v-if="addr">
                      <van-tag type="danger" v-if="item.portStatus == 2"
                        >使用</van-tag
                      >
                      <van-tag type="success" v-else-if="item.portStatus == 1"
                        >空闲</van-tag
                      >
                      <van-tag color="#969799" v-else-if="item.portStatus == 3"
                        >禁用端口</van-tag
                      >
                      <van-tag color="#969799" v-else-if="item.portStatus == 4"
                        >端口故障</van-tag
                      >
                      <van-tag type="success" v-else-if="item.portStatus == 5"
                        >充满，浮充</van-tag
                      >
                      <van-tag color="#969799" v-else>— —</van-tag>
                    </div>
                    <div v-else>
                      <van-tag type="danger" v-if="item.portStatus == 2"
                        >使用</van-tag
                      >
                      <van-tag type="success" v-else-if="item.portStatus == 1"
                        >空闲</van-tag
                      >
                      <van-tag color="#969799" v-else>故障</van-tag>
                    </div>
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    {{ item.time }} 分钟
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    {{ item.power }} W
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    {{ item.elec / 100 }} 度
                  </van-col>
                  <van-col
                    :span="5"
                    class="post-border-col padding-y-1 padding-x-1 d-flex flex-column align-items-center"
                  >
                    <van-button
                      type="primary"
                      class="padding-x-2 float-right d-block margin-bottom-1"
                      size="mini"
                      @click="handleUpdateStatus(item)"
                      >更新</van-button
                    >
                    <!-- <van-button type="danger" class="padding-x-2 float-right d-block" style="margin-left: 0" size="mini" @click="handleRemoteClose(item)">断电</van-button> -->
                  </van-col>
                </van-row>
                <van-row>
                  <van-col
                    :span="24"
                    class="post-border-col padding-y-1 padding-x-1 d-flex flex-column align-items-center"
                  >
                    <span class="text-size-sm padding-y-1"
                      >更新时间：{{ updateTime ? updateTime : '— —' }}</span
                    >
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="远程控制">
        <div
          class="padding-x-3 tabContent bg-gray"
          :style="{ height: maxHeight + 'px' }"
        >
          <!-- <div class="margin-top-3 border-1 border-ccc rounded">
                        <van-cell-group class="padding-3">
                            <van-field
                                v-model="remoteModel.port"
                                label="选择端口"
                                placeholder="选择端口"
                                readonly
                                right-icon="arrow"
                                @click="showPicker=true"
                            ></van-field>
                            <van-field v-model="remoteModel.time" label="充电时间" placeholder="充电时间">
                                <template #extra>
                                    分钟
                                </template>
                            </van-field>
                            <van-field v-model="remoteModel.elec" label="充电电量" placeholder="充电电量">
                                <template #extra>
                                    度
                                </template>
                            </van-field>
                            <div class="text-center margin-top-2"><van-button type="primary" class="w-50" size="small" @click="handlerRemoteCharge">远程下发充电</van-button></div>
                        </van-cell-group>
                    </div> -->
          <div class="padding-top-3">
            <div class="post-list" v-if="allPortStatusList.length > 0">
              <van-sticky :offset-top="sticky">
                <van-row
                  class="d-flex post-border-row post-header margin-x-1 text-size-sm font-weight-bold"
                >
                  <van-col
                    :span="3"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    端口
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    状态
                  </van-col>
                  <van-col
                    :span="6"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    充电时间
                  </van-col>
                  <van-col
                    :span="5"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    电量
                  </van-col>
                  <van-col
                    :span="6"
                    class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    操作
                  </van-col>
                </van-row>
              </van-sticky>
              <div class="padding-bottom-3">
                <van-row
                  class="d-flex post-border-row margin-x-1 text-size-sm text-666"
                  v-for="item in allPortStatusList"
                  :key="item.port"
                >
                  <van-col
                    :span="3"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    {{ String(item.port).padStart(2, '0') }}
                  </van-col>
                  <van-col
                    :span="4"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    <div v-if="addr">
                      <van-tag type="danger" v-if="item.portStatus == 2"
                        >使用</van-tag
                      >
                      <van-tag type="success" v-else-if="item.portStatus == 1"
                        >空闲</van-tag
                      >
                      <van-tag color="#969799" v-else-if="item.portStatus == 3"
                        >禁用端口</van-tag
                      >
                      <van-tag color="#969799" v-else-if="item.portStatus == 4"
                        >端口故障</van-tag
                      >
                      <van-tag type="success" v-else-if="item.portStatus == 5"
                        >充满，浮充</van-tag
                      >
                      <van-tag color="#969799" v-else>— —</van-tag>
                    </div>
                    <div v-else>
                      <van-tag type="danger" v-if="item.portStatus == 2"
                        >使用</van-tag
                      >
                      <van-tag type="success" v-else-if="item.portStatus == 1"
                        >空闲</van-tag
                      >
                      <van-tag color="#969799" v-else>故障</van-tag>
                    </div>
                  </van-col>
                  <van-col
                    :span="6"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    <input
                      type="number"
                      class="input-form van-field__control border-1 border-ccc flex-1"
                      v-model="item.remoteTime"
                    />
                    <span
                      class="d-inline-block text-right"
                      style="width: 2.5em;"
                      >分钟</span
                    >
                  </van-col>
                  <van-col
                    :span="5"
                    class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                  >
                    <input
                      type="text"
                      class="input-form van-field__control border-1 border-ccc flex-1"
                      v-model="item.remoteElec"
                    />
                    <span
                      class="d-inline-block text-right"
                      style="width: 1.3em;"
                      >度</span
                    >
                  </van-col>
                  <van-col
                    :span="6"
                    class="bottom-post post-border-col padding-y-1 padding-x-1 d-flex justify-content-center align-items-center"
                  >
                    <van-button
                      type="primary"
                      class="padding-x-2 float-right margin-right-1"
                      size="mini"
                      @click="handlerRemoteCharge(item)"
                      >充电</van-button
                    >
                    <van-button
                      type="danger"
                      class="padding-x-2 float-right"
                      style="margin-left: 0"
                      size="mini"
                      @click="handleRemoteClose(item)"
                      >断电</van-button
                    >
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <!-- <van-tab title="报警状态">
                <div class="padding-x-3 tabContent bg-gray" ref="tabContent" :style="{height: maxHeight+'px'}">
                    <hd-card class="card rounded padding-2 margin-top-3 bg-white">
                        <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                            <template>
                                <div>
                                    <span class="device-item-title text-333">当前温度</span>
                                </div>
                                <div>
                                    <van-button
                                        type="primary"
                                        class="padding-x-2 float-right margin-right-2"
                                        size="mini"
                                        @click="handleUpdateDevice(1)"
                                    >更新</van-button>
                                </div>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="" >
                            <template>
                                <span class="device-item-title text-333">温度：</span>
                                <span class="device-item-content text-666">℃</span>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="w-100" >
                            <template>
                                <span class="device-item-title text-333">更新时间：</span>
                                <span class="device-item-content text-666"></span>
                            </template>
                        </hd-card-item>
                    </hd-card>

                    <hd-card class="card rounded padding-2 margin-top-3 bg-white">
                        <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                            <template>
                                <div>
                                    <span class="device-item-title text-333">当前烟感</span>
                                </div>
                                <div>
                                    <van-button
                                        type="primary"
                                        class="padding-x-2 float-right margin-right-2"
                                        size="mini"
                                        @click="handleUpdateDevice(2)"
                                    >更新</van-button>
                                </div>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="" >
                            <template>
                                <span class="device-item-title text-333">烟感：</span>
                                <span class="device-item-content text-666"></span>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="w-100" >
                            <template>
                                <span class="device-item-title text-333">更新时间：</span>
                                <span class="device-item-content text-666"></span>
                            </template>
                        </hd-card-item>
                    </hd-card>

                    <hd-card class="card rounded padding-2 margin-top-3 bg-white">
                        <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                            <template>
                                <div>
                                    <span class="device-item-title text-333">当前总功率</span>
                                </div>
                                <div>
                                    <van-button
                                        type="primary"
                                        class="padding-x-2 float-right margin-right-2"
                                        size="mini"
                                        @click="handleUpdateDevice(3)"
                                    >更新</van-button>
                                </div>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="" >
                            <template>
                                <span class="device-item-title text-333">总功率：</span>
                                <span class="device-item-content text-666">W</span>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="w-100" >
                            <template>
                                <span class="device-item-title text-333">更新时间：</span>
                                <span class="device-item-content text-666"></span>
                            </template>
                        </hd-card-item>
                    </hd-card>
                </div>
            </van-tab> -->
    </van-tabs>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        title="选择远程充电的端口"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
// import hdCard from '@/components/hd-card'
// import hdCardItem from '@/components/hd-card-item'
import { mapState } from 'vuex'
import { getDeviceVersionName, getInfoByHdVersion, fmtDate } from '@/utils/util'
import {
  inquireDeviceStatus,
  querystate,
  queryPortStatus,
  stopRechargeByPort,
  stopCharge,
  testpaytoport,
  startCharge,
  getDeviceNowArgument
} from '@/require/device'
export default {
  // components: {
  //     hdCard,
  //     hdCardItem
  // },
  data() {
    return {
      code: this.$route.params.code, // 设备号
      addr: this.$route.query.addr, // 从机地址
      active: '端口状态',
      maxHeight: 500,
      remoteModel: {
        port: 1,
        time: 240,
        elec: 1
      },
      showPicker: false,
      columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      allPortStatusList: [],
      result: {},
      updateTime: null,
      sticky: '3.78625rem'
    }
  },
  computed: {
    ...mapState(['global'])
  },
  watch: {
    // 监听高度的变化
    'global.clientHeight': {
      handler(value) {
        this.getMaxHeight()
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
    this.sticky =
      this.$refs['top-tab'].$el
        .querySelector('.van-tabs__wrap')
        .getBoundingClientRect().bottom + 'px'
  },
  methods: {
    async init() {
      try {
        const {
          code,
          message,
          allPortStatusList,
          ...result
        } = await inquireDeviceStatus({ code: this.code, addr: this.addr })
        if (code === 200) {
          this.allPortStatusList = allPortStatusList.map(item => ({
            ...item,
            remoteTime: 240,
            remoteElec: 1
          }))
          this.result = {
            ...result,
            hvName: getDeviceVersionName(result.deviceversion)
          }
          this.columns = new Array(
            getInfoByHdVersion(result.deviceversion).portNum
          )
            .fill(1)
            .map((item, index) => index + 1)
          this.updateTime = result.updateTime
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      }
    },
    // 更新端口状态 querystate, queryPortStatus
    handleUpdateStatus(item) {
      const index = this.allPortStatusList.findIndex(
        one => one.port === item.port
      )
      if (this.addr) {
        // 从机
        queryPortStatus({
          code: this.code,
          port: item.port,
          addr: this.addr
        }).then(res => {
          if (
            res.wolfcode === '1000' ||
            Number(res.code) === 200 ||
            res.returncode === 200
          ) {
            this.$toast('更新成功')
            this.allPortStatusList.splice(
              index,
              1,
              Object.assign({}, this.allPortStatusList[index], res.result)
            )
            this.updateTime = res.result.updateTime
          } else {
            this.$toast(res.message || res.wolfmsg)
          }
        })
      } else {
        // 设备
        querystate({ code: this.code, port: item.port }).then(res => {
          if (
            res.wolfcode === '1000' ||
            Number(res.code) === 200 ||
            res.returncode === 200
          ) {
            this.$toast('更新成功')
            this.allPortStatusList.splice(
              index,
              1,
              Object.assign({}, this.allPortStatusList[index], {
                port: item.port,
                ...res.data
              })
            )
            this.updateTime = fmtDate(
              new Date(Number(res.data.updateTime)),
              'YYYY-MM-DD HH:mm:ss'
            )
          } else {
            this.$toast(res.message)
          }
        })
      }
    },
    // 远程充电
    handlerRemoteCharge({ port, remoteTime: time, remoteElec: elec }) {
      if (this.addr) {
        // 从机
        startCharge({
          code: this.code,
          addr: this.addr,
          port,
          time,
          elec,
          money: 1
        })
          .then(res => {
            if (
              res.wolfcode === '1000' ||
              Number(res.code) === 200 ||
              res.returncode === 200
            ) {
              this.$dialog
                .alert({
                  title: '提示',
                  message: `${port}号端口，远程充电成功`
                })
                .then(() => {
                  this.handleUpdateStatus({ port })
                })
            } else {
              this.$toast(res.message || res.wolfmsg)
            }
          })
          .catch(() => {
            this.$toast('异常错误')
          })
      } else {
        // 设备
        testpaytoport({
          code: this.code,
          payport: port,
          time,
          elec
        })
          .then(res => {
            if (
              res.wolfcode === '1000' ||
              Number(res.code) === 200 ||
              res.returncode === 200
            ) {
              this.$dialog
                .alert({
                  title: '提示',
                  message: `${port}号端口，远程充电成功`
                })
                .then(() => {
                  this.handleUpdateStatus({ port })
                })
            } else {
              this.$toast(res.message || res.wolfmsg)
            }
          })
          .catch(() => {
            this.$toast('异常错误')
          })
      }
    },
    // 远程断电
    handleRemoteClose(item) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认远程断电吗？'
        })
        .then(() => {
          if (this.addr) {
            // 从机远程断电
            stopCharge({
              code: this.code,
              addr: this.addr,
              port: item.port
            })
              .then(res => {
                if (
                  res.wolfcode === '1000' ||
                  Number(res.code) === 200 ||
                  res.returncode === 200
                ) {
                  this.$toast(`${item.port}号端口，断电成功！`)
                  setTimeout(() => {
                    this.handleUpdateStatus(item) // 更新端口状态
                  }, 2000)
                } else {
                  this.$toast(res.message || res.wolfmsg)
                }
              })
              .catch(() => {
                this.$toast('异常错误')
              })
          } else {
            // 设备远程断电
            stopRechargeByPort({
              code: this.code,
              port: item.port
            })
              .then(res => {
                if (
                  res.wolfcode === '1000' ||
                  Number(res.code) === 200 ||
                  res.returncode === 200
                ) {
                  this.$toast(`${item.port}号端口，断电成功！`)
                  setTimeout(() => {
                    this.handleUpdateStatus(item) // 更新端口状态
                  }, 2000)
                } else {
                  this.$toast(res.message || res.wolfmsg)
                }
              })
              .catch(() => {
                this.$toast('异常错误')
              })
          }
        })
    },
    // 更新 温度1 烟感2 总功率3
    handleUpdateDevice(type) {
      getDeviceNowArgument({
        code: this.code,
        type
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMaxHeight() {
      this.$nextTick(() => {
        const top = this.$refs.tabContent.getBoundingClientRect().top
        this.maxHeight = this.global.clientHeight - top
      })
    },
    onConfirm(port) {
      this.remoteModel.port = port
      this.showPicker = false
    }
  }
}
</script>
<style lang="scss" scoped>
.device-prot-status {
  h1 {
    font-size: 19px;
  }
  .card {
    border: 1px solid #ccc;
    .card-title {
      border-bottom: 1px dotted #ccc;
    }
  }
  .tabContent {
    overflow: auto;
  }
  .post-list {
    margin: 0 -15px;
    .post-border-row {
      &.post-header {
        background-color: #c8efd4;
      }
      border: 1px solid #add9c0;
      .post-border-col {
        border-right: 1px solid #add9c0;
      }
    }
    .bottom-style {
      padding: 0 !important;
      height: 45px !important;
      line-height: 1.8;
    }
  }
  .input-form {
    padding: 4px;
    border-radius: 3px;
  }
  .bottom-post {
    &::v-deep button {
      padding: 3px 0;
      width: 4em;
    }
  }
}
</style>

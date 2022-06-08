<template>
  <div class="device-addr d-flex flex-column">
    <header class="position-relative">
      <van-nav-bar
        :title="`${code}主机`"
        left-text="返回"
        right-text="按钮"
        left-arrow
        class="shadow"
        @click-left="$router.go(-1)"
      >
        <template #right>
          <div
            class="d-flex justify-content-end align-items-center"
            style="margin-right: -0.5rem"
            @click.prevent
          >
            <div
              class="contral-item text-size-sm padding-x-2 d-flex flex-column justify-content-center"
              @click="addAddr"
            >
              <van-icon name="plus" size=".5rem" />
              <div class="text-999">添加</div>
            </div>
            <div
              class="contral-item text-size-sm padding-x-2 d-flex flex-column justify-content-center"
              @click="reload"
            >
              <van-icon name="replay" size=".5rem" />
              <div class="text-999">更新</div>
            </div>
            <div
              class="contral-item text-size-sm padding-x-2 d-flex flex-column justify-content-center"
              @click="isShowSearch = true"
            >
              <van-icon name="search" size=".5rem" />
              <div class="text-999">搜索</div>
            </div>
          </div>
        </template>
      </van-nav-bar>
      <div
        class="position-absolute search-box w-100 h-100 bg-white d-flex align-items-center"
        :class="{ active: isShowSearch }"
      >
        <van-search
          v-model="keywords"
          show-action
          placeholder="请输入从机号进行搜索"
          class="flex-1"
          @cancel="isShowSearch = false"
        />
      </div>
    </header>
    <main class="flex-1 bg-gray ">
      <div class="padding-top-2" v-no-data:[nodata]="list.length <= 0">
        <!-- <ul>
          <li class="margin-bottom-3" v-for="item in list" :key="item">
            <div class="d-flex bg-white padding-y-2 shadow rounded">
              <div class="left d-flex align-items-center padding-2">
                <i class="iconfont icon-diannao text-success addr-icon"></i>
              </div>
              <div
                class="right flex-1 d-flex flex-column justify-content-between padding-right-2"
              >
                <div class="text-size-default">{{ item }}</div>
                <div class="d-flex justify-content-end">
                  <van-button type="danger" size="mini" @click="unbind(item)"
                    >解绑</van-button
                  >
                  <van-button
                    type="primary"
                    size="mini"
                    :to="`/remote/charge/${code}?addr=${item}`"
                    >远程</van-button
                  >
                  <van-button
                    type="primary"
                    size="mini"
                    :to="`/device/portstatus/${code}?addr=${item}`"
                    >状态</van-button
                  >
                  <van-button
                    type="primary"
                    size="mini"
                    @click="showQrcode(item)"
                    >二维码</van-button
                  >
                </div>
              </div>
            </div>
          </li>
        </ul> -->
        <van-tabs animated>
          <van-tab title="端口状态">
            <div
              ref="tabContent"
              class="tabContent overflow-auto padding-top-2"
              :style="{ height: maxHeight + 'px' }"
            >
              <div
                class="addr-item bg-white shadow"
                v-for="(item, index) in list"
                :key="item.addr"
                :class="{ 'margin-bottom-2': index !== list.length - 1 }"
              >
                <div
                  class="d-flex align-items-center justify-content-between margin-bottom-1 padding-x-2 padding-top-1"
                >
                  <h3 class="">{{ item.addr }}</h3>
                  <div class="d-flex justify-content-end">
                    <van-button
                      type="danger"
                      size="mini"
                      class="margin-right-1"
                      @click="unbind(item.addr)"
                      >解绑</van-button
                    >
                    <!-- <van-button
                type="primary"
                size="mini"
                class="margin-right-1"
                :to="`/remote/charge/${code}?addr=${item}`"
                >远程</van-button
              > -->
                    <van-button
                      type="primary"
                      size="mini"
                      class="margin-right-1"
                      @click="showQrcode(item.addr)"
                      >二维码</van-button
                    >
                  </div>
                </div>
                <div
                  class="post-list w-100 padding-bottom-2"
                  v-if="
                    item.allPortStatusList && item.allPortStatusList.length > 0
                  "
                >
                  <van-row
                    class="d-flex post-border-row post-header text-size-sm font-weight-bold margin-x-1"
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
                  <div>
                    <van-row
                      class="d-flex post-border-row text-size-sm text-666 margin-x-1"
                      v-for="one in item.allPortStatusList"
                      :key="one.port"
                    >
                      <van-col
                        :span="3"
                        class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                      >
                        {{ String(one.port).padStart(2, '0') }}
                      </van-col>
                      <van-col
                        :span="4"
                        class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                      >
                        <div>
                          <van-tag type="danger" v-if="one.portStatus == 2"
                            >使用</van-tag
                          >
                          <van-tag
                            type="success"
                            v-else-if="one.portStatus == 1"
                            >空闲</van-tag
                          >
                          <van-tag
                            color="#969799"
                            v-else-if="one.portStatus == 3"
                            >禁用</van-tag
                          >
                          <van-tag
                            color="#969799"
                            v-else-if="one.portStatus == 4"
                            >故障</van-tag
                          >
                          <van-tag
                            type="success"
                            v-else-if="one.portStatus == 5"
                            >充满，浮充</van-tag
                          >
                          <van-tag color="#969799" v-else>— —</van-tag>
                        </div>
                      </van-col>
                      <van-col
                        :span="4"
                        class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                      >
                        {{ one.time }} 分钟
                      </van-col>
                      <van-col
                        :span="4"
                        class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                      >
                        {{ one.power }} W
                      </van-col>
                      <van-col
                        :span="4"
                        class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                      >
                        {{ one.elec / 100 }} 度
                      </van-col>
                      <van-col
                        :span="5"
                        class="post-border-col padding-y-1 padding-x-1 d-flex flex-column align-items-center"
                      >
                        <van-button
                          type="primary"
                          class="padding-x-2 float-right d-block margin-bottom-1"
                          size="mini"
                          @click="
                            updatePortStatus({
                              code,
                              addr: item.addr,
                              port: one.port
                            })
                          "
                          >更新</van-button
                        >
                        <!-- <van-button type="danger" class="padding-x-2 float-right d-block" style="margin-left: 0" size="mini" @click="handleRemoteClose(item)">断电</van-button> -->
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col
                        :span="24"
                        class="post-border-col padding-top-1 padding-x-1 d-flex flex-column align-items-center  margin-x-1"
                      >
                        <span class="text-size-sm padding-y-1"
                          >更新时间： {{ item.updateTime }}</span
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
              :style="{ height: maxHeight + 'px' }"
              class="tabContent overflow-auto padding-top-2"
            >
              <div
                class="addr-item bg-white shadow"
                v-for="(item, index) in list"
                :key="item.addr"
                :class="{ 'margin-bottom-2': index !== list.length - 1 }"
              >
                <div
                  class="d-flex align-items-center justify-content-between margin-bottom-1 padding-x-2 padding-top-1"
                >
                  <h3 class="">{{ item.addr }}</h3>
                  <div class="d-flex justify-content-end">
                    <van-button
                      type="danger"
                      size="mini"
                      class="margin-right-1"
                      @click="unbind(item.addr)"
                      >解绑</van-button
                    >
                    <!-- <van-button
                type="primary"
                size="mini"
                class="margin-right-1"
                :to="`/remote/charge/${code}?addr=${item}`"
                >远程</van-button
              > -->
                    <van-button
                      type="primary"
                      size="mini"
                      class="margin-right-1"
                      @click="showQrcode(item.addr)"
                      >二维码</van-button
                    >
                  </div>
                </div>
                <div
                  class="post-list w-100 padding-bottom-2"
                  v-if="
                    item.allPortStatusList && item.allPortStatusList.length > 0
                  "
                >
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
                  <van-row
                    class="d-flex post-border-row margin-x-1 text-size-sm text-666"
                    v-for="one in item.allPortStatusList"
                    :key="one.port"
                  >
                    <van-col
                      :span="3"
                      class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                    >
                      {{ String(one.port).padStart(2, '0') }}
                    </van-col>
                    <van-col
                      :span="4"
                      class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                    >
                      <div>
                        <van-tag type="danger" v-if="one.portStatus == 2"
                          >使用</van-tag
                        >
                        <van-tag type="success" v-else-if="one.portStatus == 1"
                          >空闲</van-tag
                        >
                        <van-tag color="#969799" v-else-if="one.portStatus == 3"
                          >禁用</van-tag
                        >
                        <van-tag color="#969799" v-else-if="one.portStatus == 4"
                          >故障</van-tag
                        >
                        <van-tag type="success" v-else-if="one.portStatus == 5"
                          >充满，浮充</van-tag
                        >
                        <van-tag color="#969799" v-else>— —</van-tag>
                      </div>
                    </van-col>
                    <van-col
                      :span="6"
                      class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center"
                    >
                      <input
                        type="number"
                        class="input-form van-field__control border-1 border-ccc flex-1"
                        v-model="one.remoteTime"
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
                        v-model="one.remoteElec"
                      />
                      <span
                        class="d-inline-block text-right"
                        style="width: 1.3em;"
                        >度</span
                      >
                    </van-col>
                    <van-col
                      :span="6"
                      class="bottom-post post-border-col padding-y-1 padding-x-1"
                    >
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <van-button
                          type="primary"
                          class="float-right margin-right-1 flex-1"
                          size="mini"
                          @click="
                            remoteCharge({
                              code,
                              addr: item.addr,
                              port: one.port,
                              time: one.remoteTime,
                              elec: one.remoteElec
                            })
                          "
                          >充电</van-button
                        >
                        <van-button
                          type="danger"
                          class="float-right flex-1"
                          style="margin-left: 0"
                          size="mini"
                          @click="
                            remoteEndCharge({
                              code,
                              addr: item.addr,
                              port: one.port
                            })
                          "
                          >断电</van-button
                        >
                      </div>
                      <div
                        class="d-flex justify-content-center align-items-center margin-top-1"
                      >
                        <van-button
                          type="info"
                          class="float-right margin-right-1 flex-1"
                          size="mini"
                          @click="
                            lockOrUnlockPortStatus({
                              code,
                              addr: item.addr,
                              port: one.port,
                              status: 1
                            })
                          "
                          >解锁</van-button
                        >
                        <van-button
                          type="warning"
                          class="float-right flex-1"
                          style="margin-left: 0"
                          size="mini"
                          @click="
                            lockOrUnlockPortStatus({
                              code,
                              addr: item.addr,
                              port: one.port,
                              status: 0
                            })
                          "
                          >锁定</van-button
                        >
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </main>
    <!-- 从机二维码 -->
    <hd-overlay :show="qrIsShow" title="从机二维码" @close="hideQrcode">
      <div>
        <hd-qrcode
          v-if="qrIsShow"
          :qrcode="qrcode"
          :style="{ width: `${global.clientWidth * 0.6}px` }"
        />
        <p class="text-center text-size-sm text-666">长按识别或保存二维码</p>
      </div>
    </hd-overlay>
    <!-- 从机二维码 -->
    <!-- 绑定状态 -->
    <hd-overlay
      :show="bindErrorInfo.error"
      title="绑定失败"
      @close="closeError"
    >
      <template v-if="bindErrorInfo.code === 202">
        <div class="text-center text-size-md margin-bottom-2 text-danger">
          {{bindErrorInfo.addr}} {{bindErrorInfo.message}}
        </div>
        <ul class="repeat-box bg-gray rounded padding-2 text-size-sm text-right">
          <li
            class="margin-bottom-1 d-flex align-items-center margin-bottom-3"
          >
            <p class="flex-1 text-center text-left">已绑定设备：</p>
            <p class="flex-1 text-center">{{ bindErrorInfo.equipmentCode }}</p>
          </li>
          <li
            class="margin-bottom-1 d-flex align-items-center margin-bottom-3"
          >
            <p class="flex-1 text-center text-left">绑定人ID：</p>
            <p class="flex-1 text-center">{{ bindErrorInfo.bindId | fmtFill(8) }}</p>
          </li>
          <li
            class="margin-bottom-1 d-flex align-items-center margin-bottom-3"
          >
            <p class="flex-1 text-center text-left">绑定人昵称：</p>
            <p class="flex-1 text-center">{{ bindErrorInfo.bindName }}</p>
          </li>
          <li
            class="margin-bottom-1 d-flex align-items-center margin-bottom-3"
          >
            <p class="flex-1 text-center text-left">绑定人电话：</p>
            <p class="flex-1 text-center">{{ bindErrorInfo.bindPhone }}</p>
          </li>
        </ul>
      </template>

      <template v-else>
        <div class="text-center text-size-sm margin-bottom-2">
          {{bindErrorInfo.message}}
        </div>
      </template>
      <svg-icon icon="undraw_warning_re_eoyh" class="undraw-error" />
    </hd-overlay>
  </div>
</template>

<script>
import { toRefs } from '@vue/composition-api'
import {
  useSearchook,
  useAddrList,
  useQrcode,
  useAddAddr,
  filterList,
  unbindAddr,
  usePortStatus
} from './helper'
import HdQrcode from '@/components/hd-qrcode'
import HdOverlay from '@/components/hd-overlay'
// import HdCard from '@/components/hd-card'
// import HdCardItem from '@/components/hd-card-item'
import { mapState } from 'vuex'
export default {
  components: {
    HdQrcode,
    HdOverlay
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
  data() {
    return {
      maxHeight: 500
    }
  },
  methods: {
    getMaxHeight() {
      this.$nextTick(() => {
        const top = this.$refs.tabContent.getBoundingClientRect().top
        let fz = Number.parseFloat(
          document.querySelector('html').style.fontSize
        )
        fz = Number.isNaN(fz) ? 1 : fz
        this.maxHeight = this.global.clientHeight - top - (10 * fz) / 37.5
      })
    }
  },
  setup(props, context) {
    const code = context.root.$route.params.code
    const { keywords, isShowSearch } = useSearchook()
    const [initList, reload] = useAddrList(code)
    const { qrWrapper, showQrcode, hideQrcode } = useQrcode(context, code)
    const { addAddr, bindErrorInfo, closeError } = useAddAddr(context, code, reload)
    const {
      updatePortStatus,
      remoteCharge,
      remoteEndCharge,
      lockOrUnlockPortStatus
    } = usePortStatus(initList)
    const list = filterList(keywords, initList)
    const unbind = addr => {
      unbindAddr(context, code, addr, reload)
    }
    return {
      list,
      keywords,
      isShowSearch,
      code, // 设备号
      ...toRefs(qrWrapper),
      showQrcode,
      hideQrcode,
      addAddr,
      bindErrorInfo,
      closeError,
      unbind,
      reload,
      nodata: {
        description: '暂无从机地址'
      },
      updatePortStatus,
      remoteCharge,
      remoteEndCharge,
      lockOrUnlockPortStatus
    }
  }
}
</script>

<style lang="scss">
.device-addr {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .van-nav-bar__left:active,
  .van-nav-bar__right:active {
    opacity: 1;
  }
  .contral-item {
    &:active {
      opacity: 0.7;
    }
  }
  .search-box {
    top: 0;
    left: 0;
    z-index: 2;
    transform: translateX(100%);
    transition: transform 0.4s ease-in-out;
    .van-search {
      padding: 0 0.32rem;
    }
    &.active {
      transform: translateX(0);
    }
  }
  main {
    overflow: auto;
    .addr-icon {
      font-size: 36px;
    }
    .tabContent {
      box-sizing: border-box;
      width: 100%;
      overflow-x: hidden;
    }
  }
  #qr_box {
    position: absolute;
    z-index: -1;
  }

  .post-list {
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
  .undraw-error {
    font-size: 115px;
    display: block;
    margin: 10px auto 0;
  }
}
</style>

<template>
  <div class="device-template-list">
    <header class="d-inline-block w-100" ref="header">
      <div class="mask" ref="mask"></div>
      <div class="desc text-white text-center text-size-default">
        {{ hardversion }}-{{ versionName }}
      </div>
    </header>
    <main class="position-relative">
      <div class="post-top overflow-hidden shadow padding-3 bg-white">
        <div class="clearfix">
          <div
            class="w-50 float-left border-box d-flex justify-content-center flex-column align-items-center border-right-1 border-ccc padding-x-2"
          >
            <div class="text-size-default font-weight-bold">设备编号</div>
            <div class="margin-top-3 text-666 w-100 text-truncate text-center">
              {{ code }}
            </div>
          </div>
          <div
            class="w-50 float-left border-box d-flex justify-content-center flex-column align-items-center padding-x-2"
          >
            <div class="text-size-default font-weight-bold">所属小区</div>
            <div class="margin-top-3 text-666 w-100 text-truncate text-center">
              {{ areaname || '— —' }}
            </div>
          </div>
        </div>
      </div>
      <div class="post-content">
        <div
          class="template-item shadow rounded padding-3 position-relative"
          v-for="item in templatelist"
          :key="item.id"
        >
          <div>
            <span class="font-weight-bold">模板名称：</span>
            {{ item.tempname }}
            <span class="text-p text-size-sm" v-if="item.merid === 0"
              >（系统模板）</span
            >
          </div>
          <div class="contral d-flex justify-content-end margin-top-3">
            <van-button
              type="danger"
              size="mini"
              class="margin-right-1 padding-x-2"
              v-if="item.merid !== 0"
              @click="deleteTemp(item)"
              >删除</van-button
            >
            <van-button
              type="info"
              size="mini"
              class="margin-right-1 padding-x-2"
              @click="preview(item)"
              >预览</van-button
            >
            <van-button
              type="info"
              size="mini"
              class="margin-right-1 padding-x-2"
              @click="repeatUseTemp(item)"
              >复用</van-button
            >
            <van-button
              :type="item.merid === 0 ? 'warning' : 'primary'"
              size="mini"
              class="padding-x-2"
              @click="editTemp(item)"
            >
              {{ item.merid === 0 ? '查看' : '编辑' }}
            </van-button>
          </div>
          <div
            class="select-box position-absolute"
            :class="{ active: item.pitchon === 1 }"
            @click="handleSelectTemp(item)"
          >
            <van-icon
              name="success"
              class="select-icon position-absolute text-white"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- 复用模板到其他设备 -->
    <!-- <hd-select
        :list="list"
        :isShow="repeatIsShow"
        :title="repeatTitle"
        keyString="code"
        @confirm="handleRepeatSubmit"
        @cancel="repeatIsShow = false"
    >
        <template #title>
            <div class="flex-1 text-center">设备号</div>
            <div class="flex-1 text-center">
                <van-popover
                    v-model="showPopover"
                    trigger="click"
                    :actions="actions"
                    @select="onSelect"
                >
                <template #reference>
                    <span>所属小区</span>
                </template>
                </van-popover>
            </div>
        </template>
        <template v-slot="{row}">
            <div class="flex-1 text-center">{{row.code}}</div>
            <div class="flex-1 text-center">{{row.areaname}}</div>
        </template>
    </hd-select> -->
    <!-- 底部：新增充电模板部分 -->
    <hd-nav :list="navList">
      <template v-slot="{ row }">
        <van-button
          type="primary"
          size="small"
          class="padding-x-4"
          icon="plus"
          :to="row.to"
          >{{ row.text }}</van-button
        >
      </template>
    </hd-nav>

    <hd-select-filter
      :list="list"
      :repeatIsShow="repeatIsShow"
      :repeatTitle="repeatTitle"
      @submit="handleRepeatSubmit"
      @close="closeRepeatIsShow"
    />
  </div>
</template>

<script>
// import hdSelect from '@/components/hd-select'
import hdSelectFilter from '@/components/hd-select-filter'
import hdNav from '@/components/hd-nav'
import {
  inquireDeviceTemlataData,
  updateDeviceTemplate,
  updateSingleDeviceTemplate,
  deleteTemlataById
} from '@/require/template'
import { inquireTheSameDeviceData } from '@/require/device'
import { getDeviceVersionName, getVersion } from '@/utils/util'
export default {
  data() {
    return {
      code: this.$route.params.code,
      list: [
        // { code: '000130', areaname: '回忆小区', aid: 1 },
        // { code: '000132', areaname: '回忆小区', aid: 1, selected: true, disabled: true },
        // { code: '000133', areaname: null, aid: 0 },
        // { code: '000134', areaname: '明港路花园565456487812', aid: 2 }
      ],
      repeatIsShow: false, // 复用模板是否显示
      repeatTitle: '',
      navList: [{ text: '新增充电模板' /* to: '/template/addv3/08' */ }],
      templatelist: [],
      hardversion: '', // 硬件版本号
      areaname: '',
      selectRow: {} // 选择的模板容器
    }
  },
  components: {
    // hdSelect,
    hdNav,
    hdSelectFilter
  },
  computed: {
    versionName() {
      return getDeviceVersionName(this.hardversion) || ''
    }
  },
  mounted() {
    this.getInitData()
  },
  activated() {
    this.scrollAnimate()
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.scrollHandler)
    next()
  },
  methods: {
    async getInitData() {
      const {
        code,
        message,
        templatelist,
        hardversion,
        areaname
      } = await inquireDeviceTemlataData({
        code: this.code,
        tenantId: this.tenantId
      })
      if (code === 200) {
        this.templatelist = templatelist
        this.hardversion = hardversion
        this.areaname = areaname
        const name = getVersion(hardversion)
        this.$set(
          this.navList[0],
          'to',
          name.includes('v3')
            ? `/template/addv3/${hardversion}?code=${this.code}`
            : `/template/add${name}/${hardversion}?code=${this.code}`
        )
      } else {
        this.toast(message)
      }
    },
    repeatUseTemp(row) {
      this.selectRow = row
      this.repeatTitle = `选中设备使用<span class="text-success">${row.tempname}</span>模板`
      this.getDeviceList(row)
    },
    closeRepeatIsShow() {
      this.repeatIsShow = false
    },
    async getDeviceList({ id: tempid }) {
      try {
        const {
          code,
          message,
          resultDataList
        } = await inquireTheSameDeviceData({ code: this.code, tempid })
        if (code === 200) {
          this.list = resultDataList.map(({ code, areaname, pitchon }) => {
            return {
              code,
              areaname: areaname || '— —',
              selected: pitchon === 1
            }
          })
          this.repeatIsShow = true
        } else {
          this.toast(message)
        }
      } catch (error) {
        this.toast('异常错误')
      }
    },
    async handleRepeatSubmit(result = []) {
      try {
        const selectId = this.selectRow.id
        const { code, message } = await updateDeviceTemplate({
          tempid: selectId,
          deviceList: JSON.stringify(result)
        })
        if (code === 200) {
          if (result.includes(this.code)) {
            this.selected({ id: selectId })
          }
          this.toast('复用成功')
        } else {
          this.toast(message)
        }
      } catch (error) {
        this.toast('异常错误')
      }
      this.repeatIsShow = false
    },
    async handleSelectTemp({ id }) {
      try {
        const { code, message } = await updateSingleDeviceTemplate({
          tempid: id,
          code: this.code
        })
        if (code === 200) {
          this.selected({ id })
          this.toast('选中成功')
        } else {
          this.toast(message)
        }
      } catch (error) {
        this.toast('异常错误')
      }
    },
    scrollAnimate() {
      window.addEventListener('scroll', this.scrollHandler)
    },
    // 删除模板
    deleteTemp({ id, pitchon }) {
      this.confirm('确认删除当前模板吗？', '提示', async (action, done) => {
        if (action !== 'confirm') return done()
        try {
          const { code, message } = await deleteTemlataById({ id })
          if (code === 200) {
            const deleteIsSelected = pitchon === 1
            this.templatelist = this.templatelist
              .filter(item => item.id !== id)
              .map(item => {
                if (deleteIsSelected) {
                  if (item.merid === 0) {
                    item.pitchon = 1
                  }
                }
                return item
              })
            this.toast('模板删除成功')
          } else {
            this.toast(message)
          }
        } catch (error) {
          this.toast('异常错误')
        } finally {
          done()
        }
      })
    },
    selected({ id }) {
      for (const one of this.templatelist) {
        if (one.id === id) {
          this.$set(one, 'pitchon', 1)
        } else {
          delete one.pitchon
        }
      }
    },
    editTemp({ id }) {
      let path = ''
      switch (getVersion(this.hardversion)) {
        case 'v2':
          path = `/template/v2/${id}`
          break
        case 'v2-car':
          path = `/template/car/${id}`
          break
        case 'pulse':
          path = `/template/pulse/${id}`
          break // 脉冲
        case 'offline':
          path = `/template/offline/${id}`
          break // 离线
        case 'v3':
          path = `/template/v3/${id}`
          break
        case 'v3-addr':
          path = `/template/v3/${id}`
          break
      }
      this.$router.push({ path, query: { code: this.code } })
    },
    preview({ id }) {
      let path = ''
      switch (getVersion(this.hardversion)) {
        case 'v2':
          path = '/preview/v2'
          break
        case 'v2-car':
          path = '/preview/v2'
          break
        case 'pulse':
          path = '/preview/pulse'
          break // 脉冲
        case 'offline':
          path = '/preview/offline'
          break // 离线
        case 'v3':
          path = '/preview/v3'
          break
        case 'v3-addr':
          path = '/preview/v3'
          break
      }
      this.$router.push({ path, query: { code: this.code, tempid: id } })
    },
    scrollHandler() {
      try {
        const html = document.documentElement || document.querySelector('html')
        const height = this.$refs.header.offsetHeight
        const mask = this.$refs.mask
        const rate = Math.min(html.scrollTop / height, 1)
        const opacity = rate * 0.5
        mask.style.background = `rgba(0, 0, 0, ${opacity})`
      } catch (error) {
        console.log('捕获异常', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.device-template-list {
  header {
    height: 180px;
    position: relative;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: url(../../../assets/images/post_2.png);
      background-size: 100% 100%;
      filter: blur(8px);
      /* z-index: -2; */
      z-index: 0;
      position: relative;
    }
    .mask {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      background-size: 100% 100%;
      filter: blur(10px);
      z-index: 1;
      position: absolute;
    }
    .desc {
      margin-top: 70px;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      text-shadow: 5px 5px 6px #000;
    }
  }
  main {
    margin-top: -40px;
    padding-bottom: 60px;
    .post-top {
      // height: 100px;
      /* background: #fff; */
      width: 90%;
      margin: 0 auto;
      border-radius: 10px 10px 0 0;
      box-sizing: border-box;
    }
    .template-item {
      width: 90%;
      margin: 15px auto;
      box-sizing: border-box;
      .contral {
        [class~='van-button'] {
          padding: 0 10px;
        }
      }
      .select-box {
        border-top: 18px solid #ddd;
        border-right: 18px solid #ddd;
        border-bottom: 18px solid transparent;
        border-left: 18px solid transparent;
        width: 0;
        height: 0;
        right: 0;
        top: 0;
        transition: all 0.4s ease;
        .select-icon {
          top: -15px;
          right: -15px;
          font-size: 16px;
          /* color: #fff; */
        }
        &.active {
          border-top-color: #28a745;
          border-right-color: #28a745;
        }
      }
    }
  }
}
</style>

<style lang="scss">
[theme='dark'] {
  .device-template-list {
    .select-box {
      border-top-color: #222 !important;
      border-right-color: #222 !important;
      &.active {
        border-top-color: #28a745 !important;
        border-right-color: #28a745 !important;
      }
    }
  }
}
</style>

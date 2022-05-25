<template>
  <div class="bind-result bg-gray">
    <hd-result
      :type="bindResultMap.code === 200 ? 'success' : 'warning'"
      :title="bindResultMap.code === 200 ? '绑定成功' : '绑定失败'"
      :desc="desc"
    />
    <!-- 绑定成功完善信息 -->
    <van-form
      @submit="onSubmit"
      class="margin-top-2"
      v-if="bindResultMap.code === 200"
    >
      <div class="bg-white padding-x-3 padding-y-2 text-size-sm text-p">
        完善设备信息
      </div>
      <van-field name="设备名称" label="设备名称" placeholder="设备名称">
        <template #input>
          <input
            class="van-field__control flex-1"
            v-model="deviceModel.name"
            placeholder="设备名称"
          />
          <span class="margin-left-1 text-primary text-size-sm unit"
            >（选填）</span
          >
        </template>
      </van-field>
      <van-field
        v-model="deviceModel.hardversionName"
        type="设备类型"
        name="设备类型"
        label="设备类型"
        placeholder="设备类型"
        readonly
        @click="selectHardversion"
      />
      <van-field
        v-model="deviceModel.area"
        type="归属小区"
        name="归属小区"
        label="归属小区"
        placeholder="归属小区"
        readonly
        @click="selectArea"
      />
      <van-field
        v-model="deviceModel.temp"
        type="收费模板"
        name="收费模板"
        label="收费模板"
        placeholder="收费模板"
        readonly
        @click="selectTemp"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>

    <!-- 错误信息 -->
    <div class="padding-x-3 margin-top-4" v-else>
      <!-- 设备已被别人绑定 -->
      <div class="bg-white" v-if="bindResultMap.errorType === 1">
        <div class="padding-x-3 padding-y-3 text-p text-size-sm">
          绑定人信息
        </div>
        <van-cell-group>
          <van-cell
            title="绑定人昵称"
            :value="
              bindResultMap.dealnick == null ? '无' : bindResultMap.dealnick
            "
          />
          <van-cell
            title="绑定人电话"
            :value="
              bindResultMap.servephone == null ? '无' : bindResultMap.servephone
            "
          />
          <van-cell
            title="绑定日期"
            :value="
              bindResultMap.registTime == null ? '无' : bindResultMap.registTime
            "
          />
        </van-cell-group>
        <div class="padding-x-3 padding-y-3 text-p text-size-sm">
          如设备被非您本人绑定，请联系销售进行解绑
        </div>
      </div>

      <!-- 设备IMEI号过期 -->
      <div class="bg-white" v-if="bindResultMap.errorType === 2">
        <div class="padding-x-3 padding-y-3 text-p text-size-sm">失败信息</div>
        <van-cell-group>
          <van-cell title="失败原因" value="IMEI号过期" />
          <van-cell
            title="过期日期"
            :value="
              bindResultMap.expirationtime == null
                ? '无'
                : bindResultMap.expirationtime
            "
          />
        </van-cell-group>
        <div class="padding-x-3 padding-y-3 text-p text-size-sm">
          请联系销售解决
        </div>
      </div>

      <!-- 特约商户合伙人不允许绑定设备 -->
      <div class="bg-white" v-if="bindResultMap.errorType === 3">
        <div class="padding-x-3 padding-y-3 text-p text-size-sm">失败信息</div>
        <van-cell-group>
          <van-cell title="失败原因" value="特约商户合伙人不允许绑定设备" />
        </van-cell-group>
      </div>
      <van-button
        round
        block
        type="primary"
        class="margin-top-3"
        @click="goHome"
        >返回首页</van-button
      >
    </div>

    <!-- 选择模板 -->
    <van-action-sheet
      v-model="selectTempIsShow"
      description="选择收费模板"
      @select="selectTempBack"
    >
      <ul class="action-box padding-x-2 padding-top-3">
        <li
          v-for="(item, index) in templatelist"
          :key="item.name"
          class="padding-x-1 border-bottom-1 border-ddd padding-y-4"
          :class="{ 'bg-gray': index % 2 === 0 }"
          @click="selectTempBack(item)"
        >
          <div class="d-flex">
            <div class="title text-left text-666 text-size-md">模板名称：</div>
            <div>{{ item.name }}</div>
          </div>
          <div class="d-flex margin-top-3">
            <div class="title text-666 text-size-md">收费说明：</div>
            <div
              v-html="item.subname || '无'"
              class="subname text-left text-p text-size-sm "
            ></div>
          </div>
        </li>
      </ul>
    </van-action-sheet>
  </div>
</template>

<script>
import HdResult from '@/components/hd-result'
import showSelectArea from '@/components/api/select-area/index.js'
import { inquireDeviceTemlataData } from '@/require/template'
import { editEquipmentInfo } from '@/require/home'
import { getDeviceVersionName } from '@/utils/util'
import showSelectHardversion from '@/components/api/select-hardversion/index.js'
export default {
  props: {
    bindResultMap: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Boolean
    }
  },
  components: {
    HdResult
  },
  data() {
    return {
      deviceModel: {
        area: '未命名小区',
        areaId: '',
        temp: '',
        tempId: '',
        hardversion: '00',
        hardversionName: this.fmtGetDeviceTypeName('00'),
        name: ''
      },
      selectTempIsShow: false,
      templatelist: []
    }
  },
  watch: {
    value: {
      // 监听组件打开时，初始化当前状态
      handler(val) {
        if (val) {
          const { hardversion = '00' } = this.bindResultMap
          this.deviceModel = {
            area: '未命名小区',
            areaId: '',
            temp: '',
            tempId: '',
            name: '',
            hardversion: hardversion,
            hardversionName: this.fmtGetDeviceTypeName(hardversion)
          }
          this.selectTempIsShow = false
          this.templatelist = []
        }
      },
      immediate: true
    },
    'bindResultMap.hardversion': {
      handler(hardversion = '00') {
        this.deviceModel = {
          ...this.deviceModel,
          hardversion: hardversion,
          hardversionName: this.fmtGetDeviceTypeName(hardversion)
        }
      },
      immediate: ''
    }
  },
  computed: {
    desc() {
      if (this.bindResultMap.code === 200) {
        return `${this.bindResultMap.devicenum}设备已绑定成功，可以添加下面信息来完善设备信息`
      } else {
        return `${this.bindResultMap.devicenum} ${this.bindResultMap.message}`
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { code, message } = await editEquipmentInfo({
          code: this.bindResultMap.devicenum,
          name: this.deviceModel.name,
          tempid: this.deviceModel.tempId,
          aid: this.deviceModel.areaId
        })
        if (code === 200) {
          this.alert('设置成功').then(() => {
            this.goHome()
          })
        } else {
          this.toast(message)
        }
      } catch (e) {
        this.toast('异常错误')
      }
    },
    selectArea() {
      showSelectArea({
        selectBack: ({ id, text }) => {
          this.deviceModel.areaId = id
          this.deviceModel.area = text
        },
        selectId: this.deviceModel.areaId
      })
    },
    selectTemp() {
      this.getTempListData()
    },
    async getTempListData(selectTempIsShow = true) {
      const { code, message, templatelist } = await inquireDeviceTemlataData({
        code: this.bindResultMap.devicenum,
        tenantId: this.tenantId
      })
      if (code === 200) {
        this.templatelist = templatelist.map(item => {
          const subname = item.hintMessage
            ? item.hintMessage
                .split(/[\n\r]/)
                .map(one => `<li>${one}</li>`)
                .join('')
            : ''
          return { name: item.tempname, id: item.id, subname }
        })
        this.selectTempIsShow = selectTempIsShow
      } else {
        this.toast(message)
      }
    },
    selectTempBack({ name, id }) {
      this.selectTempIsShow = false
      this.deviceModel.tempId = id
      this.deviceModel.temp = name
    },
    goHome() {
      this.$emit('input', false)
    },
    fmtGetDeviceTypeName(hardversion) {
      return `${hardversion} ${getDeviceVersionName(hardversion)}`
    },
    // 选择绑定设备
    selectHardversion() {
      showSelectHardversion({
        code: this.bindResultMap.devicenum,
        hardversion: this.deviceModel.hardversion,
        selectBack: pomise => {
          pomise
            .then(async res => {
              this.alert(res.message)
              await this.getTempListData(false)
              const { name, id } = this.templatelist[0]
              this.deviceModel = {
                ...this.deviceModel,
                hardversion: res.hardversion,
                hardversionName: this.fmtGetDeviceTypeName(res.hardversion),
                temp: name,
                tempId: id
              }
            })
            .catch(err => {
              this.toast(err.message)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bind-result {
  min-height: 100vh;
  .unit {
    width: 80px;
  }
  .action-box {
    .title {
      width: 6em;
    }
  }
}
</style>

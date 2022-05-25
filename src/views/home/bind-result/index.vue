<template>
  <div class="bind-result bg-gray">
    <hd-result
      :type="type"
      :title="type === 'success' ? '绑定成功' : '绑定失败'"
      :desc="desc"
    />
    <van-form @submit="onSubmit" class="margin-top-2" v-if="type === 'success'">
      <div class="bg-white padding-x-3 padding-y-2 text-size-sm text-p">完善设备信息</div>
      <van-field
        name="设备名称"
        label="设备名称"
        placeholder="设备名称"
      >
        <template #input>
          <input class="van-field__control flex-1" v-model="deviceModel.name" placeholder="设备名称" />
          <span class="margin-left-1 text-primary text-size-sm unit">（选填）</span>
        </template>
      </van-field>
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
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <div class="padding-x-3 margin-top-4">
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
      <van-button round block type="primary" @click="goHome">返回首页</van-button>
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
          :class="{ 'bg-gray' : index % 2 === 0 }"
          @click="selectTempBack(item)"
        >
          <div class="d-flex">
            <div class="title text-left text-666 text-size-md">模板名称：</div>
            <div>{{item.name}}</div>
          </div>
          <div class="d-flex margin-top-3" >
            <div class="title text-666 text-size-md">收费说明：</div>
            <div v-html="item.subname || '无'" class="subname text-left text-p text-size-sm "></div>
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
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    HdResult
  },
  data () {
    return {
      code: this.$route.query.code,
      message: this.$route.query.message,
      type: this.$route.query.type,
      deviceModel: {
        area: '未命名小区',
        areaId: '',
        temp: '',
        tempId: '',
        name: ''
      },
      selectTempIsShow: false,
      templatelist: []
    }
  },
  computed: {
    desc () {
      switch (this.type) {
        case 'success' :
          return `${this.code}设备已绑定成功，可以添加下面信息来完善设备信息`
        case 'warning' :
          return `${this.code} ${this.message}`
        case 'danger' :
          return `${this.code} ${this.message}`
      }
      return this.code
    }
  },
  methods: {
    onSubmit () {
      console.log(this.deviceModel)
    },
    selectArea () {
      showSelectArea({
        selectBack: ({ id, text }) => {
          this.deviceModel.areaId = id
          this.deviceModel.area = text
        },
        selectId: this.deviceModel.areaId
      })
    },
    selectTemp () {
      this.getTempListData()
    },
    async getTempListData () {
        const { code, message, templatelist } = await inquireDeviceTemlataData({
          code: this.code,
          tenantId: this.tenantId
        })
        if (code === 200) {
            this.templatelist = templatelist.map(item => {
              const subname = item.hintMessage ? item.hintMessage.split(/[\n\r]/).map(one => `<li>${one}</li>`).join('') : ''
              return ({ name: item.tempname, id: item.id, subname })
            })
            this.selectTempIsShow = true
        } else {
            this.toast(message)
        }
    },
    selectTempBack ({ name, id }) {
      this.selectTempIsShow = false
      this.deviceModel.tempId = id
      this.deviceModel.temp = name
    },
    goHome () {
      this.$emit('change', false)
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

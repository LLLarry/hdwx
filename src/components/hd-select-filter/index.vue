<template>
  <div class="hd-select-filter">
      <div class="d-inline-block">
        <slot />
      </div>
      <!-- 复用模板到其他设备 -->
      <hd-select
          :list="deviceList"
          :isShow="repeatIsShow"
          :title="title"
          keyString="code"
          @confirm="handleRepeatSubmit"
          @cancel="$emit('close')"
      >
          <template #title>
              <div class="flex-1 text-center">设备号</div>
              <div class="flex-1 text-center d-flex align-items-center justify-content-center" @click="filterAreaList">
                  <span v-if="selectAreaRow && selectAreaRow.id !== ''">{{selectAreaRow.name}}</span>
                  <span v-else>所属小区</span>
                  <van-icon name="play" size=".5rem" class="play-icon text-success" />
              </div>
          </template>
          <template v-slot="{row}">
              <div class="flex-1 text-center">{{row.code}}</div>
              <div class="flex-1 text-center">{{row.areaname}}</div>
          </template>
      </hd-select>

      <van-action-sheet
        v-model="actionSheetIsShow"
        @select="selectArea"
        :actions="actions"
        cancel-text="取消"
        description="请选择要筛选的小区名"
        close-on-click-action
      />
  </div>
</template>

<script>
import HdSelect from '@/components/hd-select'
import { getDealAreaListInfo } from '@/require/device'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    repeatIsShow: {
      type: Boolean,
      required: true
    },
    repeatTitle: {
      type: String,
      default: ''
    }
  },
  components: {
    HdSelect
  },
  data () {
    return {
      actionSheetIsShow: false,
      actions: [{ name: '全部', id: '' }],
      selectAreaRow: null // 选择的小区
    }
  },
  computed: {
    deviceList () {
      if (!Array.isArray(this.list)) return []
      if (!this.selectAreaRow) return this.list
      const { name, id } = this.selectAreaRow
      if (id === '') return this.list
      return this.list.filter(item => item.areaname === name)
    },
    title () {
      return `
        <div class="text-center">${this.repeatTitle}</div>
        <div class="text-666 text-size-sm">（温馨提示：点击“所属小区”，可筛选对应的小区设备）</div>
      `
    }
  },
  methods: {
    handleRepeatSubmit (result = []) {
      this.$emit('submit', result)
    },
    // 筛选小区列表
    async filterAreaList () {
      try {
        const { code, message, resultlist } = await getDealAreaListInfo()
        if (code === 200) {
          this.actions = [{ name: '全部', id: '' }, ...resultlist]
          this.actionSheetIsShow = true
        } else {
          this.toast(message)
        }
      } catch (error) {
        this.toast('异常错误')
      }
    },
    selectArea (area) {
      this.selectAreaRow = area
    }
  }
}
</script>

<style lang="scss" scoped>
.hd-select-filter {
  .play-icon {
    transform: rotate(90deg);
  }
}
</style>

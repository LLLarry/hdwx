<template>
  <div>
    <van-popup :value="isShow" round position="bottom" @closed="closeFn" @click-overlay="showAreaPicker=false">
        <van-picker
            title="请选择小区列表"
            show-toolbar
            :columns="areaList"
            :default-index="defaultIndex"
            @confirm="selectBack"
            @cancel="showAreaPicker = false"
        />
    </van-popup>
  </div>
</template>

<script>
import { getDealAreaListInfo } from '@/require/device'
export default {
  data () {
    return {
      showAreaPicker: false,
      // defaultIndex: 0,
      loaded: false,
      areaList: []
    }
  },
  computed: {
    isShow () {
      if (this.showAreaPicker) {
        if (this.loaded) {
          return true
        } else {
          // 请求小区数据,请求成功将loaded设置为true
          this.getArrayList()
          return false
        }
      } else {
        if (this.loaded) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.loaded = false
        }
        return false
      }
    }
  },
  methods: {
    async getArrayList () {
        try {
            if (this.areaList && this.areaList.length <= 0) {
                const { code, resultlist } = await getDealAreaListInfo()
                if (code === 200) {
                    const list = resultlist.map(item => ({
                        ...item,
                        text: item.name
                    }))
                    if (this.showNoArea) {
                      this.areaList = [{ text: '未命名小区', id: 0 }, ...list]
                    } else {
                      this.areaList = list
                    }
                }
            }
        } catch (error) {
            this.toast('异常错误')
        } finally {
          this.loaded = true
        }
    }
  }
}
</script>

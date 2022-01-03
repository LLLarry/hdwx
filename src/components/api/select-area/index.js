import Vue from 'vue'
import SelectAreaComponent from './index.vue'
const SelectAreaConstructor = Vue.extend(SelectAreaComponent)

/**
 * 展示选择小区Api
 * @param {
 *  selectBack 选择小区后的回调函数 param 选中的小区信息
 *  nowAreaId 当前选中小区的id
 *  showNoArea 是否展示未命名的小区
 * }
 * @param {*} nowAreaId 当前小区小区id
 * @returns Function 关闭小区的回调函数
 */
const showSelectArea = ({
  selectBack = () => {},
  selectId = -1,
  showNoArea = true
}) => {
  let selectArea = null
  const el = document.createElement('div')
  // 关闭选择小区实例函数
  const closeFn = () => {
    if (selectArea && selectArea.showAreaPicker) {
      selectArea.showAreaPicker = false
    }
    // 在文档中移除元素
    selectArea && selectArea.$el && selectArea.$el.remove()
  }
  // 创建选择小区实例
  selectArea = new SelectAreaConstructor({
    el,
    data () {
      return {
        showNoArea
      }
    },
    computed: {
      defaultIndex () {
        const index = this.areaList.findIndex(item => item.id === selectId)
        return index === -1 ? 0 : index
      }
    },
    methods: {
      selectBack: (value) => {
        selectArea.showAreaPicker = false
        selectBack(value)
      },
      closeFn
    }
  })
  document.body.appendChild(selectArea.$el)
  selectArea.showAreaPicker = true
  return closeFn
}

export default showSelectArea

import vue from 'vue'
import SelectHardVersion from './index.vue'
const SelectHardVersionConstructor = vue.extend(SelectHardVersion)

/**
 * @param { selectBack 选中之后的回调，code 设备号，hardversion 当前硬件版本号 } param0
 * @returns close 关闭函数
 */
const showSelectHardversion = ({
  selectBack = () => {},
  code = '',
  hardversion = null
}) => {
  let selectHardVersion = null
  const el = document.createElement('div')

  selectHardVersion = new SelectHardVersionConstructor({
    el,
    data () {
      return {
        hardversion,
        code
      }
    },
    methods: {
      selectBack
    }
  })
  document.body.appendChild(selectHardVersion.$el)
  selectHardVersion.showSelectHardVersion = true

  return () => {
    selectHardVersion && selectHardVersion.close()
  }
}

export default showSelectHardversion

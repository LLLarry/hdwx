<template>
    <van-popup
        v-model="isShow"
        position="bottom"
        :close-on-click-overlay="false"
    >
        <div class="margin-top-2">
            <van-area
                title="选择地址"
                :area-list="areaList"
                :value="selectId"
                @confirm="confirm"
                @cancel="cancel"
            />
        </div>
    </van-popup>
</template>

<script>
const areaList = {
  province_list: {
    110000: '北京市',
    120000: '天津市'
  },
  city_list: {
    110100: '北京市',
    120100: '天津市'
  },
  county_list: {
    110101: '东城区',
    110102: '西城区'
    // ....
  }
}
const addList = ['province', 'city', 'county']
    export default {
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            selectId: {
                type: [String, Number]
            }
        },
        data () {
            return {
                areaList
            }
        },
        methods: {
            confirm (value) {
                const area = []
                let selectId = this.selectId
                const obj = value.reduce((acc, item, index) => {
                    if (typeof item !== 'undefined') {
                        acc[addList[index]] = item
                        area.push(item.name)
                        selectId = item.code
                    }
                    return acc
                }, {})
                this.$emit('confirm', {
                    area: area.join(' '), //  选中的地址
                    selectAreaObj: obj, // 选中的地址对象
                    selectId // 选中的id
                })
            },
            cancel () {
                this.$emit('cancel')
            }
        }
    }
</script>

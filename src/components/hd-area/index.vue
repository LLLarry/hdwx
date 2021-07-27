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
                areaList: []
            }
        },
        async created () {
            // 加载城市数据
            const { default: areaList } = await import(/* webpackChunkName: "area-city" */ '@/assets/js/city.js')
            this.areaList = areaList
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

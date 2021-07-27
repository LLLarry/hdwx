<template>
<!-- 添加设备 -->
    <van-popup
        v-model="isShow"
        :close-on-click-overlay="false"
        position="bottom"
        :style="{ width: '100%'}"
        class="popup-box"
    >
        <div class="popup-wrapper">
            <div class="popup-box-header d-flex align-items-center justify-content-center shadow-md">
                <div>添加设备</div>
            </div>
            <div class="popup-box-content padding-3">
                <div class="popup-box-title bg-gray padding-y-2 d-flex font-weight-bold align-items-center">
                    <slot name="title"></slot>
                    <div class="flex-1 text-center">选择</div>
                </div>
                <div class="popup-box-wrapper">
                    <van-checkbox-group
                        v-model="result"
                        v-if="!radio"
                    >
                        <div
                            v-for="(item) in list"
                            :key="item.id"
                            class="popup-box-item padding-y-2 d-flex align-items-center"
                        >
                            <!--
                            <div class="flex-1 text-center">设备号</div>
                            <div class="flex-1 text-center">设备名</div>
                            -->
                            <slot name="default" :row="item"></slot>
                            <div class="flex-1 text-center">
                                <van-checkbox :name="item.id"></van-checkbox>
                            </div>
                        </div>
                    </van-checkbox-group>
                    <van-radio-group v-model="radioResult" v-else>
                        <div
                            v-for="(item) in list"
                            :key="item.id"
                            class="popup-box-item padding-y-2 d-flex align-items-center"
                        >
                            <slot name="default" :row="item"></slot>
                            <div class="flex-1 text-center">
                                 <van-radio :name="item.id"></van-radio>
                            </div>
                        </div>
                    </van-radio-group>
                </div>
                <div class="d-flex padding-3">
                    <van-button type="default" class="flex-1" @click="close">取消</van-button>
                    <van-button type="primary" class="flex-2 margin-left-2" @click="submit">确定</van-button>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: true
        },
        checkbox: {
            type: Boolean,
            default: true
        },
        radio: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            result: [],
            radioResult: undefined
        }
    },
    watch: {
        list: {
            handler (value) {
                if (this.radio) {
                    this.radioResult = this.list.filter(item => item.selected).map(item => item.id)[0]
                } else {
                   this.result = this.list.filter(item => item.selected).map(item => item.id)
                }
            },
            immediate: true
        }
    },
    methods: {
        submit () {
            const result = this.radio ? this.radioResult : this.result
            this.$emit('confirm', result)
        },
        close () {
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="scss">
.popup-box {
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    .popup-box-wrapper {
        max-height: 60vh;
        overflow-y: auto;
    }
}
.popup-box-header {
    height: 45px;
}
.popup-box-title {
    // border: 1px solid #ccc;
    &>div {
        border-right: 1px solid #ccc;
        &:last-child {
            border: none;
        }
    }
}
.van-checkbox {
    display: initial;
}
.van-checkbox__icon .van-icon{
    display: initial;
}
.van-radio {
    display: initial;
}
.van-radio__icon .van-icon{
    display: initial;
}
</style>

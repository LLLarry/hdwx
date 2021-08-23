<template>
    <div class="history-footer padding-x-3 padding-y-1 shadow">
        <ul class="d-flex justify-content-around align-items-center">
            <li class="position-relative padding-x-1 margin-x-1">
                <div class="d-inline-flex rounded-circle bg-success padding-2 justify-content-center align-items-center">
                    <van-icon name="plus" size=".6rem" class="text-white" @click="show = true" />
                </div>
            </li>
        </ul>
        <van-popup v-model="show" round position="bottom">
            <div class="padding-top-4" />
            <ul class="d-flex justify-content-around align-items-center select-menu padding-top-4">
                <li
                    class="position-relative padding-x-1 margin-x-1 d-flex flex-column align-items-center"
                    @click="selectType(3)"
                >
                    <i class="iconfont icon-shijian margin-bottom-2 text-success" />
                    <div>时间统计</div>
                </li>
                <li
                    class="position-relative padding-x-1 margin-x-1 d-flex flex-column align-items-center"
                    @click="selectType(1)"
                >
                    <i class="iconfont icon-chongdianbao margin-bottom-2 text-success" />
                    <div>设备统计</div>
                </li>
                <li
                    class="position-relative padding-x-1 margin-x-1 d-flex flex-column align-items-center"
                    @click="selectType(2)"
                >
                    <i class="iconfont icon-xiaoqu margin-bottom-2 text-success" />
                    <div>小区统计</div>
                </li>
            </ul>
            <div class="d-flex justify-content-around align-items-center padding-y-3 close-bottom" @click="show = false">
                <van-icon name="cross" size=".65rem" />
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show: false
        }
    },
    methods: {
        selectType (type) {
            this.$emit('selectType', type)
            this.show = false
        }
    }
}
</script>

<style lang="scss">
.history-footer {
    .select-menu {
        li {
            i {
                font-size: 32px;
            }
        }
    }
    .close-bottom {
        margin-top: 40px;
        border-top: 1px dotted #cdcdcd;
    }
}
</style>

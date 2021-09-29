<template>
    <div class="padding-x-4 padding-y-3 rounded-lg position-relative bank-card">
        <div class="text-white rounded-lg text-size-default d-flex flex-column justify-content-between h-100">
            <div>
                <h3 class="">{{ data.bankname }}</h3>
                <p class="text-size-sm margin-top-2" v-if="showStar">
                    (到账时间：{{
                        type === 3 ? '实时到账' :
                        type === 1 ? '第二个工作日到账' :
                        type === 2 ? '七个工作日内到账' : ''
                     }})
                </p>
            </div>
            <div class="">{{data.bankcardnum}}</div>
        </div>
        <!-- 选中按钮 -->
        <div class="select-star position-absolute" v-if="showStar">
            <van-icon
                name="star"
                :color="selected ? '#07c160' : '#ffffff'"
                size="25px"
                @click="$emit('handleSelect', { ...data, type })"
            />
        </div>
        <!-- 设置按钮 -->
        <div class="setting position-absolute" v-else>
            <van-icon
                name="setting-o"
                color="#ffffff"
                size="25px"
                @click="$router.push({ path: `/withdraw/setbankcard/${type}/${data.id}` })"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        },
        type: {
            type: Number,
            default: 1 // 1 个人 2 对公, 3 微信
        },
        showStar: { // 是否显示选中星星
            type: Boolean,
            default: false
        },
        selected: { // 是否选中星星
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.bank-card {
    height: 95px;
    &:nth-of-type(4n-3) {
        background-image: linear-gradient(to bottom, #51D2EF, #67B9F5);
    }
    &:nth-of-type(4n-2) {
        background-image: linear-gradient(to bottom, #FB9E7C, #FDC765);
    }
    &:nth-of-type(4n-1) {
        background-image: linear-gradient(to bottom, #98B6EC, #E1B4EB);
    }
    &:nth-of-type(4n) {
        background-image: linear-gradient(to bottom, #FFA48F, #FE3A5E);
    }
    .select-star {
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
    }
    .setting {
        right: 0;
        top: 0;
        padding: 15px;
    }
}
</style>

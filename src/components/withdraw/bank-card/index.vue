<template>
    <div class="padding-x-4 padding-y-3 rounded-lg position-relative" :class="[add ? 'add-bank-card' : 'bank-card']">
        <div class="text-white rounded-lg text-size-default d-flex flex-column justify-content-between h-100" v-if="!add">
            <h3 class="">中国邮政银行</h3>
            <div class="">6932 **** **** **** **** 1234</div>
        </div>
        <div class="text-white rounded-lg text-size-md d-flex flex-column align-items-center justify-content-center h-100" v-else>
            <van-button type="primary" icon="plus" size="normal" block @click="$emit('cb', type)">添加银行卡</van-button>
        </div>
        <div class="select-star position-absolute" v-if="showStar">
            <van-icon name="star" :color="selected ? '#07c160' : '#ffffff'" size="25px" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        add: {
            type: Boolean,
            default: false
        },
        type: {
            type: Number,
            default: 1 // 1 个人 2 对公
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
}
.add-bank-card {
    height: 30px;
}
.select-star {
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
}
</style>

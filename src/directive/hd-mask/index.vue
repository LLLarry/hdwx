<template>
    <div class="hd-mask position-absolute d-flex justify-content-center align-items-center" :style="style" v-if="isShow">
        <div class="hd-mask-text text-center text-size-default font-weight-bold" v-html="text"></div>
    </div>
</template>

<style lang="scss" scoped>
.hd-mask {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, .7);
}
</style>

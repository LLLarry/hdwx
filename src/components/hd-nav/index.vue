<template>
    <nav class="hd-nav bg-white d-flex justify-content-around align-items-center">
        <li
            class="nav-item flex-1 d-flex justify-content-around align-items-center"
            v-for="row in list"
            :key="row.text"
        >
            <slot :row="row"></slot>
          <!-- <van-button type="primary" size="small" class="padding-x-4">返回</van-button> -->
        </li>
    </nav>
</template>

<script>
export default {
    props: {
        list: Array,
        default: () => []
    }
}
</script>

<style lang="scss">
.hd-nav {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 46px;
    box-shadow: 0 -2px 12px rgba(100, 101, 102, 0.24);
}
</style>

<template>
  <div class="device-template-list">
    <header class="d-inline-block w-100">
        <div class="desc text-white text-center text-size-default">V3智慧款模板</div>
    </header>
    <main class="position-relative">
        <div class="post-top overflow-hidden shadow padding-3">
            <div class="d-flex justify-content-between">
                <div class="w-50 d-flex justify-content-center flex-column align-items-center border-right-1 border-ccc padding-x-2">
                    <div class="text-size-default font-weight-bold">设备编号</div>
                    <div class="margin-top-3 text-666 w-100 text-truncate text-center">000130</div>
                </div>
                <div class="w-50 d-flex justify-content-center flex-column align-items-center padding-x-2">
                    <div class="text-size-default font-weight-bold">充电模板</div>
                    <div class="margin-top-3 text-666 w-100 text-truncate text-center">模板156654wsada</div>
                </div>
            </div>
        </div>
        <div class="post-content">
            <div class="template-item shadow rounded padding-3 position-relative" v-for="item in 10" :key="item">
                <div><span class="font-weight-bold">模板名称：</span>模板156654wsada</div>
                <div class="contral d-flex justify-content-end margin-top-3">
                    <van-button
                        type="primary"
                        size="mini"
                        class="margin-right-1 padding-x-2"
                        plain round
                    >
                    编辑
                    </van-button>
                    <van-button type="info" size="mini" class="margin-right-1 padding-x-2" plain round>预览</van-button>
                    <van-button type="danger" size="mini" class="padding-x-2" plain round >删除</van-button>
                </div>
                <div class="select-box position-absolute" :class="{ active: active === item }" @click="active = item">
                    <van-icon name="success" class="select-icon position-absolute" />
                </div>
            </div>
        </div>
    </main>
  </div>
</template>

<script>
export default {
    data () {
        return {
            active: 1
        }
    }
}
</script>

<style lang="scss" scoped>
.device-template-list {
    header {
        height: 180px;
        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background: url(../../../assets/images/post_2.png);
            background-size: 100% 100%;
            filter: blur(12px);
            z-index: -1;
            position: relative;
        }
        .desc {
            margin-top: 70px;
            position: absolute;
            left: 0;
            right: 0;
        }
    }
    main {
        margin-top: -40px;
        .post-top {
            // height: 100px;
            background: #fff;
            width: 90%;
            margin: 0 auto;
            border-radius: 10px 10px 0 0;
            box-sizing: border-box;
        }
        .template-item {
            width: 90%;
            margin: 15px auto;
            box-sizing: border-box;
            .select-box {
                border-top: 18px solid #ddd;
                border-right: 18px solid #ddd;
                border-bottom: 18px solid transparent;
                border-left: 18px solid transparent;
                width: 0;
                height: 0;
                right: 0;
                top: 0;
                transition: all .4s ease;
                .select-icon {
                    top: -15px;
                    right: -15px;
                    font-size: 16px;
                    color: #fff;
                }
                &.active {
                    border-top-color: #28a745;
                    border-right-color: #28a745;
                }
            }
        }
    }
}
</style>

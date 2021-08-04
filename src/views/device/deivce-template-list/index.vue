<template>
  <div class="device-template-list">
    <header class="d-inline-block w-100">
        <div class="desc text-white text-center text-size-default">V3智慧款模板</div>
    </header>
    <main class="position-relative">
        <div class="post-top overflow-hidden shadow padding-3">
            <div class="clearfix">
                <div class="w-50 float-left border-box d-flex justify-content-center flex-column align-items-center border-right-1 border-ccc padding-x-2">
                    <div class="text-size-default font-weight-bold">设备编号</div>
                    <div class="margin-top-3 text-666 w-100 text-truncate text-center">000130</div>
                </div>
                <div class="w-50 float-left border-box d-flex justify-content-center flex-column align-items-center padding-x-2">
                    <div class="text-size-default font-weight-bold">所属小区</div>
                    <div class="margin-top-3 text-666 w-100 text-truncate text-center">回忆小区</div>
                </div>
            </div>
        </div>
        <div class="post-content">
            <div class="template-item shadow rounded padding-3 position-relative" v-for="item in 10" :key="item">
                <div><span class="font-weight-bold">模板名称：</span>模板156654wsada</div>
                <div class="contral d-flex justify-content-end margin-top-3">
                    <van-button type="danger" size="mini" class="margin-right-1 padding-x-2" plain round >删除</van-button>
                    <van-button type="info" size="mini" class="margin-right-1 padding-x-2" plain round>预览</van-button>
                    <van-button type="info" size="mini" class="margin-right-1 padding-x-2" plain round @click="repeatUseTemp(item)">复用</van-button>
                   <van-button
                        type="primary"
                        size="mini"
                        class="padding-x-2"
                        plain round
                    >
                    编辑
                    </van-button>
                </div>
                <div class="select-box position-absolute" :class="{ active: active === item }" @click="active = item">
                    <van-icon name="success" class="select-icon position-absolute" />
                </div>
            </div>
        </div>
    </main>

    <!-- 复用模板到其他设备 -->
    <hd-select
        :list="list"
        :isShow="repeatIsShow"
        :title="repeatTitle"
        keyString="code"
        @confirm="handleRepeatSubmit"
        @cancel="repeatIsShow = false"
    >
        <template #title>
            <div class="flex-1 text-center">设备号</div>
            <div class="flex-1 text-center">所属小区</div>
        </template>
        <template v-slot="{row}">
            <div class="flex-1 text-center">{{row.code}}</div>
            <div class="flex-1 text-center">{{row.areaname}}</div>
        </template>
    </hd-select>
    <!-- 底部：新增充电模板部分 -->
    <hd-nav :list="navList">
        <template v-slot="{ row }">
            <van-button
                type="primary"
                size="small"
                class="padding-x-4"
                icon="plus"
                :to="row.to"
            >{{row.text}}</van-button>
        </template>
    </hd-nav>
  </div>
</template>

<script>
import hdSelect from '@/components/hd-select'
import hdNav from '@/components/hd-nav'
export default {
    data () {
        return {
            active: 1,
            list: [
                { code: '000130', areaname: '回忆小区', aid: 1 },
                { code: '000132', areaname: '回忆小区', aid: 1, selected: true, disabled: true },
                { code: '000133', areaname: null, aid: 0 },
                { code: '000134', areaname: '明港路花园565456487812', aid: 2 }
            ],
            repeatIsShow: false, // 复用模板是否显示
            repeatTitle: '',
            navList: [
                { text: '新增充电模板', to: '/template/v3/000130' }
            ]
        }
    },
    components: {
        hdSelect,
        hdNav
    },
    methods: {
        repeatUseTemp (row) {
            // console.log(row)
            this.repeatTitle = `选中设备使用<span class="text-success">${'模板156654wsada'}</span>模板`
            this.repeatIsShow = true
        },
        handleRepeatSubmit (result) {
            console.log(result)
            this.repeatIsShow = false
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
            text-shadow: 5px 5px 6px #000;
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

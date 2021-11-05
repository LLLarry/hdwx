<template>
  <footer class="d-flex menu-contral">
        <div class="menu-contral-box d-flex w-100">
            <div class="menu-contral-left d-flex align-items-center">
                <div class="menu-icon d-flex align-items-center justify-content-center" @click="toggleSlectInfo(true)">
                    <div class="menu-icon-box d-flex align-items-center justify-content-center" :class="{ active: selectInfo.isSelect }">
                        <i class="iconfont icon-diannao"></i>
                    </div>
                    <div class="pin" v-if="selectInfo.isSelect">{{ selectInfo.count }}</div>
                </div>
                <div class="menu-text text-white">
                    商户缴费：&yen;{{ selectInfo.usersInfo[0] ? selectInfo.usersInfo[0].payMonet  : 0}}
                </div>
            </div>
            <div class="menu-contral-right bg-success d-flex justify-content-center">
                <van-button type="primary" class="bg-success border-success w-100 h-100" @click="actionShow = true">去结算</van-button>
            </div>
        </div>
        <div class="popup-box" :class="{active: showSelectInfo}">
            <div class="popup-box-mask" @click="toggleSlectInfo(false)"></div>
            <div class="popup-box-content bg-white">
                <div class="padding-3">
                    <p class="text-333 font-weight-bold">已选设备</p>
                    <p class="margin-top-1">{{selectInfo.selectDevices}}</p>

                    <p class="margin-y-2 text-333 d-flex align-items-center justify-content-between">
                        <span class="font-weight-bold">缴费详情</span>
                        <span class="text-p text-size-sm">{{ apportion ? '已开启合伙人分摊' : '未开启合伙人分摊' }}</span>
                    </p>
                    <p class="margin-top-1 d-flex justify-content-between margin-bottom-2" v-for="item in selectInfo.usersInfo" :key="item.id">
                        <span>{{ item.username || item.nickname}} （{{ item.rank === -1 ? '合伙人' : '商户' }}）</span>
                        <span class="text-success font-weight-bold">&yen;{{ item.payMonet }}</span>
                    </p>
                </div>
            </div>
        </div>

        <van-action-sheet
            v-model="actionShow"
            :actions="actions"
            cancel-text="取消"
            description="请选择支付方式"
            close-on-click-action
            @select="select"
        />
    </footer>
</template>

<script>
import { useInjectList, useSelectListMap, useToggleSelectInfo, useWatchUserChange, useActionSheet } from './helper'
export default {
    setup (props, context) {
        // 是否是小区
        const aid = context.root.$route.params.aid
        const { selectList, initList, initUser, apportion } = useInjectList()
        const selectInfo = useSelectListMap(initList, selectList, initUser, apportion)
        const showSelectInfo = useToggleSelectInfo(selectList, initList)
        // 监听selectInfo.user, 并传递给父组件
        useWatchUserChange(selectInfo, context)
        // 切换是否显示选中信息
        const toggleSlectInfo = (flag) => {
            if (flag) {
                if (selectInfo.value.isSelect) {
                    showSelectInfo.value = true
                }
            } else {
                showSelectInfo.value = false
            }
        }
        // action-sheet hook
        const { actionShow, actions, select } = useActionSheet({
            apportion,
            selectInfo,
            aid,
            emit: context.emit
        })
        return {
            selectList,
            selectInfo,
            showSelectInfo,
            toggleSlectInfo,
            apportion,
            actionShow,
            actions,
            select
        }
    }
}
</script>

<style lang="scss">
.menu-contral {
    height: 50px;
    position: relative;
    .menu-contral-box {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
    }
    .menu-contral-left {
        width: 75%;
        background: #000;
        .menu-icon {
            width: 58px;
            height: 58px;
            background: #000;
            position: absolute;
            left: 15px;
            bottom: 0;
            border-radius: 50%;
            z-index: 2;
            .menu-icon-box {
                width: 50px;
                height: 50px;
                background: #121212;
                border-radius: 50%;
                i {
                    color: #323233;
                    font-size: 24px;
                }
                &.active {
                    background: #007AAE;
                    i {
                        color: #ffffff;
                    }
                }
            }
            .pin {
                position: absolute;
                background: #ED1C24;
                right: 0;
                top: 0;
                padding: 0px 4px;
                line-height: 20px;
                height: 20px;
                color: #fff;
                border-radius: 8px;
                font-size: 12px;
            }
        }
        .menu-text {
            padding-left: 80px;
        }
    }
    .menu-contral-right {
        width: 25%;
    }
    .popup-box {
        position: fixed;
        left: 0;
        bottom: 50px;
        right: 0;
        z-index: 1;
        .popup-box-mask {
            width: 100%;
            background: rgba(27, 19, 19, .6);
            height: calc(100vh - 50px);
            display: none;
        }
        .popup-box-content {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 30vh;
            border-radius: 10px 10px 0 0;
            transform: translateY(200%);
            transition: all .3s ease-in-out;
        }
        &.active {
            .popup-box-mask {
                display: block;
            }
            .popup-box-content {
                transform: translateY(0);
            }
        }
    }
}
</style>

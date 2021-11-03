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
                    商户缴费：&yen;{{ selectInfo.money }}
                </div>
            </div>
            <div class="menu-contral-right bg-success d-flex justify-content-center">
                <van-button type="primary" class="bg-success border-success w-100 h-100">去结算</van-button>
            </div>
        </div>
        <div class="popup-box" :class="{active: showSelectInfo}">
            <div class="popup-box-mask" @click="toggleSlectInfo(false)"></div>
            <div class="popup-box-content bg-white">
                <div class="text-333 padding-3">
                    <p>已选设备</p>
                    <p class="margin-top-1">{{selectInfo.selectDevices}}</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { useSelectList, useSelectListMap, useToggleSelectInfo } from './helper'
export default {
    setup () {
        const selectList = useSelectList()
        const selectInfo = useSelectListMap(selectList)
        const showSelectInfo = useToggleSelectInfo()
        // 切换是否显示选中信息
        const toggleSlectInfo = (flag) => {
            console.log(flag)
            if (flag) {
                console.log(selectInfo.value.isSelect)
                if (selectInfo.value.isSelect) {
                    showSelectInfo.value = true
                }
            } else {
                showSelectInfo.value = false
            }
        }
        return {
            selectList,
            selectInfo,
            showSelectInfo,
            toggleSlectInfo
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

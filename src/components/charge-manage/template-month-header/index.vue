<template>
  <ul class="template-header bg-gray padding-y-2 padding-x-2">
    <li class="template-header-item">
        <div class="header-content">
            <van-field
                v-model="data.tempname"
                name="tempname"
                label-width="3.5rem"
                label="包月模板名称："
                placeholder="请输入包月模板名称"
                :disabled="isSystemTem"
            />
        </div>
    </li>
    <li class="template-header-item">
        <div class="header-content">
            <van-field
                v-model="data.monthmaxnum"
                name="remark"
                label-width="3.5rem"
                label="每月最大充电次数："
                placeholder="每月最大充电次数"
                :disabled="isSystemTem"
            >
                <template #right-icon>
                    次
                </template>
            </van-field>
        </div>
    </li>
    <li class="template-header-item">
        <div class="header-content">
            <van-field
                v-model="data.daymaxnum"
                label="每日最大充电次数："
                label-width="3.5rem"
                placeholder="每日最大充电次数"
                :disabled="isSystemTem"
            >
                <template #right-icon>
                    次
                </template>
            </van-field>
        </div>
    </li>
    <li class="template-header-item">
        <div class="header-content">
            <van-field
                v-model="data.everymaxelec"
                label="每次最大用电量："
                label-width="3.5rem"
                placeholder="每次最大用电量"
                :disabled="isSystemTem"
            >
                <template #right-icon>
                    度
                </template>
            </van-field>
        </div>
    </li>
    <li class="template-header-item">
        <div class="header-content">
            <van-field
                v-model="data.everymaxtime"
                label="每次最长充电时间："
                label-width="3.5rem"
                placeholder="每次最长充电时间"
                :disabled="isSystemTem"
            >
                <template #right-icon>
                    分钟
                </template>
            </van-field>
        </div>
    </li>
    <li class="template-header-item">
        <div class="header-content">
            <div class="post-session">
                <div class="d-flex align-items-center padding-y-2">
                    <div style="width: 10em;" class="text-333 text-size-md">是否开通包月充电:</div>
                    <van-switch
                        v-model="data.month"
                        size="24px"
                        :disabled="isSystemTem"
                        active-color="#07c160"
                    />
                </div>
            </div>
        </div>
    </li>
    <!-- 是否支持支付宝充电 -->

  </ul>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        },
        isSystemTem: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.template-header {
    /deep/ .van-cell {
        background: transparent;
        padding: 5px 0;
        .van-field__body {
            background-color: #fff;
            padding-right: 10px;
            .van-field__control {
                background-color: #fff;
                padding: 5px 10px;
            }
            .van-field__label {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>

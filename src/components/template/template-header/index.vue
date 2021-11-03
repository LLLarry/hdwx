<template>
  <ul class="template-header bg-gray padding-y-2 padding-x-2">
    <li class="template-header-item">
        <div class="header-content">
            <van-field
                v-model="data.tempname"
                name="name"
                label="模板名称："
                placeholder="请输入模板名称"
                :rules="[{ required: true, message: '请填写用户名' }]"
                :disabled="isSystemTem"
            />
        </div>
    </li>
    <li class="template-header-item">
        <div class="header-content">
            <van-field
                v-model="data.brand"
                name="remark"
                label="品牌名称："
                placeholder="请输入品牌名称"
                :disabled="isSystemTem"
            />
        </div>
    </li>
    <li class="template-header-item">
        <div class="header-content">
            <van-field
                v-model="data.telephone"
                name="common2"
                label="联系电话："
                placeholder="请输入联系电话"
                :disabled="isSystemTem"
            />
        </div>
    </li>
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

<style lang="scss">
.template-header {
    .van-cell {
        background: transparent;
        padding: 5px 0;
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
</style>

<template>
  <div class="auth-manage bg-gray">
    <van-nav-bar
      title="小区设置"
      left-text="返回"
      left-arrow
      class="position-fixed nav-bar"
      @click-left="$router.go(-1)"
    />

   <hd-title exec>费用设置
     <template #desc>
       <van-popover
          trigger="click"
          v-model="showPopover"
          placement="bottom-end"
        >
          <div class="shadow text-size-sm text-666 padding-2">
            <p>设置的费用仅在小区报表中作为统计使用</p>
            <h6 class="margin-y-1">如不设置费用，在报表中将使用以下默认值</h6>
            <p>电价默认值： <span class="text-success">1元/度</span></p>
            <p>设备折旧费默认值： <span class="text-success">0元/月</span></p>
            <p>运营成本费默认值： <span class="text-success">0元/月</span></p>
          </div>
          <template #reference>
            <van-icon name="question-o" size=".55rem" />
          </template>
        </van-popover>
     </template>
   </hd-title>
    <van-form @submit="onSubmit" class="margin-x-2 rounded-md overflow-hidden">
      <van-field
        label="电价"
        placeholder="用户名"
      >
        <template #input>
          <div class="d-flex">
            <input
              class="van-field__control flex-1"
              placeholder="请输入电价"
              v-model="formModel.elecPrice"
            />
            <div class="exec text-size-sm text-666">
              元 / 度电
            </div>
          </div>
        </template>
      </van-field>

      <van-field
        label="设备折旧费"
      >
        <template #input>
          <div class="d-flex">
            <input
              class="van-field__control flex-1"
              placeholder="请输入设备折旧费"
              v-model="formModel.deviceMoney"
            />
            <div class="exec text-size-sm text-666">
              元 / 月
            </div>
          </div>
        </template>
      </van-field>

      <van-field
        label="运营成本费"
      >
        <template #input>
          <div class="d-flex">
            <input
              class="van-field__control flex-1"
              placeholder="请输入运营成本费"
              v-model="formModel.operatingMoney"
            />
            <div class="exec text-size-sm text-666">
              元 / 月
            </div>
          </div>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <hd-title exec>合伙人权限管理</hd-title>
    <div class="margin-x-2 bg-white rounded-md overflow-hidden">
      <van-cell-group>
        <van-cell title="充值收入" value="内容" label="合伙人是否能看到“充值收入”">
          <van-switch v-model="auth.a"  size=".6rem" active-color="#07c160" />
        </van-cell>
        <van-cell title="月度报表" value="内容" label="合伙人是否能看到“月度报表”">
          <van-switch v-model="auth.b"  size=".6rem" active-color="#07c160" />
        </van-cell>
        <!-- <van-cell title="日度报表" value="内容" label="合伙人是否能看到“日度报表”">
          <van-switch v-model="auth.c"  size=".6rem" active-color="#07c160" />
        </van-cell> -->
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formModel: {},
      auth: {
        a: true,
        b: true,
        c: true
      },
      showPopover: false
    }
  },
  methods: {
    onSubmit () {}
  }
}
</script>

<style lang="scss" scoped>
.auth-manage {
  padding-top: 50px;
  min-height: 100vh;
  box-sizing: border-box;
  .nav-bar {
    top: 0;
    left: 0;
    right: 0;
  }
  .exec {
    width: 80px;
  }
}
</style>

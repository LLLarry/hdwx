<template>
  <div class="charge-manager bg-gray">
    <van-nav-bar
      class="shadow"
      title="充值管理"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <main>
      <van-cell-group>
        <van-cell
          title="充值模板"
          label="钱包充值、在线卡充值"
          value=""
          is-link
          to="/chargemanage/list"
        />
        <van-cell title="包月模板" value="" is-link to="/chargemanage/month" />
      </van-cell-group>
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.charge-manager {
  min-height: 100vh;
}
</style>

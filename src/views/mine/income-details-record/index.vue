<template>
  <div class="income-dr bg-gray">
      <hd-line height=".4rem" />
      <div class="margin-x-3 rounded-md overflow-hidden">
          <section class="bg-success text-white padding-top-3 padding-bottom-2">
              <div class="text-center margin-bottom-4 text-size-default">充电收益</div>
              <div class="d-flex justify-content-between money-contral padding-top-2 padding-x-3">
                  <span>金额</span>
                  <span>&yen; 3.00</span>
              </div>
          </section>
          <section class="bg-white padding-y-2">
              <ul>
                  <li class="padding-x-3">
                      <div class="d-flex justify-content-between padding-y-1">
                          <div>设备编号</div>
                          <div class="text-666">000003</div>
                      </div>
                  </li>
                  <li class="padding-x-3">
                      <div class="d-flex justify-content-between padding-y-1">
                          <div>设备编号</div>
                          <div class="text-666">000003</div>
                      </div>
                  </li>
              </ul>
          </section>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.income-dr {
    min-height: 100vh;
    .money-contral {
        border-top: 1px dotted #fff;
    }
}
</style>

<template>
  <div class="income-dr bg-gray">
      <hd-line height=".4rem" />
      <div class="margin-x-3 rounded-md overflow-hidden">
          <section class="bg-success text-white padding-top-3 padding-bottom-2">
              <div class="text-center margin-bottom-4 text-size-default">
                  <slot name="title" />
              </div>
              <slot name="desc" />
              <div class="d-flex justify-content-between money-contral padding-top-2 padding-x-3">
                  <slot name="focus" />
              </div>
          </section>
          <section class="bg-white padding-y-2">
              <ul>
                  <li class="padding-x-3" v-for="(one, index) in list" :key="index">
                       <slot name="child" :row="one" v-if="one">
                          <div class="d-flex justify-content-between padding-y-1">
                            <div>{{ one.title }}</div>
                            <div class="text-666">{{ one.content }}</div>
                        </div>
                      </slot>
                  </li>
              </ul>
              <div class="d-flex justify-content-between menu-contral padding-top-2 padding-x-3 margin-top-2" v-if="menu">
                    <slot name="menu" />
              </div>
          </section>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        },
        menu: { // 是否显示底部菜单控制层
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.income-dr {
    min-height: 100vh;
    .money-contral {
        border-top: 1px dotted #fff;
    }
    .menu-contral {
        border-top: 1px dotted #28a745;
    }
}
</style>

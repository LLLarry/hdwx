<template>
  <div class="margin-bottom-4">
    <div class="margin-x-3 bg-white padding-3 shadow rounded">
      <div class="border-bottom-1 border-ddd padding-bottom-2 d-flex justify-content-between">
        <p>{{tempData.tempname}}</p>
        <van-tag type="success" v-if="tempData.merid === 0">系统模板</van-tag>
        <!-- <p class="text-p text-size-sm">系统模板</p> -->
      </div>

      <ul class="d-flex flex-wrap template-list margin-top-2 border-bottom-1 border-ddd">
        <li class="border-1 border-success rounded text-success text-center overflow-hidden text-size-sm" v-for="item in tempData.tempson" :key="item.id">
          <div>{{item.sonname}}</div>
        </li>
      </ul>

      <div class="margin-top-2">
        <div class="d-flex justify-content-between">
          <div>【钱包充值】正在使用此模板的小区</div>
          <div class="d-flex justify-content-between align-items-center">
            <span class="text-size-sm text-success" @click="showAreaList(tempData.id, 1)">添加小区</span>
          </div>
        </div>
        <ul class="margin-top-2 d-flex flex-wrap">
          <li class="margin-right-2 margin-bottom-1" v-for="item in tempData.resultwallet" :key="item.id">
            <van-tag size="medium" type="success" plain>
              {{item.name}}
            </van-tag>
          </li>
          <p class="text-p text-size-sm" v-if="tempData.resultwallet.length <= 0">暂无小区使用此模板</p>
        </ul>
      </div>

      <div class="margin-top-2">
        <div class="d-flex justify-content-between">
          <div>【在线卡充值】正在使用此模板的小区</div>
          <div class="d-flex justify-content-between align-items-center">
            <span class="text-size-sm text-success" @click="showAreaList(tempData.id, 2)">添加小区</span>
          </div>
        </div>
        <ul class="margin-top-2 d-flex flex-wrap">
          <li class="margin-right-2 margin-bottom-1" v-for="item in tempData.resultonline" :key="item.id">
            <van-tag size="medium" type="success" plain>
              {{item.name}}
            </van-tag>
          </li>
          <p class="text-p text-size-sm" v-if="tempData.resultonline.length <= 0">暂无小区使用此模板</p>
        </ul>
      </div>

      <div class="margin-top-2" v-if="tempData.merid === 0">
        <div class="text-666">温馨提示</div>
        <ul class="text-p text-size-sm">
          <li class="padding-y-1">
            <p>1、当前模板为【系统默认模板】,不能修改模板中的内容</p>
          </li>
          <li class="padding-y-1">
            <p>2、如您名下有【未绑定在小区】的【用户】或【在线卡】，则将默认使用此模板</p>
          </li>
          <li class="padding-y-1">
            <p>3、如想要给【用户】或【在线卡】定制充值模板，则首先将【用户】或【在线卡】绑定到小区，然后在自定义充值模板中添加对应的小区即可</p>
          </li>
        </ul>
      </div>

      <div class="text-center">
        <van-button
          type="primary"
          size="small"
          class="w-75 margin-top-2"
          :to="`/chargemanage/charge/${tempData.id}`"
        >管理模板</van-button>
      </div>
    </div>

    <!-- 添加小区 -->
    <van-popup v-model="showAreaPicker" round position="bottom">
        <van-picker
            title="请选择小区列表"
            show-toolbar
            :columns="areaList"
            @confirm="onConfirmArea"
            @cancel="showAreaPicker = false"
        />
    </van-popup>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { getUnusedAreaInfo, updateAreaTopUp } from '@/require/charge-manage'
import { alert, toast } from '@/assets/js/vant-helper'
export default {
  props: {
    tempData: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, context) {
    const showAreaPicker = ref(false)
    const areaList = ref([])
    const onConfirmArea = ({ text, value, tempid, type }) => {
      updateAreaTopUp({
        tempid,
        type,
        list: JSON.stringify([value])
      })
      .then(res => {
        if (res.code === 200) {
          showAreaPicker.value = false
          alert('设置成功')
          .then(() => {
            context.emit('reload')
          })
        } else {
          toast(res.message)
        }
      })
      .catch(() => {
          alert('异常错误')
      })
    }
    const showAreaList = (tempid, type) => {
      getUnusedAreaInfo({
        tempid, type
      })
      .then(res => {
        if (res.code === 200) {
          if (res.resultNoArea.length <= 0) return toast('暂无小区可以使用此模板')
          areaList.value = res.resultNoArea.map(item => ({
            text: item.name,
            value: item.id,
            tempid,
            type
          }))
          showAreaPicker.value = true
        } else {
          toast(res.message)
        }
      })
      .catch(() => {
          alert('异常错误')
      })
    }
    return {
      showAreaPicker,
      areaList,
      onConfirmArea,
      showAreaList
    }
  }
}
</script>

<style lang="scss">
.template-list {
    &>li {
      width: 30%;
      height: 38px;
      line-height: 38px;
      margin-left: 5%;
      box-sizing: border-box;
      margin-bottom: 10px;
      &:nth-of-type(3n - 2) {
        margin-left: 0;
      }
    }
  }
</style>

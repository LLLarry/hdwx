<template>
  <div>
    <van-button @click="exportExcel">导出</van-button>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
// 中英文对照表
const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}
export default {
   data () {
    return {
      list: [
          {
            username: '张三',
            mobile: 123456789,
            role: [1, 2],
            openTime: 123456789
          },
          {
            username: '汇总',
            mobile: 123456789,
            role: [1, 2],
            openTime: 123456789
          },
          {
            username: '汇总',
            mobile: 123456789,
            role: [1, 2],
            openTime: 123456789
          }
      ],
      headers: ['姓名', '联系方式', '角色', '开通时间'],
      merges: [{ s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }]
    }
  },
  methods: {
    async exportExcel () {
        // 获取列表数据
      // const { list } = await userAllList()
      // 异步导入Export2Excel通用组件
      const { export_json_to_excel: exportJsonToExcel } = await import('@/utils/Export2Excel')
      exportJsonToExcel({
        header: Object.keys(USER_RELATIONS), // 设置表头
        data: this.formatJson(USER_RELATIONS, this.list), // 设置表内容
        filename: 'fileNmae.value' // 设置文件名
      })
    },
    formatJson (headers, rows) {
      return rows.map(row => {
        const list = []
        Object.entries(headers).map(([key, value]) => {
          if (value === 'role') {
            const roleSting = JSON.stringify(row[value].map(item => item.title))
            list.push(roleSting)
          } else {
            list.push(row[value])
          }
        })
        return list
      })
    }
  }
}
</script>

<style>

</style>

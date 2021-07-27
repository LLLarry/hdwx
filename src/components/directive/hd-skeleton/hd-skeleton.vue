<template>
    <van-skeleton v-bind="exec" v-if="type === 1"/>
    <van-empty :description="description" :image="image" v-else-if="image"  />
    <van-empty :description="description" v-else  />
</template>

<script>
export default {
    data () {
        return {
            image: '',
            description: '暂无数据',
            exec: {
                title: true,
                row: 3
            }
        }
    }
}
</script>

<template>
    <div class="hd-line bg-gray" :style="getStyle"></div>
</template>

<script>
import { getType } from '@/utils/util'
export default {
    props: {
        height: {
            type: [Number, String],
            default: 15 // default 10px
        }
    },
    computed: {
        getStyle () {
            const height = getType(this.height) === 'number' ? `${this.height}px` : this.height
            return { ...this.$attrs, height }
        }
    }
}
</script>

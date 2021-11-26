<template>
    <draggable
        v-model="myArray"
        chosenClass="chosen"
        :forceFallback="true"
        :disabled="disabled"
        :delay="300"
        group="people"
        :animation="0"
        @end="onEnd"
    >
        <transition-group name="slot">
            <slot  />
        </transition-group>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    props: ['list', 'from', 'disabled'],
    // 注册draggable组件
    components: {
        draggable
    },
    data () {
        return {
                drag: false,
                // 定义要被拖拽对象的数组
                myArray: []
        }
    },
    watch: {
        list: {
            handler (value) {
                if (Array.isArray(value)) {
                    this.myArray = value
                } else {
                    this.myArray = []
                }
            },
            immediate: true
        }
    },
    methods: {
        onEnd (options) {
            this.$emit('sortList', { from: this.from, list: this.myArray })
        }
    }
}
</script>

<style scoped>
        /*被拖拽对象的样式*/
        /* .item {
            padding: 6px;
            background-color: #fdfdfd;
            border: solid 1px #eee;
            margin-bottom: 10px;
            cursor: move;
        } */
        /*选中样式*/
        .chosen {
            border: solid 1px #3089dc !important;
        }
</style>

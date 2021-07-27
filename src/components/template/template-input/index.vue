<template>
<div class="template-input d-inline-flex align-items-center padding-y-2 w-100 position-relative">
    <div v-if="title" :style="titleStyle" class="text-p">{{title}}</div>
    <div v-else><slot name="default" /></div>
    <slot name="input">
        <input v-bind="$attrs" :style="inputStyle" class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"/>
    </slot>
    <span class="margin-left-1" v-if="unit">{{unit}}</span>
    <slot name="exec" />
</div>
</template>

<script>
    export default {
        props: {
            title: { // 标题
                type: String
            },
            unit: { // 单位
                type: String
            },
            inputStyle: {
                // eslint-disable-next-line vue/require-prop-type-constructor
                type: String | Object,
                default: ''
            },
            titleStyle: {
                // eslint-disable-next-line vue/require-prop-type-constructor
                type: String | Object,
                default: ''
            }
        }
    }
</script>

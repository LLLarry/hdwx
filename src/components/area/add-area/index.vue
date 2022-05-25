<template>
    <div v-if="addAreaIsShow">
        <van-dialog
            v-model="addAreaIsShow"
            title="新增小区"
            class="add-area"
            :show-cancel-button="true"
            cancel-button-text="取消"
            confirm-button-text="立即新增"
            confirm-button-color="#07c160"
            @confirm="confirm"
            @cancel="cancel"
            :before-close="areaBeforeClose"
        >
            <div class="margin-top-2">
                <div class="title margin-x-3 text-size-md margin-top-2">请填写小区名称</div>
                <van-search v-model="name" left-icon="" placeholder="请填写小区名称" />
                <p class="text-danger padding-x-3 text-size-md">{{ tipMessage.name }}</p>
                <div class="title margin-x-3 text-size-md margin-top-2">请选择小区地址</div>
                <van-search v-model="area" left-icon="" right-icon="arrow" readonly placeholder="请选择小区地址" @click="areaIsShow=true" />
                <p class="text-danger padding-x-3 text-size-md">{{ tipMessage.area }}</p>
                <div class="title margin-x-3 text-size-md margin-top-2">请填写小区详细地址</div>
                <van-field
                    v-model="address"
                    rows="2"
                    autosize
                    class="bg-gray margin-x-3 margin-top-2"
                    style="width: auto;"
                    type="textarea"
                    maxlength="50"
                    placeholder="请填写小区详细地址"
                    show-word-limit
                />
                <p class="text-danger padding-x-3 text-size-md">{{ tipMessage.address }}</p>
            </div>
        </van-dialog>
        <hd-area :isShow="areaIsShow" @cancel="areaIsShow=false" @confirm="confirmAreaAddress" />
    </div>
</template>

<script>
    import hdArea from '@/components/hd-area'
    export default {
        props: {
            addAreaIsShow: {
                type: Boolean,
                default: false
            }
            // areaBeforeClose: {
            //     type: Function,
            //     default: () => {}
            // }
        },
        data () {
            return {
                name: '',
                area: '',
                address: '',
                areaIsShow: false,
                selectAreaObj: {},
                rules: {
                    name: { required: true, message: '请输入小区名称' },
                    area: { required: true, message: '请选择小区地址' },
                    address: { required: true, message: '请输入小区详细地址' }
                },
                loading: false,
                tipMessage: {}
            }
        },
        components: {
            hdArea
        },
        methods: {
            confirmAreaAddress ({ area, selectAreaObj, selectId }) {
                this.area = area
                this.selectAreaObj = selectAreaObj
                this.areaIsShow = false
            },
            areaBeforeClose (action, done) {
                if (action === 'confirm') {
                    if (!this.loading) {
                        done(false)
                    }
                }
            },
            cancel () {
                this.$parent.addAreaIsShow = false
            },
            confirm () {
                if (!this.name) {
                    this.tipMessage = { name: '请输入小区名称' }
                    this.loading = false
                    return
                }
                if (!this.selectAreaObj || Object.keys(this.selectAreaObj).length === 0) {
                    this.tipMessage = { area: '请选择小区地址' }
                    this.loading = false
                    return
                }
                if (!this.address) {
                    this.tipMessage = { address: '请输入小区详细地址' }
                    this.loading = false
                    return
                }
                this.loading = true
                this.tipMessage = {}
                this.$emit('confirm', {
                    name: this.name,
                    selectAreaObj: this.selectAreaObj,
                    address: this.address,
                    type: 'add'
                })
            }
        }
    }
</script>

<style lang="scss">
.add-area {
    .hd-title {
        div {
            &:nth-child(1) {
                font-size: 14px !important;
            }
        }
    }
}
</style>

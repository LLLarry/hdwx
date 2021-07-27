<template>
    <div class="position-relative">
        <div class="qrcode padding-1" :ref="`qrcode-warpper-${qrcode.key}`">
          <div class="qr_c">
              <qrcode
                v-bind="qrcode"
              />
          </div>
          <h3 v-if="qrcode.title" class="desc text-center text-size-default text-000 font-weight-bold">{{qrcode.title}}</h3>
        </div>
        <div class="qrcode-img position-absolute" style="left: 0; top: 0;" :ref="`img-${qrcode.key}`">
            <img :src="src" :style="imgStyle" v-if="src">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
          qrcode: {
              type: Object,
              default: () => ({
                  value: '', // 二维码路径
                  background: '#FFFFFF', // 二维码背景色
                  size: 220, // 二维码大小
                  key: new Date().getTime() // 二维码唯一标识
              })
          }
        },
        data () {
            return {
                imgStyle: {},
                src: ''
            }
        },
        mounted () {
            import(/* webpackChunkName: "html2canvas" */ 'html2canvas').then((res) => {
                this.createImage(res.default)
            })
        },
        // watch: {
        //     qrcode: {
        //         handler (newVal) {
        //             console.log('newVal', newVal)
        //         },
        //         immediate: true,
        //         deep: true
        //     }
        // },
        methods: {
            createImage (html2canvas) {
                const dom = this.$refs[`qrcode-warpper-${this.qrcode.key}`]
                html2canvas(dom, {
                    logging: false,
                    width: dom.clientWidth,
                    height: dom.clientHeight,
                    scrollY: 0,
                    scrollX: 0,
                    useCORS: true // 【重要】开启跨域配置
                }).then((canvas) => {
                    var bigData = canvas.toDataURL('imgae/png')
                    this.src = bigData
                    this.imgStyle = {
                        width: `${dom.offsetWidth}px`
                    }
                })
            }
        }
    }
</script>

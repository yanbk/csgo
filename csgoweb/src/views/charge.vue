<template>
    <div class="charge-container">
        <div class="pay-wrap flex-row-center">
            <div v-for="(item, index) in products" :key="index" :class="'item flex-row-center ' + (productId == item.product_id ? 'selected' : '')" @click="select(item)">
                <div class="price">${{ item.gold }}</div>
                <div class="bonus">
                    <div class="text">额外赠送</div>
                    <span>${{ item.give_gold }}</span>
                </div>
            </div>
        </div>
        <div class="input-wrap flex-row-start">
            <input v-model="userinfo.from_promo_code" type="text" :disabled="userinfo.from_promo_code ? true : false" placeholder="输入推广代码" value="" class="use-now-input">
            <div class="flex-row-between" style="flex: 1">
                <div class="bonus">+{{ this.product.gold ? this.product.gold * 0.03 : 0 }}优惠</div>
                <div class="btn-use-now" :style="userinfo.from_promo_code ? 'display: none' : ''" @click="bindPromoCode">使用</div>
            </div>
        </div>
        <div class="btn-wrap" @click="getOrder">
            <span class="text">立即充值</span>
        </div>
        <div v-if="isPay" class="pop">
            <div class="charge-wrap">
                <div class="close" @click="close"><svg-icon icon-class="CloseCircle"></svg-icon></div>
                <div v-if="!order.orderid" class="flex-row-center" style="height: 200px">
                    <svg-icon icon-class="loading" style="font-size: 50px"></svg-icon>
                </div>
                <div v-else class="flex-row-between">
                    <div v-for="(item, index) in order.pay_list" :key="index">
                        <img class="pay-title" :src="item.id == 59 ? '@/assets/img/icon_zfb.jpg' : '@/assets/img/icon_wx.jpg'" alt="">
                        <img :src="item.pay_url" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getConfig,
    getOrder,
    payFinished
} from '@/api/pay'
import {
    bindPromoCode
} from '@/api/user'
export default {
    name: 'Charge',
    data() {
        return {
            products: [],
            product: {},
            productId: '',
            order: {},
            isPay: false,
            timer: null,
            from_promo_code: ''
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.user.userinfo
        }
    },
    mounted() {
        this.getConfig()
    },
    methods: {
        getConfig() {
            getConfig({ pay_type: 101 }).then(res => {
                console.log(res)
                if (res.errno == 0) {
                    this.products = res.data
                } else {
                    console.log(res.message)
                }
            })
        },
        select(item) {
            this.product = item
            this.productId = item.product_id
        },
        getOrder() {
            this.isPay = true
            getOrder({ pay_type: 101, product_id: this.product.product_id }).then(res => {
                console.log(res)
                if (res.errno == 0) {
                    this.order = res.data
                } else {
                    console.log(res.message)
                }
            })

            this.timer = setInterval(()  => {
                if (this.order.orderid) {
                    payFinished({ orderid: this.order.orderid }).then(res => {
                        console.log(res)
                    })
                }
            }, 2000)
        },
        close() {
            this.isPay = false
            clearInterval(this.timer)
            this.timer = null
        },
        bindPromoCode() {
            bindPromoCode({ from_promo_code: this.from_promo_code }).then(res => {
                console.log(res)
                if (res.errno == 0) {
                    this.$message({
                        type: 'success',
                        message: '使用成功'
                    })
                    this.$store.dispatch('user/getInfo')
                } else {
                    this.$message({
                        type: 'error',
                        message: res.errmsg
                    })
                }
            })
        }
    },
}
</script>

<style scoped>
.charge-container{
    height: 800px;
    overflow: hidden;
    background: #191919;
}
.pay-wrap{
    width: 1000px;
    margin: 20px auto;
}
.pay-wrap .item{
    width: 134px;
    height: 90px;
    background-color: #121212;
    border: 1px solid #403f3f;
    text-align: center;
    margin: 0 10px;
    cursor: pointer;
}
.pay-amount-wrap .item.selected{
    background-color: #262319;
    border: 1px solid #ffd43e;
}
.pay-wrap .item .price{
    width: 76px;
    line-height: 88px;
    background-color: #1e1e1e;
    font-size: 20px;
    color: #fecf43;
}
.pay-wrap .item.selected .price{
    background-color: #ffd43e;
    color: #191919;
}
.pay-wrap .item .bonus{
    font-family: FZLTTHK--GBK1-0;
    font-size: 12px;
    line-height: 26px;
    color: #d62f27;
}
.pay-wrap .item .text{
    font-size: 14px;
    line-height: 18px;
    color: #858585;
    padding: 0 15px;
    margin-top: 15px;
    margin-bottom: 5px;
}
.pay-wrap .item.selected .text{
    color: #ffd43e;
}
.input-wrap{
    width: 500px;
    background-color: #121212;
    height: 40px;
    line-height: 40px;
    position: relative;
    margin: 30px auto;
    text-align: center;
}
.input-wrap input{
    width: 390px;
    height: 40px;
    background-color: #121212;
    border: none;
    text-indent: 20px;
    font-size: 18px;
    color: #6b6b6b;
    outline: medium;
}
.input-wrap .bonus{
    width: 70px;
    font-size: 12px;
    color: #d62f27;
    margin-right: 10px;
}
.input-wrap .btn-use-now{
    font-size: 14px;
    color: #191919;
    width: 54px;
    height: 40px;
    background-color: #cd2d26;
    cursor: pointer;
}
.btn-wrap{
    width: 186px;
    height: 40px;
    line-height: 40px;
    background: url(~@/assets/img/case-open-yellow.png) no-repeat 50%;
    font-size: 20px;
    color: #171717;
    text-indent: 80px;
    margin: 40px auto;
    cursor: pointer;
}
.charge-wrap{
    width: 500px;
    min-height: 300px;
    position: absolute;
    padding: 30px;
    border-radius: 5px;
    background: #fff;
    left: 50%;
    margin-left: -280px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0;
}
.charge-wrap img{
    width: 210px;
}
.charge-wrap img.pay-title{
    width: 130px;
    height: 50px;
    margin-left: 40px;
    margin-bottom: 15px;
}
.close{
    width: 30px;
    height: 30px;
    position: absolute;
    right: -30px;
    top: 0;
    font-size: 30px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    /* background: firebrick; */
    cursor: pointer;
}
</style>

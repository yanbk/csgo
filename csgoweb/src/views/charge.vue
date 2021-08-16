<template>
    <div class="charge-container">
        <div class="pay-wrap flex-row-center">
            <div v-for="(item, index) in products" :key="index" :class="'item flex-row-center ' + (productId == item.product_id ? 'selected' : '')" @click="select(item)">
                <div class="price">${{ item.price }}</div>
                <div class="bonus">
                    <div class="text">额外赠送</div>
                    <span>$0.15</span>
                </div>
            </div>
        </div>
        <div class="input-wrap flex-row-start">
            <input type="text" placeholder="输入推广代码" value="" class="use-now-input">
            <div class="flex-row-between" style="flex: 1">
                <div class="bonus">+0优惠</div>
                <div class="btn-use-now">使用</div>
            </div>
        </div>
        <div class="btn-wrap" @click="getOrder">
            <span class="text">立即充值</span>
        </div>
        <div v-if="isPay" class="pop">
            <div class="charge-wrap flex-row-between">
                <div class="close" @click="close"><svg-icon icon-class="CloseCircle"></svg-icon></div>
                <div v-for="(item, index) in order.pay_list" :key="index">
                    <img class="pay-title" :src="item.logo" alt="">
                    <img :src="item.pay_url" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getConfig,
    getOrder
} from '@/api/pay'
export default {
    name: 'Charge',
    data() {
        return {
            products: [],
            product: {},
            productId: '',
            order: {},
            isPay: false
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

                }
            })
        },
        close() {
            this.isPay = false
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

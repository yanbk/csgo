<template>
    <div class="contact-container">
        <div class="promo-code-wrap flex-row-between">
            <div class="item flex-row-center">
                <span>推广链接</span>
                <input v-model="url" type="url" disabled="disabled" class="link-input">
                <div class="btn-copy">复制</div>
            </div>
            <div class="item flex-row-center">
                <span>推广码</span>
                <input v-model="promo_code" type="text" class="code-input">
                <div class="btn-change" @click="promoCodeChange">更换推广码</div>
            </div>
        </div>
        <div class="partner-info">
            <div class="item flex-col-center">
                <div class="heading">级别</div>
                <div class="content">{{ userinfo.grade }}</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">被引荐者存款</div>
                <div class="content">${{ userinfo.promo_amount }}</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">您的百分比</div>
                <div class="content">{{ userinfo.rate }}%</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">您的收入</div>
                <div class="content">${{ userinfo.all_wallet }}</div>
            </div>
            <!-- <div class="item flex-col-center">
                <div class="heading">被引荐者收入</div>
                <div class="content">$0.00</div>
            </div> -->
            <div class="item flex-col-center">
                <div class="heading">您的会员余额</div>
                <div class="content">${{ userinfo.wallet }}</div>
            </div>
        </div>
        <div class="title-wrap">推广级别</div>
        <div class="rank-table">
            <div class="thead flex-row-center">
                <div class="th">级别</div>
                <div class="th">本级需要</div>
                <div class="th">收入百分比</div>
                <div class="th">邀请玩家收益比</div>
            </div>
            <div class="tbody">
                <div v-for="(item, index) in rebate" :key="index" class="tr flex-row-center">
                    <div class="td">{{ item.grade }}</div>
                    <div class="td">${{ item.money_limit }}</div>
                    <div class="td">{{ (item.rate * 100).toFixed(2) }}%</div>
                    <div class="td">3%</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    promoCode,
    rebate
} from '@/api/user'
export default {
    name: 'Contact',
    data() {
        return{
            url: '',
            promo_code: '',
            rebate: ''
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.user.userinfo
        }
    },
    watch: {
        userinfo: {
            handler(val){
                this.promo_code = val.promo_code
                this.url = window.location.hostname + '/#/' + val.promo_code
                return val
            },
            deep:true
        }
    },
    mounted() {
        this.promo_code = this.userinfo.promo_code
        // setTimeout(function() {
        //     window.opener.location.reload(false)
        //     window.close()
        //     window.open(" ","_self").close()
        // }, 2000)
        // console.log(window.location.hostname)
        this.url = window.location.hostname + '/#/' + (this.userinfo.promo_code ? this.userinfo.promo_code : '')
        // console.log(this.url)

        rebate().then(res => {
            if (res.errno == 0) {
                this.rebate = res.data
            } else {
                this.$message({
                    type: 'error',
                    message: res.errmsg
                })
            }
        })
    },
    methods: {
        promoCodeChange() {
            if (this.promo_code.length >= 2 || this.promo_code <=8) {
                promoCode({ promo_code: this.promo_code }).then(res => {
                    console.log(res)
                    if (res.errno == 0) {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        })
                        this.$store.dispatch('user/getInfo')
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.errmsg
                        })
                    }
                })
            } else {
                this.$message({
                    type: 'error',
                    message: '推广码长度为2～8位'
                })
            }
        }
    },
}
</script>
<style scoped>
.contact-container{
    overflow: hidden;
    background: #191919;
    padding: 0 50px;
}
.partner-info{
    width: 100%;
    height: 92px;
    background-color: #131313;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 35px;
    padding-bottom: 10px;
}
.partner-info .item{
    flex-basis: auto;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    min-width: 100px;
    text-align: center;
}
.partner-info .item .heading{
    color: #c3c3c3;
    font-size: 16px;
    padding: 24px 0 10px;
}
.partner-info .item .content{
    color: #fff;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
}
.rank-table{
    width: 100%;
    /* max-width: 1120px; */
    border-left: 4px solid #ffd43e;
    padding-left: 4px;
    margin: 0 auto 40px;
}
.rank-table .th{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 46px;
    line-height: 46px;
    background-color: #ffd43e;
    font-size: 18px;
    color: #131313;
    text-align: center;
}
.rank-table .td{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 60px;
    line-height: 60px;
    background-color: #131313;
    font-size: 18px;
    color: #e1d7c7;
    text-align: center;
}
.rank-table .td img{
    vertical-align: middle;
}
.title-wrap{
    line-height: 60px;
    background-color: #161616;
    font-size: 22px;
    color: #c4c0c0;
    margin-top: 30px;
    margin-bottom: 30px;
    display: block;
    text-align: center;
}
.promo-code-wrap{
    margin-top: 20px;
}
.promo-code-wrap .item{
    height: 36px;
}
.promo-code-wrap .item:first-child {
    width: 576px;
}
.promo-code-wrap .item span{
    min-width: 90px;
    height: 36px;
    line-height: 36px;
    background-color: #ffd23c;
    text-align: center;
    font-size: 16px;
    color: #111413;
}
.promo-code-wrap .item input{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 34px;
    text-indent: 20px;
    font-size: 16px;
    color: #9a9795;
    background-color: #141414;
    border: 1px solid #ffd23c;
    outline: medium;
    color: #999;
    border-right: 0;
}
.promo-code-wrap .item .btn-copy, .promo-code-wrap .item .btn-change{
    background-color: #252218;
    height: 34px;
    padding: 0 15px;
    font-size: 14px;
    color: #ffd43e;
    border: 1px solid #ffd23c;
    border-left: 0;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
}
</style>
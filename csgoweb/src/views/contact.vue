<template>
    <div class="contact-container">
        <div class="promo-code-wrap flex-row-between">
            <div class="item flex-row-center">
                <span>推广链接</span>
                <input type="url" disabled="disabled" class="link-input" value="1234567890">
                <div class="btn-copy">复制</div>
            </div>
            <div class="item flex-row-center">
                <span>推广码</span>
                <input type="text" class="code-input" value="123">
                <div class="btn-change">更换推广码</div>
            </div>
        </div>
        <div class="partner-info">
            <div class="item flex-col-center">
                <div class="heading">级别</div>
                <div class="content">1</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">被引荐者</div>
                <div class="content">0</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">被引荐者存款</div>
                <div class="content">$0</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">您的百分比</div>
                <div class="content">4%</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">您的收入</div>
                <div class="content">$0</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">被引荐者收入</div>
                <div class="content">$0.00</div>
            </div>
            <div class="item flex-col-center">
                <div class="heading">您的会员余额</div>
                <div class="content">$0.00</div>
            </div>
        </div>
        <div class="title-wrap">推广级别</div>
        <div class="rank-table">
            <div class="thead flex-row-center">
                <div class="th">级别</div>
                <div class="th">下一级需要</div>
                <div class="th">您的百分比</div>
                <div class="th">推广玩家收益比</div>
            </div>
            <div class="tbody">
                <div class="tr flex-row-center">
                    <div class="td"><img src="@/assets/img/level1.png"></div>
                    <div class="td">$0</div>
                    <div class="td">4%</div>
                    <div class="td">3%</div>
                </div>
                <div class="tr flex-row-center">
                    <div class="td"><img src="@/assets/img/level2.png"></div>
                    <div class="td">$2000</div>
                    <div class="td">5%</div>
                    <div class="td">3%</div>
                </div>
                <div class="tr flex-row-center">
                    <div class="td"><img src="@/assets/img/level3.png"></div>
                    <div class="td">$5000</div>
                    <div class="td">6%</div>
                    <div class="td">3%</div>
                </div>
                <div class="tr flex-row-center">
                    <div class="td"><img src="@/assets/img/level4.png"></div>
                    <div class="td">$8000</div>
                    <div class="td">7%</div>
                    <div class="td">3%</div>
                </div>
                <div class="tr flex-row-center">
                    <div class="td"><img src="@/assets/img/level5.png"></div>
                    <div class="td">$12000</div>
                    <div class="td">8%</div>
                    <div class="td">3%</div>
                </div>
                <div class="tr flex-row-center">
                    <div class="td"><img src="@/assets/img/level6.png"></div>
                    <div class="td">$15000</div>
                    <div class="td">10%</div>
                    <div class="td">3%</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Contact',
    data() {
        return{

        }
    },
    mounted() {
        // setTimeout(function() {
        //     window.opener.location.reload(false)
        //     window.close()
        //     window.open(" ","_self").close()
        // }, 2000)
    },
    methods: {
        
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
}
</style>
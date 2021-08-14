<template>
    <div class="bag-container">
        <div class="profile-wrap flex-row-center">
            <div class="left-wrap fle-row-center">
                <img src="@/assets/img/face.jpg" alt="">
                <div class="photo">
                    <svg-icon icon-class="camera"></svg-icon>
                    <input id="upfile" type="file">
                </div>
            </div>
            <div class="right-wrap">
                <div class="mail-wrap flex-row-between">
                    <div class="flex-row-center">
                        <img src="@/assets/img/VIP0.png" class="vip-level">
                        <div class="name">33bt</div>
                        <svg-icon icon-class="edit" style="font-size: 14px; cursor: pointer" @click="isEditName = true"></svg-icon>
                    </div>
                    <div class="mail flex-row-center">
                        <svg-icon icon-class="phone" style="font-size: 18px"></svg-icon>
                        <span>(请绑定手机号)</span>
                    </div>
                </div>
                <div class="trade-url-wrap">
                    <div class="input-wrap flex-row-center">
                        <input type="text">
                        <div class="btn">保存</div>
                    </div>
                    <div class="get-url-wrap">
                        <div class="flex-row-start">
                            <svg-icon icon-class="warning" style="font-size: 20px; color: #ffd43e"></svg-icon>
                            <span>开箱前请验证您的交易邀请网址工作正常，您的库存设为“公开”。</span>
                        </div>
                        <a href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank" class="find-trade-url">查看您的交易邀请网址</a>
                    </div>
                </div>
                <div class="charge-wrap flex-row-between">
                    <div class="money-wrap flex-row-center">
                        <div class="fund">$0.00</div>
                        <router-link to="/charge" class="charge">
                            <span>充值余额</span>
                        </router-link >
                    </div>
                    <div class="second-pwd-wrap flex-row-center">
                        <div class="set">设置二级密码</div>
                        <div class="forget">忘记二级密码</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isEditName" class="pop">
            <div class="modal-wrap">
                <div class="close" @click="isEditName = false"><svg-icon icon-class="CloseCircle"/></div>
                <div class="title">
                    <div class="tab">编辑昵称</div>
                </div>
                <div class="modal-input-wrap flex-row-center">
                    <svg-icon icon-class="edit" style="font-size: 16px; color: #676767"></svg-icon><input type="text" placeholder="请输入昵称">
                </div>
                <div class="flex-row-start" style="margin-top: 20px">
                    <span class="confirm">确认</span>
                    <span class="cancel">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Bag',
    data() {
        return{
            isEditName: false
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>
<style scoped>
.bag-container{
    background: #191919;
    overflow: hidden;
    height: 800px;
    padding-top: 15px;
}
.left-wrap{
    width: 186px;
    height: 186px;
    background-color: #161616;
    margin-right: 10px;
    position: relative;
}
.left-wrap img{
    width: 100%;
}
.photo{
    width: 40px;
    height: 40px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 50px;
}
.photo .svg-icon{
    padding: 0;
    margin: 0;
    vertical-align: 0;
}
.photo input{
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    cursor: pointer;
}
.right-wrap{
    width: 740px;
    height: 186px;
    background-color: #161616;
    padding: 8px 30px 16px;
}
.profile-wrap .mail-wrap .vip-level{
    width: 84px;
    margin-right: 12px;
}
.profile-wrap .mail-wrap .name{
    font-size: 18px;
    line-height: 26px;
    color: #b6b6b6;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 10px;
}
.profile-wrap .mail-wrap .mail{
    font-size: 16px;
    line-height: 26px;
    color: #ffd23c;
}
.trade-url-wrap{
    margin-top: 15px;
}
.input-wrap input{
    flex: 1;
    height: 36px;
    border: 1px solid #ffd43e;
    border-right: 0;
    background: #121212;
    text-indent: 15px;
    font-size: 18px;
    color: #6b6b6b;
    outline: medium;
    margin-left: 10p;
}
.input-wrap .btn{
    width: 80px;
    height: 36px;
    background-color: #262319;
    font-size: 16px;
    color: #ffd43e;
    border: 1px solid #ffd43e;
    border-left: 0;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
}
.trade-url-wrap .get-url-wrap{
    font-size: 14px;
    color: #d9d9d9;
    margin-top: 5px;
}
.trade-url-wrap .get-url-wrap .find-trade-url{
    line-height: 18px;
    color: #ffd43e;
    text-decoration: none;
}
.charge-wrap{
    margin-top: 10px;
}
.charge-wrap .money-wrap{
    width: 230px;
    line-height: 36px;
    border: 1px solid #ffd43e;
    text-align: center;
}
.charge-wrap .money-wrap .fund{
    font-size: 18px;
    color: #131313;
    background-color: #ffd43e;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    font-weight: bold;
}
.charge-wrap .money-wrap .charge{
    cursor: pointer;
    font-size: 18px;
    color: #ffd43e;
    padding: 0 8px;
}
.charge-wrap .second-pwd-wrap{
    width: 328px;
    line-height: 36px;
    background-color: #121212;
    border: 1px solid #ffd43e;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
}
.charge-wrap .second-pwd-wrap .set{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background-color: #ffd23c;
    color: #121413;
}
.charge-wrap .second-pwd-wrap .forget{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #ffd23c;
}
.modal-wrap{
    width: 600px;
    background-color: #0d0d0d;
    text-align: center;
    padding: 20px 50px 22px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
.modal-wrap .title{
    height: 36px;
    border-bottom: 4px solid #ffd43e;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.modal-wrap .title .tab{
    display: block;
    width: 134px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #ffd43e;
    font-size: 18px;
    color: #0e0e0e;
}
.modal-input-wrap{
    background-color: #1e1e1e;
    padding: 5px 15px;
    margin-top: 20px;
}
.modal-input-wrap input{
    flex: 1;
    height: 40px;
    border: none;
    background: none;
    text-indent: 20px;
    font-size: 18px;
    color: #c6c6c6;
    border-radius: 5px;
    outline: medium;
}
.confirm{
    display: block;
    width: 148px;
    height: 42px;
    background: url(~@/assets/img/case-open-yellow.png) no-repeat;
    background-size: 100%;
    font-size: 20px;
    line-height: 42px;
    color: #171717;
    padding-left: 30px;
    cursor: pointer;
}
.cancel{
    display: block;
    width: 142px;
    height: 40px;
    line-height: 40px;
    background-color: #262319;
    border: 1px solid #ffd43e;
    font-size: 16px;
    color: #ffd43e;
    cursor: pointer;
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
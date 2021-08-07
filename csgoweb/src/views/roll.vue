<template>
    <div style="background: #1a1a1a; overflow: hidden">
        <div class="warning-word"><svg-icon icon-class="warning" style="font-size: 20px; color: #ffd43e"/>本网站所有游戏均为为增加趣味性所设的休闲娱乐活动，请勿沉迷，理性消费；禁止利用互动活动进行赌博/欺诈/作弊/刷积分等违法违规行为。若有发现，我们将取消您的活动参与资格。</div>
        <div class="case-title">珍藏</div>
        <div class="box-cont-title">箱子内容</div>
        <div class="box-cont">
            <div class="drop-list">
                <div class="img-wrap">
                    <img src="@/assets/img/milspec.jpg" class="item-bg">
                    <img class="item-pic" src="@/assets/img/gan.webp" alt="">
                    <div class="desc">
                        <div class="desc-bg"></div>
                        <div class="item-name">
                            <div class="weapon-type">
                            R8 左轮手枪 
                            </div>
                            <div class="weapon-name">
                            |  渐变之色 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="drop-list">
                <div class="img-wrap">
                    <img src="@/assets/img/milspec.jpg" class="item-bg">
                    <img class="item-pic" src="@/assets/img/gan.webp" alt="">
                    <div class="desc">
                        <div class="desc-bg"></div>
                        <div class="item-name">
                            <div class="weapon-type">
                            R8 左轮手枪 
                            </div>
                            <div class="weapon-name">
                            |  渐变之色 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Roll',
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
    .warning-word{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #7b7b7b;
        line-height: 24px;
        margin-top: 20px;
    }
    .case-title{
        font-size: 18px;
        line-height: 26px;
        color: #fff;
        padding-left: 10px;
        margin-top: 20px;
    }
    .box-cont-title{
        font-size: 16px;
        line-height: 40px;
        color: #c4c0c0;
        text-align: center;
    }
    .box-cont{
        overflow: hidden;
    }
    .drop-list{
        width: 166px;
        height: 166px;
        margin-right: 10px;
        margin-bottom: 20px;
        background-color: #1b1b1b;
        border-style: solid;
        border-width: 1px;
        border-image-source: linear-gradient( 0deg ,#282727,#191919);
        border-image-slice: 1;
        position: relative;
        overflow: hidden;
        -webkit-transition: all .5s ease;
        transition: all .5s ease;
        box-sizing: border-box;
        float: left;
    }
    .item-bg{
        width: 100%;
    }
    .item-pic{
        position: absolute;
        max-width: 90%;
        max-height: 86px;
        vertical-align: bottom;
        opacity: 1;
        z-index: 2;
        left: 50%;
        top: 35%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .desc{
        position: absolute;
        width: 100%;
        height: 43px;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #4b69ff;
        box-sizing: border-box;
    }
    .desc-bg{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #4b69ff;
        opacity: .2;
    }
    .item-name{
        font-size: 12px;
        color: #fff;
        line-height: 16px;
        text-align: center;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        padding: 0 12px;
    }
    .weapon-type {
        color: #5e98d9;
    }
    
</style>
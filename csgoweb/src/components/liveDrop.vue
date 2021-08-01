<template >
    <div class="live-drop">
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
            <div class="mask">
                <img class="mask-bg" src="@/assets/img/maskbg.webp" alt="">
                <div class="mask-wrap">
                    <img src="@/assets/img/face.jpg" class="face-img">
                    <span data-v-654deaf5="">章鱼哥代开的神</span>
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
            <div class="mask">
                <img class="mask-bg" src="@/assets/img/maskbg.webp" alt="">
                <div class="mask-wrap">
                    <img src="@/assets/img/face.jpg" class="face-img">
                    <span data-v-654deaf5="">章鱼哥代开的神</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LiveDrop',
    data() {
        return{

        }
    }
}
</script>
<style scoped>
    .live-drop{
        display: flex;
        background: #1a1a1a;
    }
    .drop-list{
        width: 166px;
        height: 166px;
        margin-left: 1px;
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
    .mask{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(14,16,19,.5);
        font-size: 1.3em;
        opacity: 0;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        z-index: 9;
    }
    .face-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-bottom: 15px;
    }
    .mask-wrap{
        position: absolute;
        width: 100%;
        left: 0;
        top: 45%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        color: #dbdee4;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .mask-wrap span{
        display: block;
        max-width: 100%;
        padding: 0 10px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
    .mask-bg{
        width: 100%;
        opacity: 0.3;
    }
    .drop-list:hover .mask{
        opacity: 1;
    }
    .drop-list:hover .item-bg{
        opacity: 0;
    }
    .drop-list:hover .item-pic{
        opacity: 0;
    }
</style>
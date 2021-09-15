<template>
    <div :class="'drop-list ' + (isMask ? 'drop-list-hover' : '')">
        <div v-if="isPrice" class="price">${{ dropInfo.price }}</div>
        <div v-if="isHot" class="hot">热门</div>
        <div class="img-wrap">
            <img src="@/assets/img/milspec.jpg" class="item-bg">
            <img class="item-pic" :src="(dropInfo.item_img || dropInfo.img)" alt="">
            <div class="desc">
                <div class="desc-bg"></div>
                <div v-if="isName" class="item-name">
                    <div class="weapon-type">
                    {{ setName().split('|')[0] }}
                    </div>
                    <div class="weapon-name">
                    |  {{ setName().split('|')[1] }} 
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isMask" class="mask">
            <div :class="isName ? 'mask-height' : ''">
                <img class="mask-bg" src="@/assets/img/maskbg.webp" alt="">
                <div class="mask-wrap">
                    <img :src="dropInfo.avatar" class="face-img">
                    <span>{{ dropInfo.nickname }}</span>
                    <div v-if="!isName" class="item-name">
                        <div class="weapon-type">
                        {{ setName().split('|')[0] }}
                        </div>
                        <div class="weapon-name">
                        |  {{ setName().split('|')[1] }} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isSell" class="sell-mask">
            <div class="sell" @click="sellItem">卖出</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dropInfo: {
            type: Object,
            default: function() {}
        },
        isMask: {
            type: Boolean,
            default: false
        },
        isPrice: {
            type: Boolean,
            default: false
        },
        isHot: {
            type: Boolean,
            default: false
        },
        isName: {
            type: Boolean,
            default: false
        },
        isSell: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        // console.log(this.dropInfo)
    },
    methods: {
        sellItem() {
            this.$emit('sellItem', this.dropInfo)
        },
        setName() {
            let name = ''
            if (this.dropInfo.name) {
                name = this.dropInfo.name
            } else if (this.dropInfo.item_name) {
                name = this.dropInfo.item_name
            }
            return name
        }
    }
}
</script>

<style scoped>
    .drop-list{
        width: 166px;
        /* height: 166px; */
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
    .price{
        position: absolute;
        font-size: 12px;
        color: #ffd43e;
        left: 10px;
        top: 100px;
    }
    .hot{
        font-size: 14px;
        line-height: 22px;
        color: #f62121;
        border: 1px solid #fc2727;
        width: 44px;
        text-align: center;
        -webkit-transform: rotate(-30deg);
        transform: rotate(-30deg);
        position: absolute;
        right: 10px;
        bottom: 58px;
        z-index: 20;
    }
    .item-bg{
        display: block;
        width: 100%;
        height: 124px;
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
        /* position: absolute; */
        width: 100%;
        height: 43px;
        /* bottom: 0; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #4b69ff;
        box-sizing: border-box;
        position: relative;
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
    .mask-wrap .item-name{
        position: static;
        top: 0;
        transform: translateY(0);
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
    .mask-height{
        height: 123px;
        position: relative;
    }
    .face-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-bottom: 15px;
    }
    .mask-wrap .face-img{
        margin-bottom: 0;
    }
    .mask-wrap{
        position: absolute;
        width: 100%;
        height: 124px;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .drop-list-hover:hover .mask{
        opacity: 1;
    }
    .drop-list-hover:hover .item-bg{
        opacity: 0;
    }
    .drop-list-hover:hover .item-pic{
        opacity: 0;
    }
    .sell-mask{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 20;
        opacity: 0;
        transition: all 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .sell-mask:hover{
        opacity: 1;
    }
    .sell{
        font-size: 16px;
        padding: 8px 20px;
        color: #fff;
        background: #333;
        border-radius: 3px;
    }
</style>

<template>
    <div class="roll-detail">
        <div class="room-info flex-row-between">
            <img src="@/assets/img/roll-detail-bg-left-red.png" alt="">
            <img src="@/assets/img/roll-detail-bg-right-red.png" alt="">
            <div class="room-info-wrap">
                <div class="flex-row-between" style="margin-bottom: 10px;">
                    <div class="status flex-row-start">
                        <svg-icon icon-class="shijian" style="font-size: 16px"></svg-icon><span>进行中...</span>
                    </div>
                    <div class="room-endtime">
                        <div>开奖时间：2021-09-01 </div>
                        <div class="time">18:00:00</div>
                    </div>
                </div>
                <div class="flex-row-between">
                    <div class="left-wrap flex-row-center">
                        <div class="img-wrap">
                            <img src="@/assets/img/169f5426c4d388dcc6a069c08b64bdf368cf2b07.webp">
                        </div>
                        <div class="info-wrap">
                            <div class="room-title">SKSKINS 8月高级福利</div>
                            <div class="room-desc">SKSKINS 高级福利活动开启时间：8月2日，活动期间每增加$50，增加一个参与序数，记得充值后点击更新按钮</div>
                        </div>
                    </div>
                    <div class="right-wrap">
                        <div class="flex-row-start" style="width: 250px">
                            <div class="item-desc flex-row-center">
                                <div class="head">人数: </div>
                                <div>62</div>
                            </div>
                            <div class="item-desc flex-row-center">
                                <div class="head">件数: </div>
                                <div>32</div>
                            </div>
                            <div class="item-desc flex-row-center">
                                <div class="head">价值: </div>
                                <div class="val">$6552.98</div>
                            </div>
                        </div>
                        <div class="join-btn flex-row-center">
                            <span class="text">立即加入</span>
                            <span class="price">参与序数: 0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="warning-wrap flex-row-center">
            <svg-icon icon-class="warning" style="font-size: 18px; color: #ffd43e" />
            <span>参与序数：在ROLL活动进行期间内，每达成一次充值额度，增加一次参与序数，增加ROLL中概率</span>
        </div>
        <div class="title-wrap">活动奖池</div>
        <div class="roll-items-wrap">
            <Drop :is-mask="false" />
            <Drop :is-mask="false" />
            <Drop :is-mask="false" />
        </div>
    </div>
</template>

<script>
import Drop from '@/components/drop.vue'
export default {
    name: 'RollDetail',
    components: {
        Drop
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.roll-detail{
    background: #1a1a1a;
    overflow: hidden;
}
.room-info{
    margin-top: 20px;
    position: relative;
}
.room-info > img{
    height: 150px;
}
.room-info-wrap{
    width: 100%;
    position: absolute;
    top: 12px;
}
.room-info-wrap .status{
    width: 412px;
    height: 28px;
    /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAAAcCAYAAABVhglVAAABCklEQVR4nO3VO5bDIBAEQNb385H3YI7YaJ2YQSPpuaOqzHw0gIX65/U7nqM23z1zM2ptXpx3pWq31seIWc8pe+bcVuo8sRrz2b6vVT1rNeu4Zr2+/e/9vuq59+qdm/PfVq38aO3HNev56332zqp/tuu19fe77uv9R3fPrre+43e6X+Pqu1e1r+9p95537/B+fL/+u7/4/vW/TyfHPZoPAIBbBA4AEQIHgAiBA0CEwAEgQuAAECFwAIgQOABECBwAIgQOABECB4AIgQNAhMABIELgABAhcACIEDgARAgcACIEDgARAgeACIEDQITAASBC4AAQIXAAiBA4AEQIHAAiBA4AEQIHgO8bY/wBIZBp01Hc4K8AAAAASUVORK5CYII=) no-repeat 50%;
    color: #ffd43e; */
    color: #fe222c;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAAAcCAYAAABVhglVAAABb0lEQVR4nO3VQXLDIAwFUPAlcqperhcm08ZpAQvbi1ar9xaZYGQscDK/fj4eH2VXSyu9Wn4v1FLmuddnHee6722+L15j/l778WGNxX2vurqu20fhfmrrq34GZ/3vc3PXcS+rfoO51l+9eQYtmOvWb3vxFtV16w/vfq4dJsf1h8qLXva16mE/h+dNZzs/vwTnshi3/r59sI3j+n7m5e//bDz8im70OD5sVV+jZ9eo/qrX+Uxu7GXrdtSWv4Hvszv+9+b9Be94umO89uq1jeNoP9Eeoh7mfX/tr+5nfNZnsHRZvdvVtfPaelg8OL9+jbv1416u31Fw3/j/Dpa51d/btpoAgL8kcABIIXAASCFwAEghcABIIXAASCFwAEghcABIIXAASCFwAEghcABIIXAASCFwAEghcABIIXAASCFwAEghcABIIXAASCFwAEghcABIIXAASCFwAEghcABIIXAASCFwAEghcABIIXAA+H+llCfmQVlrQSjX4wAAAABJRU5ErkJggg==) no-repeat 50%;
    font-size: 16px;
    padding-left: 10px;
}
.room-endtime{
    font-size: 16px;
    line-height: 18px;
    color: #fff;
    width: 188px;
    height: 28px;
    text-align: right;
    padding-right: 28px;
}
.room-endtime .time{
    color: #ff2832;
}
.warning-wrap{
    width: 100%;
    font-size: 15px;
    color: #8e6d6d;
    background-color: #190f0e;
    padding: 10px 0;
}
.left-wrap .img-wrap img{
    display: block;
    width: 76px;
    height: 76px;
}
.left-wrap  .info-wrap{
    margin-left: 16px;
}
.left-wrap .info-wrap .room-title{
    font-size: 18px;
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    max-width: 230px;
}
.left-wrap .info-wrap  .room-desc{
    font-size: 16px;
    line-height: 18px;
    margin-top: 10px;
    color: #908f8f;
    max-width: 260px;
    word-wrap: break-word;
}
.right-wrap .item-desc{
    font-size: 15px;
    color: #fff;
    margin-right: 15px;
    margin-bottom: 15px;
}
.right-wrap .item-desc .head{
    color: #c02e35;
}
.join-btn .text{
    width: 146px;
    height: 34px;
    background: url(~@/assets/img/btn-146-red.png) 100%;
    font-size: 18px;
    color: #191919;
    line-height: 34px;
    text-indent: 54px;
}
.join-btn .price{
    display: block;
    width: 125px;
    height: 32px;
    /* border: 1px solid #ffd43e; */
    line-height: 30px;
    font-size: 18px;
    /* color: #ffd43e; */
    /* background-color: #2e210b; */
    background-color: #410e0c;
    border: 1px solid #fe222c;
    color: #fe222c;
    text-align: center;
}
.title-wrap{
    height: 47px;
    line-height: 47px;
    text-align: center;
    background-color: #161616;
    color: #c4c0c0;
    font-size: 16px;
    margin: 10px 0 30px;
}
.roll-items-wrap{
    /* display: flex;
    flex-wrap: wrap; */
}
.roll-items-wrap .drop-list{
    float: left;
    margin-right: 10px;
    margin-bottom: 15px;
}
</style>

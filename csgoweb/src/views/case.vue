<template>
    <div class="caseContainer" style="background: #1a1a1a; overflow: hidden">
        <div class="warning-word"><svg-icon icon-class="warning" style="font-size: 20px; color: #ffd43e"/>本网站所有游戏均为为增加趣味性所设的休闲娱乐活动，请勿沉迷，理性消费；禁止利用互动活动进行赌博/欺诈/作弊/刷积分等违法违规行为。若有发现，我们将取消您的活动参与资格。</div>
        <div class="case-title">
            <span>{{ boxinfo.title }}</span>
            <div class="flex-row-center">
                <span class="open-num-title">选择开箱数: </span>
                <div :class="'item ' + (num == 1 ? 'selected' : '')" @click="openNumCase(1)">1</div>
                <div :class="'item ' + (num == 5 ? 'selected' : '')" @click="openNumCase(5)">5</div>
                <div :class="'item ' + (num == 10 ? 'selected' : '')" @click="openNumCase(10)">10</div>
            </div>
        </div>
        <div class="case-open-wrap">
            <img src="@/assets/img/600fd8a39b76c.webp" class="case-pic">
            <img src="@/assets/img/case-detail-tri-bg.png" class="case-pic-tri">
        </div>
        <div v-if="!userinfo.uid" class="login-tip flex-row-center"><svg-icon icon-class="warning" style="font-size: 20px; color: #ffd43e"/>登录网站后购买武器箱!</div>
        <div v-if="userinfo.uid" class="btn-open">
            <span class="text" @click="openCase">打开箱子</span>
            <span class="price">${{ (boxinfo.price * this.num).toFixed(2) }}</span>
        </div>
        <div v-else class="btn-open" style="width: 148px" @click="login">
            <span class="text" style="text-indent: 80px; width: 148px">登录</span>
        </div>
        <div class="live-drop">
            <div class="live-title" style="">最<br/>近<br/>箱<br/>子<br/>掉<br/>落</div>
            <div class="drop-wrap">
                <Drop v-for="(item, index) in dropList" :key="index" :dropInfo="item" :is-mask="true" :is-name="false" />
                <!-- <div class="item covert">
                    <div class="img-wrap">
                        <img src="@/assets/img/hand.png" class="drop-pic">
                        <img src="@/assets/img/covert.png" class="case-pic">
                    </div>
                    <div class="mask">
                        <img src="@/assets/img/bg1.png" class="mask-pic">
                        <div class="wrap">
                            <img src="@/assets/img/face.jpg" class="face-img">
                            <span>LeBron ZHAO</span>
                            <div class="desc">
                                <div class="desc-bg"></div>
                                <div class="item-name">
                                    <div class="weapon-type">裹手（★）</div>
                                    <div class="weapon-name">|  套印 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="box-cont-title">箱子内容</div>
        <div class="box-cont">
            <Drop v-for="(item, index) in boxinfo.item_list" :key="index" :dropInfo="item" :is-name="true" />
        </div>
        <el-dialog
            :visible.sync="runningDialog"
            width="1000px"
        >
            <div class="running-list flex-row-center">
                <div v-for="(item, index) in boxRunning.prize" :key="item.user_item_id" class="list">
                    <div class="item">
                        <img src="@/assets/img/gan.webp" alt="">
                        <div class="running-desc">
                            <span>{{ item.price }}</span>
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                    <div class="sell-btn flex-row-center" :style="item.disabled ? 'opacity: 0.7' : ''" @click="sellItem(item.user_item_id, index, item.disabled)">出售<svg-icon icon-class="gold" style="font-size: 12px"></svg-icon>{{ item.price }}</div>
                </div>
            </div>
            <div class="flex-row-center" style="margin: 40px">
                <div class="again" @click="again">再试一次</div>
                <div class="sell-all flex-row-center" :style="totalBtn ? 'opacity: 0.7' : ''" @click="sellAll">出售<svg-icon icon-class="gold" style="font-size: 12px"></svg-icon>{{ totalPrice }}</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import bg1 from '@/assets/img/bg1.png'
import Drop from '@/components/drop.vue'
import {
    boxInfo,
    boxRunning,
    dropList,
    boxSell
} from '@/api/box'
export default {
    name: 'Case',
    components: {
        Drop
    },
    data() {
        return{
            bg1,
            num: 1,
            boxinfo: {},
            dropList: [],
            boxRunning: {},
            runningDialog: false,
            totalPrice: 0,
            totalBtn: false
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.user.userinfo
        }
    },
    mounted() {
        // console.log(this.$route)
        boxInfo({ bid: this.$route.params.id }).then(res => {
            console.log(res)
            if (res.errno == 0) {
                this.boxinfo = res.data
            } else {
                this.$message({
                    type: 'error',
                    message: res.errmsg
                })
            }
        })
        dropList({ game_type: 101 }).then(res => {
            console.log(res)
            if (res.errno == 0) {
                this.dropList = res.data
            } else {
                this.$message({
                    type: 'error',
                    message: res.errmsg
                })
            }
        })
    },
    methods: {
        openNumCase(num) {
            this.num = num
        },
        login() {
            this.$store.commit('admin/loginShow', true)
        },
        openCase() {
            console.log(this.userinfo)
            if (this.userinfo.amount && this.userinfo.amount < this.boxinfo.price * this.num) {
                this.$router.push({
                    path: '/charge'
                })
            } else {
                if (this.userinfo.steamid) {
                    this.runningDialog = true
                    this.again()
                } else {
                    window.open('//passport.csgogo.net/steam/login?uid=' + this.userinfo.uid, '', 'width=600,height=600')
                }
            }
        },
        again() {
            boxRunning({ bid: this.boxinfo.id, num: this.num }).then(res => {
                console.log(res)
                if (res.errno == 0) {
                    this.totalBtn = false
                    this.boxRunning = res.data
                    this.totalPrice = 0
                    res.data.prize.map(item => {
                        this.totalPrice += item.price
                    })
                    this.totalPrice = this.totalPrice.toFixed(2)
                    this.$store.dispatch('user/getInfo')
                } else {
                    this.$message({
                        type: 'error',
                        message: res.errmsg
                    })
                }
            })
        },
        sellAll() {
            if (this.totalBtn) return
            this.totalBtn = true
            boxSell({ cost_orderid: this.boxRunning.cost_orderid }).then(res => {
                console.log(res)
                if (res.errno == 0) {
                    for (let i = 0; i < this.boxRunning.prize.length; i++) {
                        this.$set(this.boxRunning.prize[i], 'disabled', true)
                    }
                    this.$message({
                        type: 'success',
                        message: '售卖成功'
                    })
                    this.$store.dispatch('user/getInfo')
                } else {
                    this.totalBtn = false
                    this.$message({
                        type: 'error',
                        message: res.errmsg
                    })
                }
            })
        },
        sellItem(id, index, disabled) {
            console.log(id)
            if (disabled) {
                return
            }
            this.totalBtn = true
            this.$set(this.boxRunning.prize[index], 'disabled', true)
            boxSell({ user_item_id: id }).then(res => {
                console.log(res)
                if (res.errno == 0) {
                    this.$message({
                        type: 'success',
                        message: '售卖成功'
                    })
                    this.$store.dispatch('user/getInfo')
                } else {
                    this.totalBtn = false
                    this.$set(this.boxRunning.prize[index], 'disabled', false)
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
    }
    .case-title .open-num-title{
        font-size: 18px;
        line-height: 26px;
        color: #ababab;
    }
    .case-title .item{
        width: 24px;
        height: 24px;
        border: 1px solid #464646;
        font-size: 14px;
        line-height: 22px;
        color: #464646;
        cursor: pointer;
        margin-left: 8px;
        text-align: center;
        line-height: 24px;
    }
    .item.selected{
        background-color: #ffd800;
        color: #161616;
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
    .live-drop{
        height: 126px;
        overflow: hidden;
        margin-top: 30px;
        display: flex;
    }
    .live-title{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 6px;
        height: 126px;
        background-color: #ffd43e;
        font-size: 14px;
        color: #131313;
        text-align: center;
        line-height: 16px;
        float: left;
    }
    .drop-wrap{
        margin-left: 1px;
        display: flex;
        flex: 1;
    }
    .drop-wrap .item{
        width: 162px;
        height: 110px;
        margin-left: 1px;
        background-color: #1b1b1b;
        border-style: solid;
        border-width: 1px;
        border-image-source: linear-gradient(0deg,#282727,#191919);
        border-image-slice: 1;
        position: relative;
        overflow: hidden;
        -webkit-transition: all .5s ease;
        transition: all .5s ease;
    }
    .img-wrap{
        height: 100%;
        position: relative;
    }
    .mask-pic{
        position: relative;
        left: 50%;
        top: 50%;
        -webkit-transform: translate3d(-50%,-50%,0);
        transform: translate3d(-50%,-50%,0);
        max-width: 96%;
        max-height: 92px;
        z-index: 5;
        transition: all .3s;
    }
    .case-pic{
        width: 100%;
        height: 100%;
        position: relative;
        left: 50%;
        top: 50%;
        -webkit-transform: translate3d(-50%,-50%,0);
        transform: translate3d(-50%,-50%,0);
        z-index: 5;
        transition: all .3s;
    }
    .drop-pic{
        position: absolute;
        left: 50%;
        top: 50%;
        max-width: 90%;
        max-height: 86px;
        vertical-align: bottom;
        opacity: 1;
        z-index: 7;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .drop-wrap .item:hover .img-wrap{
        opacity: 0;
    }
    .drop-wrap .item:hover .mask{
        opacity: 1;
    }
    .drop-wrap .item .mask{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(7,7,7,.68);
        font-size: 1.3em;
        opacity: 0;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        z-index: 9;
    }
    .mask-pic{
        opacity: 0.3;
    }
    .drop-wrap .item .mask .wrap{
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
        z-index: 10;
    }
    .drop-wrap .item .mask .face-img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-bottom: 2px;
    }
    .drop-wrap .item .mask .wrap span{
        display: block;
        max-width: 100%;
        padding: 0 10px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #f6f6f6;
        font-size: 12px;
    }
    .drop-wrap .item .desc{
        width: 100%;
        height: 43px;
        z-index: 3;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        position: relative;
    }
    .drop-wrap .item .desc .item-name{
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
    .case-open-wrap{
        width: 330px;
        height: 248px;
        margin: 15px auto;
        position: relative;
    }
    .case-open-wrap .case-pic-tri{
        width: 100%;
    }
    .case-open-wrap .case-pic{
        width: 240px;
        height: 160px;
        line-height: 200px;
        position: absolute;
        left: 50%;
        top: 38%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%)
    }
    .btn-open{
        width: 258px;
        height: 42px;
        position: relative;
        background: none;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: 0 auto;
        padding: 0;
    }
    .btn-open .text{
        display: block;
        width: 148px;
        height: 42px;
        background: url(~@/assets/img/case-open-yellow.png) no-repeat top;
        font-size: 20px;
        line-height: 42px;
        color: #171717;
        text-indent: 52px;
        cursor: pointer;
    }
    .btn-open  .price{
        display: block;
        width: 110px;
        font-size: 20px;
        color: #ffd43e;
        background-color: #262319;
        border: 1px solid #ffd43e;
        line-height: 40px;
        text-align: center;
    }
    .login-tip{
        color: #c4c0c0;
        font-size: 18px;
        text-align: center;
        margin-bottom: 10px;
    }
    .box-cont .drop-list{
        float: left;
        margin-right: 10px;
        margin-bottom: 15px;
    }
    /* .running-list{
        display: inline-block;
        margin: 0 auto;
        flex-wrap: nowrap;
    } */
    .running-list .list{
        width: 180px;
        height: 240px;
    }
    .running-list .list .item{
        width: 100%;
        height: 180px;
        background: #323852;
        position: relative;
    }
    .running-list .list img{
        position: absolute;
        width: 80%;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .sell-btn{
        width: 130px;
        height: 40px;
        background: #171717;
        border-radius: 4px;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        margin: 20px auto 0;
    }
    .again{
        width: 150px;
        height: 44px;
        font-size: 20px;
        color: #fff;
        background: #13864d;
        text-align: center;
        line-height: 44px;
        border-radius: 4px;
        cursor: pointer;
    }
    .sell-all{
        width: 150px;
        height: 44px;
        margin-left: 50px;
        background: #171717;
        color: #fff;
        font-size: 20px;
        border-radius: 4px;
        cursor: pointer;
    }
    .caseContainer /deep/ .el-dialog{
        /* background: rgba(0,0,0,.9); */
    }
    .running-desc{
        width: 100%;
        position: absolute;
        bottom: 10px;
        font-size: 12px;
        color: #2de288;
        font-weight: bold;
        text-align: center;
    }
    .running-desc p{
        font-weight: normal;
        padding: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #aaa;
    }
</style>
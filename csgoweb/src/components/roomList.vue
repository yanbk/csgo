<template>
    <div class="room-container">
        <div class="top-wrap">
            <div class="flex-row-between">
                <div class="flex-row-center">
                    <div class="img-wrap">
                        <img :src="roomData.avatar">
                    </div>
                    <div class="info-wrap">
                        <div class="room-desc">{{ roomData.description }}</div>
                    </div>
                </div>
                <div class="room-endtime">
                    <div>开奖时间：{{ roomData.lottery_time.split(' ')[0] }} </div>
                    <div class="time">{{ roomData.lottery_time.split(' ')[1] }}</div>
                </div>
            </div>
            <div class="item-wrap flex-row-between">
                <div class="flex-row-center">
                    <div class="item-other">
                        <div class="head">人数: </div>
                        <div>{{ roomData.member_number }}</div>
                    </div>
                    <div class="item-other">
                        <div class="head">件数: </div>
                        <div>{{ roomData.itemnum }}</div>
                    </div>
                    <div class="item-other">
                        <div class="head">价值: </div>
                        <div class="val">${{ roomData.itemamount }}</div>
                    </div>
                </div>
                <router-link :to="'/roll/detail/' + roomData.id" class="join-btn" @click="join">立即加入</router-link>
            </div>
        </div>
        <div class="bot-wrap">
            <Drop v-for="(item, index) in roomData.item_list" :key="index" :dropInfo="item" :is-name="true"/>
        </div>
    </div>
</template>

<script>
import Drop from './drop.vue'
export default {
    name: 'RoomList',
    components: {
        Drop
    },
    props: {
        roomData: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.roomData)
    },
    methods: {
        join() {

        }
    }
}
</script>

<style scoped>
.room-container{
    width: 445px;
}
.top-wrap{
    height: 106px;
    background: url(~@/assets/img/roll-list-bg-red.png) 100%;
    padding: 6px 0 0 6px;
}
.top-wrap .img-wrap{
    width: 55px;
    height: 55px;
    margin-right: 10px;
}
.top-wrap .img-wrap img{
    display: block;
    width: 100%;
}
.top-wrap .room-desc{
    font-size: 12px;
    line-height: 16px;
    color: #ffcaca;
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
.top-wrap .room-endtime{
    width: 150px;
    line-height: 18px;
    text-align: right;
    padding-right: 6px;
    font-size: 12px;
    color: #ffcaca;
    position: relative;
    margin-top: 2px;
}
.item-wrap{
    margin-top: 8px;
}
.item-wrap .item-other{
    height: 100%;
    margin-right: 35px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    font-size: 14px;
    color: #fff;
}
.item-wrap .item-other .head{
    width: 40px;
    color: #780b0b;
}
.item-wrap .join-btn{
    width: 146px;
    height: 34px;
    line-height: 34px;
    font-size: 18px;
    color: #2c0d00;
    background: url(~@/assets/img/btn-146-red.png) no-repeat 50%;
    border: none;
    text-align: center;
    padding-left: 20px;
    margin-right: 6px;
}
.bot-wrap{
    width: 100%;
    overflow: hidden;
    background: #250303;
}
.bot-wrap .drop-list{
    width: 143px;
    float: left;
    margin-left: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>

<template>
    <div class="roll-container">
        <div class="tab-wrap">
            <div :class="'room ' + (room == 1 ? 'active' : '')" @click="roomChange(1)">进行中</div>
            <div :class="'room ' + (room == 2 ? 'active' : '')"  @click="roomChange(2)">已结束</div>
            <div :class="'room ' + (room == 3 ? 'active' : '')"  @click="roomChange(3)">我参与的</div>
        </div>
        <div class="list-title"><img src="@/assets/img/roll-list-title-official.png"></div>
        <RoomList />
        <div class="list-title"><img src="@/assets/img/roll-list-title-anchor.png"></div>
    </div>
</template>
<script>
import RoomList from '@/components/roomList'
export default {
    name: 'Roll',
    components: {
        RoomList
    },
    data() {
        return{
            room: 1
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
        roomChange(num) {
            this.room = num
        }
    },
}
</script>
<style scoped>
.roll-container{
    background-color: #141414;
}
.tab-wrap{
    display: flex;
    border-bottom: 4px solid #ffd43e;
    margin-bottom: 15px;
    background: #1a1a1a;
    padding-top: 30px;
}
.tab-wrap .room{
    width: 88px;
    height: 36px;
    font-size: 16px;
    color: #6b6b6b;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    margin-right: 8px;
}
.tab-wrap .room.active{
    background-color: #ffd43e;
    font-size: 18px;
    color: #0e0e0e;
}
</style>
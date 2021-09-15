<template>
    <div class="roll-list">
        <router-link to="/roll" class="item promotion">
            <div class="img-wrap">
                <img src="@/assets/img/dao.webp" class="weapon-pic">
            </div>
            <div class="info-wrap">
                <div class="countdown-wrap">
                    <div class="outer-wrap">
                        <div class="countdown">
                            <span>{{ time.day[0] }}</span>
                            <span>{{ time.day[1] }}</span>
                        </div>
                        <div class="time">天</div>
                    </div>
                    <div class="outer-wrap">
                        <div class="countdown">
                            <span>{{ time.hour[0] }}</span>
                            <span>{{ time.hour[1] }}</span>
                        </div>
                        <div class="time">时</div>
                    </div>
                    <div class="outer-wrap">
                        <div class="countdown">
                            <span>{{ time.min[0] }}</span>
                            <span>{{ time.min[1] }}</span>
                        </div>
                        <div class="time">分</div>
                    </div>
                </div>
                <div class="room-wrap">
                    <div class="room-title">{{ roomInfo.rollname }}</div>
                    <div class="flex-row-start">
                        <img :src="roomInfo.avatar" class="room-pic">
                        <div class="room-desc">{{ roomInfo.description }}</div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import rollBgRed from '@/assets/img/index-roll-bg-red.png'
export default {
    name: 'RollList',
    props: {
        roomInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            rollBgRed,
            time: {
                day: '',
                hour: '',
                min: ''
            },
            timer: null
        }
    },
    mounted() {
        this.showTime()
        if (this.roomInfo.remain_time && this.roomInfo.remain_time >= 0) {
            this.timer = setInterval(() => {
                this.showTime()
                this.roomInfo.remain_time -= 60
                if (this.roomInfo.remain_time < 0) {
                    clearInterval(this.timer)
                    this.timer = null
                }
            }, 60000)   
        }
        
        
    },
    methods: {
        showTime() {
            let day = Math.floor(this.roomInfo.remain_time / 3600 / 24)
            let hour = Math.floor((this.roomInfo.remain_time - day * 3600 * 24) / 3600)
            let min = Math.floor(this.roomInfo.remain_time / 60) % 60
            this.time.day = day >= 10 ? day + '' : '0' + day
            this.time.hour = hour >= 10 ? hour + '' : '0' + hour
            this.time.min = min >= 10 ? min + '' : '0' + min
            console.log(this.time)
        }
    },
    destroyed() {
        // clearInterval(this.timer)
        // this.timer = null
    }
}
</script>
<style scoped>
.roll-list{
    /* margin-left: 40px; */
    /* height: 200px; */
    flex-grow: 1;
}
.item{
    -webkit-transform: scale(.9);
    transform: scale(.9);
    display: flex;
    align-items: center;
    /* max-width: 100%; */
    width: 500px;
    height: 179px;
    background: url(~@/assets/img/index-roll-bg-red.png) no-repeat;
    background-size: auto 100%;
}
.weapon-pic{
    width: 245px;
}
.countdown-wrap{
    display: flex;
    margin-bottom: 30px;
}
.outer-wrap{
    display: flex;
    font-size: 16px;
    color: #fff;
    align-items: center;
}
.time{
    padding: 0 5px;
}
.countdown{
    width: 54px;
    height: 32px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAgAgMAAAAkpGPIAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAADFBMVEUAAAAhISE1NTV9WgAaixYwAAAAAXRSTlMAQObYZgAAAChJREFUGNNjCAWDACjFMBS58SAqPgBKoXPXrwKC9QugFDoXv96hHzgAtt2dgS10fWIAAAAASUVORK5CYII=');
    background-size: auto 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.room-wrap{
    margin-bottom: 10px;
}
.room-pic{
    width: 50px;
    height: 50px;
    margin-right: 5px;
}
.room-title{
    font-size: 18px;
    line-height: 28px;
    color: #fff;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.room-desc{
    font-size: 14px;
    color: #ffe9c3;
    line-height: 16px;
    height: 32px;
    max-width: 150px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

</style>
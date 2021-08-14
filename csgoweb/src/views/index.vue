<template>
    <div style="background: #1a1a1a">
        <div style="width: 100%; overflow: hidden; display: flex; padding: 20px 0"><RollList v-for="item in 3" :key="item" /></div>
        <div class="hotbox">
            <div class="hot-title">
                <img :src="hotTitle" alt="">
                <span class="title">热门箱子</span>
            </div>
            <div class="box">
                <div class="box-list">
                    <router-link v-for="item in list.hot" :key="item.id" :to="'/case/' + item.id" class="item-wrap">
                        <div class="case-pic">
                            <img src="@/assets/img/600fd8a39b76c.webp">
                        </div>
                        <img src="@/assets/img/600fd8b97edc0.webp" class="item-pic">
                        <div class="name">{{ item.title }}</div>
                        <div class="price">${{ item.price }}</div>
                        <div class="open-case">
                            <div class="hover-text">开箱</div>
                            <div class="hover-price">${{ item.price }}</div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="hot-title sale-title">
                <img :src="saleTitle" alt="">
                <span class="title">打折箱子</span>
            </div>
            <div class="box" style="background: #1a1a1a">
                <div class="box-list">
                    <router-link v-for="item in list.discount" :key="item.id" :to="'/case/' + item.id" class="item-wrap">
                        <div class="case-pic">
                            <img src="@/assets/img/600fd8a39b76c.webp">
                        </div>
                        <img src="@/assets/img/600fd8b97edc0.webp" class="item-pic">
                        <div class="name" style="color: #ec342e">{{ item.title }}<span class="original-price">原价${{ item.original_price }}</span></div>
                        <div class="price" style="color: #ec342e">${{ item.price }}</div>
                        <div class="open-case">
                            <div class="hover-text">开箱</div>
                            <div class="hover-price">${{ item.price }}</div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import hotTitle from '@/assets/img/index-case-hot-title.webp'
import saleTitle from '@/assets/img/index-case-onsale-title.webp'
import RollList from '@/components/rollList.vue'
import {
    boxList
} from '@/api/box'
export default {
    data() {
        return {
            hotTitle,
            saleTitle,
            list: {}
        }
    },
    components: {
        RollList
    },
    created() {
        boxList().then(res => {
            console.log(res)
            if (res.errno == 0) {
                this.$store.commit('admin/showMessage', {
                    show: true,
                    type: 'success',
                    message: '成功'
                })
                this.list = res.data.list
            }
        })
    },
    methods: {
        open() {
            var myWindow = window.open('http://192.168.1.7:8082/#/roll', '', 'width=500,height=500')
            myWindow.focus()
        }
    },
}
</script>

<style scoped>
.hotbox{
    background: #1a1a1a;
}
.hot-title{
    height: 89px;
    position: relative;
    z-index: 5;
}
.hot-title img{
    height: 100%;
}
.title{
    line-height: 40px;
    position: absolute;
    z-index: 2;
    padding-left: 14px;
    font-size: 18px;
    color: #fff;
    left: 0px;
    top: 22px;
}
.box{
    background: #1b1512;
    margin-top: -70px;
    padding-top: 100px;
}
.box-list{
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
}
.item-wrap{
    display: block;
    width: 250px;
    position: relative;
    margin: 0 30px 50px 0;
}
.case-pic{
    width: 250px;
}
.case-pic img{
    width: 100%;
}
.item-pic{
    width: 250px;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all .2s ease-in-out;
}
.name{
    font-size: 14px;
    line-height: 26px;
    color: #d6d4ce;
    text-align: center;
    position: relative;
    z-index: 2;
    margin-bottom: 10px;
    position: relative;
}
.original-price{
    position: absolute;
    top: 0;
    right: 15px;
    font-size: 12px;
    line-height: 26px;
    color: #959595;
}
.original-price::before{
    display: block;
    content: "";
    position: absolute;
    height: 1px;
    left: -3px;
    right: -3px;
    top: 12px;
    background-color: #fb342e;
}
.open-case{
    display: none;
    width: 186px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 0;
    font-size: 14px;
    color: #ffd43e;
    line-height: 26px;
}
.hover-text{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAYCAYAAAB3JpoiAAAC0klEQVRoge2ZTYhOYRTHf/Oa0chHSNJY+BozJis2mpWiWAwbH4lZWQmRJFEMg4U0pSwplCZWZoxJKB97ERqF2M6QUgYlX6NT506n071v9965C/e991dv97nP87zPPc//PXPuOc/U/RxqGgTmkR2dwBtgB7DTrXoHOG/uFwLXgVbTNytDW/476oERoCMjwwZU7CnAOWC+GfsN7DX3a4EbwJwc65eYCtCf0Voi6FFt73FiC5eAt9o+CNwtmtiChJRG4BMwzfSLeF8TrtUL7AOmA++AuWbsG9AMjKrwnRnZnzskpPwA7gObjPGfNa6PpdjQfie20APIDysxfGXId+Q5dTWs8zgVbQy4fhGsLcV68sI75Po+Ak+BJyFi/wGupXhObqlXw2/r5ieZjUiGcS/GxsQ7H+pVxJ7pxj8AfeZZAV+AbcDJong3GsOD9mNgdYo1bgKb9a/ivXsXRCExfiOwCrg64V3kiIox1YeVOIhXd+u8IzHFfqRCDwNniyQ2TvBbKb4voeKlpoC7Y8y/CKzXl/KxjAuuXGAFl3AwlMBo693HNQuJQt4PB4BdwC9gqWYzhcPGcGEqMDlCBKkK15n7Pk0lF2l12VBFvGFXCA1mWN3mCp85fNdPGAtM35hmF+i1mtjCbNPuKKrYuJBSDflhFpvxfo3dbSFVo1Spz1xfo56vNLjDq8LhPTyKJcaLbezudrm7cFljti9ypCjarvG7sMT1cCuSePcLYAWwxc2TM5MTWtR4lgNdRRabBIK36NV696mQCrFHK8uwg68LwIwJ2FoTJPXwwLvbgQ1uzogKToTgywqs8zhxBW913n0mZE6XyXBGM7SxpkgSUgLvXqMfyyvgirlPepZeCm6Q85EmjdlEePdhzUwCSsEjiCN4s3r3cy1Y2t34A/3HgqUMKRHEEbzFZCSn3dhf9W5P6eERxCl8XmtVuVVzb0tvSFVJ6eERAP8AO86H8ybGB8EAAAAASUVORK5CYII=) no-repeat 50%;
    background-size: contain;
    width: 92px;
    height: 24px;
    font-size: 16px;
    line-height: 26px;
    color: #191919;
    text-indent: 20px;
    float: left;
    text-align: center;
}
.hover-price{
    width: 92px;
    height: 24px;
    line-height: 22px;
    background-color: #262319;
    border: 1px solid #3e3c35;
    float: left;
    text-align: center;
    box-sizing: border-box;
}
.price{
    font-size: 14px;
    line-height: 26px;
    color: #ffd43e;
    text-align: center;
}
.item-wrap:hover .item-pic{
    transform: translateY(-10%);
}
.item-wrap:hover .open-case{
    display: block;
}
.sale-title{
    margin-top: -20px;
}
</style>

<template>
    <div class="header">
        <router-link to="/">
            <div class="navlist"></div>
            <span>开箱</span>
        </router-link>
        <router-link to="/roll">
            <span>Roll福利</span>
        </router-link>
        <router-link to="/contact">
            <span>合作伙伴</span>
        </router-link>
        <router-link to="/bag">
            <span>我的背包</span>
        </router-link>
        <div class="login-btn" @click="login">
            登录 / 注册
        </div>
    </div>
</template>
<script>
export default {
    name: 'navHeader',
    computed: {
        steamId() {
            // console.log(this.$store)
            return this.$store.state.user.steamid
        }
    },
    methods: {
        login() {
            this.$store.commit('admin/loginShow', true)
        }
    },
}
</script>
<style scoped>
    .header{
        height: 90px;
        background-color: #161616;
    }
    .header a{
        display: flex;
        font-size: 16px;
        text-align: center;
        width: 140px;
        height: 90px;
        border-right: 1px solid #212121;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        float: left;
        color: #fff;
    }
    .header a:hover{
        color: #999;
    }
    .login-btn{
        width: 100px;
        font-size: 16px;
        color: #ffd43e;
        text-align: center;
        line-height: 90px;
        float: right;
        cursor: pointer;
    }
    .login-btn:hover{
        background: #999;
        color: #fff;
    }
</style>
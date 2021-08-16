<template>
    <div class="header">
        <router-link to="/">
            <div class="icon flex-row-center">
                <svg-icon icon-class="case"></svg-icon>
            </div>
            <span>开箱</span>
        </router-link>
        <router-link to="/roll">
            <div class="icon flex-row-center">
                <svg-icon icon-class="reward"></svg-icon>
            </div>
            <span>Roll福利</span>
        </router-link>
        <router-link to="/contact">
            <div class="icon flex-row-center">
                <svg-icon icon-class="contact"></svg-icon>
            </div>
            <span>合作伙伴</span>
        </router-link>
        <router-link to="/bag">
            <div class="icon flex-row-center">
                <svg-icon icon-class="bag"></svg-icon>
            </div>
            <span>我的背包</span>
        </router-link>
        <div v-if="!csgoUid" class="login-btn" @click="login">
            登录 / 注册
        </div>
        <div v-else class="login-btn" @click="loginOut">
            {{ userinfo.nickname }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'navHeader',
    computed: {
        userinfo() {
            // console.log(this.$store)
            return this.$store.state.user.userinfo
        },
        csgoUid() {
            return this.$store.state.user.csgoUid
        }
    },
    methods: {
        login() {
            this.$store.commit('admin/loginShow', true)
        },
        test() {
            this.$store.commit('admin/showMessage', {
                type: 'error',
                show: true,
                message: 'hahahhahah'
            })
        },
        loginOut() {
            this.$store.dispatch('user/loginOut')
        }
    },
    created() {
        if (this.csgoUid) {
            this.$store.dispatch('user/getInfo')
        }
    },
}
</script>
<style scoped>
    .header{
        height: 100px;
        background-color: #161616;
    }
    .header a{
        display: flex;
        flex-direction: column;
        font-size: 18px;
        width: 140px;
        height: 100px;
        border-right: 1px solid #212121;
        justify-content: center;
        align-items: center;
        float: left;
        color: #fff;
    }
    .header .svg-icon{
        font-size: 32px;
    }
    .header a:hover{
        color: #999;
        opacity: 0.7;
    }
    .login-btn{
        width: 150px;
        font-size: 16px;
        color: #ffd43e;
        text-align: center;
        line-height: 100px;
        float: right;
        cursor: pointer;
    }
    .login-btn:hover{
        background: #999;
        color: #fff;
    }
    .icon{
        height: 40px;
    }
</style>
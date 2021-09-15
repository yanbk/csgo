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
        <div v-else class="login-btn">
            <el-dropdown trgger="click" @command="dropCommand">
                <span class="el-dropdown-link">
                    {{ userinfo.nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
        loginOut() {
            this.$store.dispatch('user/loginOut')
        },
        dropCommand(e) {
            if (e == 'loginout') {
                this.loginOut()
            }
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
    /* .login-btn:hover{
        background: #999;
        color: #fff;
    } */
    .icon{
        height: 40px;
    }
</style>
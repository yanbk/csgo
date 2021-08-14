<template>
    <div v-if="isPop" class="pop">
        <div class="login">
            <div class="close" @click="close"><svg-icon icon-class="CloseCircle"></svg-icon></div>
            <div class="login-nav flex-row-start">
                <div :class="'nav-list ' + (navIndex == 1 ? 'nav-list-act' : '')" @click="navIndexChange(1)">登录</div>
                <div :class="'nav-list ' + (navIndex == 2 ? 'nav-list-act' : '')" @click="navIndexChange(2)">注册</div>
                <div :class="'nav-list ' + (navIndex == 3 ? 'nav-list-act' : '')" @click="navIndexChange(3)">忘记密码</div>
            </div>
            <div class="input-list flex-row-center">
                <div class="input-list-l">手机号</div>
                <input v-model="mobile" class="input-list-r">
            </div>
            <div v-if="navIndex == 2 || navIndex == 3" class="input-list flex-row-center">
                <div class="input-list-l">验证码</div>
                <input v-model="code" class="input-list-r">
                <div class="getcode" @click="getSms">{{ countText }}</div>
            </div>
            <div class="input-list flex-row-center">
                <div class="input-list-l">密码</div>
                <input v-model="password" type="password" class="input-list-r">
            </div>
            <div v-if="navIndex == 2 || navIndex == 3" class="input-list flex-row-center">
                <div class="input-list-l">二次密码</div>
                <input v-model="password1" type="password" class="input-list-r">
            </div>
            <div v-if="navIndex != 3" class="flex-row-start" style="margin-top: 15px">
                <div :class="'dot ' + (isDot ? 'dot-act' : '')" @click="isDot = !isDot"></div>
                <span style="font-size:14px; color: #c9c7c6; margin-left: 5px">已满18周岁</span>
                <span v-show="!isDot" style="font-size: 12px; color: #d62f27; margin-left: 20px">请勾选确认已满18岁后登录！</span>
            </div>
            <div class="login-btn">
                <div class="login-l" @click="userOpt">{{ navIndex == 1 ? '登录' : navIndex == 2 ? '注册' : '确认修改' }}</div>
                <div v-if="navIndex == 1" class="login-r" @click="steamOpen">STEAM登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getSms,
    editPassword
} from '@/api/user'
// import { formData } from '@/utils/form'
export default {
    data() {
        return {
            isPop: true,
            navIndex: 1,
            mobile: '18721879687',
            code: '',
            password: '',
            password1: '',
            isDot: false,
            countText: '获取验证码',
            countNum: 60,
            isClick: false
        }
    },
    components: {

    },
    methods: {
        navIndexChange(num) {
            this.navIndex = num
            this.mobile = '18721879687'
            this.code = ''
            this.password = ''
            this.password1 = ''
        },
        getSms() {
            if (!this.isClick) {
                this.isClick = true
                this.countDown()
                getSms({ phone_number: this.mobile, type: this.navIndex == 2 ? 'reg' : 'editpasswd' }).then(res => {
                    console.log(res)
                })
            }
        },
        countDown() {
            let _this = this
            this.countText = this.countNum + 's'
            let timer = setInterval(function() {
                _this.countNum -= 1
                if (_this.countNum < 0) {
                    clearInterval(timer)
                    _this.countText = '重新发送'
                    _this.countNum = 60
                    _this.isClick = false
                    return
                }
                _this.countText = _this.countNum + 's'
            }, 1000)
        },
        userOpt() {
            if (this.navIndex == 1) {
                if (this.mobile == '') {
                    alert('请输入手机号')
                    return
                }
                if (this.password == '') {
                    alert('请输入密码')
                    return
                }
                if (!this.isDot) {
                    alert('请确认已满18周岁')
                    return
                }
                let data = {
                    phone_number: this.mobile,
                    password: this.password
                }
                this.$store.dispatch('user/userLogin', data).then(res => {
                    if (res.errno == 0) {
                        this.$store.commit('admin/loginShow', false)
                        this.$store.dispatch('user/getInfo')
                    } else {
                        alert(res.errmsg)
                    }
                })
            } else if (this.navIndex == 2) {
                if (this.mobile == '') {
                    alert('请输入手机号')
                    return
                }
                if (this.code == '') {
                    alert('请输入验证码')
                    return
                }
                if (this.password == '') {
                    alert('请输入密码')
                    return
                }
                if (this.password != this.password1) {
                    alert('两次密码不一致')
                    return
                }
                if (!this.isDot) {
                    alert('请确认已满18周岁')
                    return
                }
                let data = {
                    phone_number: this.mobile,
                    vercode: this.code,
                    password: this.password
                }
                this.$store.dispatch('user/userReg', data).then(res => {
                    if (res.errno == 0) {
                        this.$store.commit('admin/loginShow', false)
                        this.$store.dispatch('user/getInfo')
                    } else {
                        alert(res.errmsg)
                    }
                })
            } else {
                if (this.mobile == '') {
                    alert('请输入手机号')
                    return
                }
                if (this.code == '') {
                    alert('请输入验证码')
                    return
                }
                if (this.password == '') {
                    alert('请输入密码')
                    return
                }
                if (this.password != this.password1) {
                    alert('两次密码不一致')
                    return
                }
                if (!this.isDot) {
                    alert('请确认已满18周岁')
                    return
                }
                editPassword({
                    phone_number: this.mobile,
                    vercode: this.code,
                    password: this.password
                }).then(res => {
                    console.log(res)
                    if (res.errno == 0) {
                        alert('修改成功')
                        this.$store.commit('admin/loginShow', false)
                    } else {
                        alert(res.errmsg)
                    }
                })
            }
        },
        close() {
            this.$store.commit('admin/loginShow', false)
        },
        steamOpen() {
            window.open('//passport.csgogo.net/steam/login', '', 'width=600,height=600')
        }
    }
}
</script>

<style scoped>
.login{
    width: 750px;
    background: #000;
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
.login-nav{
    border-bottom: 3px solid #ffd43e;
    font-size: 0;
}
.nav-list{
    width: 88px;
    height: 32px;
    background: #171717;
    margin-right: 5px;
    font-size: 16px;
    color: #6b6b6b;
    text-align: center;
    line-height: 32px;
    overflow: hidden;
    cursor: pointer;
}
.nav-list-act{
    font-size: 18px;
    background-color: #ffd43e;
    color: #0e0e0e;
}
.input-list{
    background: #171717;
    font-size: 18px;
    color: #c6c6c6;
    margin-top: 20px;
}
.input-list-l{
    width: 100px;
    text-align: right;
    line-height: 44px;
    position: relative;
    padding-right: 15px;
}
.input-list-l::after{
    position: absolute;
    content: '';
    right: 0;
    width: 1px;
    height: 20px;
    top: 12px;
    background: #6b6b6b;
}
.input-list-r{
    height: 44px;
    background: none;
    border: none;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-indent: 20px;
    font-size: 18px;
    color: #c6c6c6;
    outline: medium;
}
.dot{
    width: 16px;
    height: 16px;
    border: 2px solid #ffd43e;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
}
.dot-act::after{
    position: absolute;
    content: '';
    width: 8px;
    height: 8px;
    left: 4px;
    top: 4px;
    border-radius: 50%;
    background: #ffd43e;
}
.login-btn{
    width: 300px;
    font-size: 14px;
    color: #ffd43e;
    line-height: 36px;
    margin-top: 15px;
    cursor: pointer;
}
.login-l{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAYCAYAAAB3JpoiAAAC0klEQVRoge2ZTYhOYRTHf/Oa0chHSNJY+BozJis2mpWiWAwbH4lZWQmRJFEMg4U0pSwplCZWZoxJKB97ERqF2M6QUgYlX6NT506n071v9965C/e991dv97nP87zPPc//PXPuOc/U/RxqGgTmkR2dwBtgB7DTrXoHOG/uFwLXgVbTNytDW/476oERoCMjwwZU7CnAOWC+GfsN7DX3a4EbwJwc65eYCtCf0Voi6FFt73FiC5eAt9o+CNwtmtiChJRG4BMwzfSLeF8TrtUL7AOmA++AuWbsG9AMjKrwnRnZnzskpPwA7gObjPGfNa6PpdjQfie20APIDysxfGXId+Q5dTWs8zgVbQy4fhGsLcV68sI75Po+Ak+BJyFi/wGupXhObqlXw2/r5ieZjUiGcS/GxsQ7H+pVxJ7pxj8AfeZZAV+AbcDJong3GsOD9mNgdYo1bgKb9a/ivXsXRCExfiOwCrg64V3kiIox1YeVOIhXd+u8IzHFfqRCDwNniyQ2TvBbKb4voeKlpoC7Y8y/CKzXl/KxjAuuXGAFl3AwlMBo693HNQuJQt4PB4BdwC9gqWYzhcPGcGEqMDlCBKkK15n7Pk0lF2l12VBFvGFXCA1mWN3mCp85fNdPGAtM35hmF+i1mtjCbNPuKKrYuJBSDflhFpvxfo3dbSFVo1Spz1xfo56vNLjDq8LhPTyKJcaLbezudrm7cFljti9ypCjarvG7sMT1cCuSePcLYAWwxc2TM5MTWtR4lgNdRRabBIK36NV696mQCrFHK8uwg68LwIwJ2FoTJPXwwLvbgQ1uzogKToTgywqs8zhxBW913n0mZE6XyXBGM7SxpkgSUgLvXqMfyyvgirlPepZeCm6Q85EmjdlEePdhzUwCSsEjiCN4s3r3cy1Y2t34A/3HgqUMKRHEEbzFZCSn3dhf9W5P6eERxCl8XmtVuVVzb0tvSFVJ6eERAP8AO86H8ybGB8EAAAAASUVORK5CYII=) no-repeat 50%;
    background-size: contain;
    width: 138px;
    height: 36px;
    font-size: 20px;
    line-height: 36px;
    color: #191919;
    text-indent: 34px;
    float: left;
    text-align: center;
}
.login-r{
    width: 142px;
    height: 32px;
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
    background-color: #262319;
    border: 2px solid #ffd43e;
    float: left;
    text-align: center;
}
.getcode{
    width: 128px;
    line-height: 44px;
    font-size: 16px;
    background-color: #2b2613;
    color: #ffd43e;
    text-align: center;
    cursor: pointer;
}
.close{
    width: 30px;
    height: 30px;
    position: absolute;
    right: -30px;
    top: 0;
    font-size: 30px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    /* background: firebrick; */
    cursor: pointer;
}
</style>

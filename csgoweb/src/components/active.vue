<template>
    <div class="pop">
        <div class="active">
            <div class="close" @click="close"><svg-icon icon-class="CloseCircle"></svg-icon></div>
            本网站开发中，敬请期待！
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        close() {
            this.$store.commit('admin/activeShow', false)
        }
    },
}
</script>

<style scoped>
.active{
    position: absolute;
    width: 400px;
    height: 200px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -100px;
    font-size: 26px;
    color: #333;
    text-align: center;
    line-height: 200px;
    background: #fff;
    border-radius: 10px;
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

<template>
    <div :class="'message message-' + msgObj.type + (msgObj.show ? ' act' : '')">
        {{ msgObj.message }}
    </div>
</template>

<script>
export default {
    props: {
        msgObj: {
            type: Object
        }
    },
    data() {
        return {

        }
    },
    watch: {
        msgObj: function(val) {
            setTimeout(() => {
                this.$store.commit('admin/showMessage', { show: false })
            }, 2500)
            return val
        }
    }
}
</script>

<style scoped>
.message{
    width: 300px;
    padding: 15px;
    font-size: 18px;
    border-radius: 6px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    position: fixed;
    z-index: 999;
    right: -330px;
    top: 100px;
    transition: right 0.2s .2s;
}
.act{
    right: 0;
}
.message-info{
    background-color: #f4f4f5;
    color: #909399;
}
.message-error{
    background-color: #fef0f0;
    color: #f56c6c;
}
.message-success{
    background-color: #f0f9eb;
    color: #67c23a;
}
</style>

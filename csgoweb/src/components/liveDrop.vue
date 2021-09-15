<template >
    <div class="live-drop">
        <Drop v-for="(item, index) in dropList" :key="index" :is-mask="true" :is-name="true" :dropInfo="item" />
    </div>
</template>
<script>
import Drop from './drop.vue'
import {
    dropList
} from '@/api/box'
export default {
    name: 'LiveDrop',
    components: {
        Drop
    },
    data() {
        return{
            dropList: []
        }
    },
    created() {
        console.log(1111)
        dropList().then(res => {
            console.log(res)
            if (res.errno == 0) {
                this.dropList = res.data
            } else {
                this.$message({
                    type: 'error',
                    message: res.errmsg
                })
            }
        })
    },
}
</script>
<style scoped>
    .live-drop{
        width: 100%;
        display: flex;
        background: #1a1a1a;
    }
</style>
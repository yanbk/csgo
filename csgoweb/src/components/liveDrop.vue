<template >
    <div class="live-drop">
        <Drop v-for="item in 10" :key="item" :is-mask="true" />
    </div>
</template>
<script>
import Drop from './drop.vue'
export default {
    name: 'LiveDrop',
    components: {
        Drop
    },
    data() {
        return{

        }
    },
    created() {
        console.log(1111)
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
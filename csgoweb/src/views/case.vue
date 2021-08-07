<template>
    <div>
        case
    </div>
</template>
<script>
import {
    boxInfo
} from '@/api/box'
export default {
    name: 'Roll',
    data() {
        return{

        }
    },
    mounted() {
        // setTimeout(function() {
        //     window.opener.location.reload(false)
        //     window.close()
        //     window.open(" ","_self").close()
        // }, 2000)
        boxInfo({ bid: this.$route.params.id }).then(res => {
            console.log(res)
        })
    },
    methods: {
        
    },
}
</script>
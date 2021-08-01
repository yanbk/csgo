<template>
    <div>
        <button @click="getSteamId">获得steamid</button>
    </div>
</template>
<script>
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
    },
    methods: {
        getSteamId() {
            this.$store.commit('user/getSteamId', '33333')
        }
    },
}
</script>
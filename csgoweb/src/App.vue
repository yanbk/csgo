<template>
  <div id="app">
    <NavHeader></NavHeader>
    <LiveDrop />
    <router-view></router-view>
    <Footer></Footer>
    <Message :msgObj="msgObj" />
    <Login v-if="isLogin"/>
  </div>
</template>

<script>
import NavHeader from './components/header.vue'
import LiveDrop from '@/components/liveDrop.vue'
import Login from '@/components/login'
import Footer from '@/components/footer.vue'
import Message from '@/components/message.vue'
export default {
  name: 'App',
  components: {
    NavHeader,
    LiveDrop,
    Login,
    Footer,
    Message
  },
  data() {
    return {
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.admin.isLogin
    },
    msgObj() {
      return this.$store.state.admin.msgObj
    }
  }
}
</script>

<style>
html{
  background: #212732;
}
*{
  padding: 0;
  margin: 0;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.flex-row-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-row-start{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex-row-between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-col-center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pop{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99999;
}
</style>

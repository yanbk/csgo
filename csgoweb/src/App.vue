<template>
  <div id="app">
    <NavHeader></NavHeader>
    <LiveDrop />
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from './components/header.vue'
import LiveDrop from '@/components/liveDrop.vue'
export default {
  name: 'App',
  components: {
    NavHeader,
    LiveDrop
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
</style>

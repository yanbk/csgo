<template>
  <div class="dashbox">
    <div class="clearfix">
      <pan-thumb></pan-thumb>
      <div class="info-container">
        <p class="display_name">{{ userInfo.username }}</p>
      </div>
    </div>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import gif from '@/assets/p.gif'
export default {
  name: 'Dashboard',
  components: {
    PanThumb
  },
  data() {
    return {
      emptyGif: gif
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userinfo
    }
  },
  mounted() {
    console.log(this.userInfo)
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.dashbox{
  padding: 30px;
  height: calc(100vh - 85px);
  background: #e3e3e3;
}
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}
.admin-box{
  background: #e3e3e3;
}
.info-container {
  position: relative;

  .display_name {
    display: block;
    width: 150px;
    font-size: 24px;
    line-height: 30px;
    color: #212121;
    position: absolute;
    text-align: center;
  }
}
</style>

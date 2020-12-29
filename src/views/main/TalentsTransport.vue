<template>
  <div>
    <Tabbar whichItem="6"/>
    <div class="talent-transport">
      <div class="top">
        <img src="@/assets/images/talents/banner.png" alt="">
      </div>
      <div class="middle">
        <div class="middle-top"><img src="@/assets/images/talents/talent01.png" alt=""></div>
        <div class="middle-bottom"><img src="@/assets/images/talents/talent02.png" alt=""></div>
      </div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>
<script>
import Tabbar from '@/components/tabbar';
export default {
  data() {
    return {
      type: 1,
    }
  },
  components: {
    Tabbar,
  },
  methods: {
    toggle(value) {
      this.type = value
    }
  },
};
</script>

<style lang='less' scoped>

  .talent-transport {
    .top {
      img {
        width: 100%;
      }
    }
    .middle {
      width: 1200px;
      margin: 0 auto;
      padding: 50px 0;
      div {
        img {
          width: 100%;
        }
      }
    }
   
  }
</style>
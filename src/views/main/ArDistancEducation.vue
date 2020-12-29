<template>
  <div>
    <Tabbar whichItem="2"/>
    <div class="ar">
      <div class="top">
        <img src="@/assets/images/ar/banner.png" alt="">
      </div>
      <div class="middle">
        <div class="middle-left"><img src="@/assets/images/ar/ar01.png" alt=""></div>
        <div class="middle-right"><img src="@/assets/images/ar/ar02.png" alt=""></div>
      </div>
      <div class="bottom">
        <div class="title">课程建设</div>
        <div class="toggle">
          <div class="btn" @click="toggle(1)" ><span :class="[ type==1 ? 'active' : '' ]">建设模式</span></div>
          <div class="btn" @click="toggle(2)" ><span :class="{ 'active': type == 2 }">AR实训</span></div>
        </div>
        <div class="pic">
          <img v-if="type == 1" src="@/assets/images/ar/ar04.png" alt="">
          <img v-else src="@/assets/images/ar/ar06.png" alt="">
        </div>
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
  .active {
    border-bottom: 3px solid #3399ff;
  }
  .ar {
    .top {
      img {
        width: 100%;
      }
    }
    .middle {
      width: 1200px;
      margin: 0 auto;
      padding: 50px 0;
      display: flex;
      div {
        width: 50%;
        img {
          width: 100%;
        }
      }
    }
    .bottom {
      .title {
        font-size: #333333;
        padding: 20px 0px 10px;
        font-size: 26px;
        text-align: center;
      } 
      .toggle {
        width: 1200px;
        height: 80px;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        .btn {
          width: 50%;
          height: 100%;
          text-align: center;
          font-size: 24px;
          color: #666;
          cursor: pointer;
          span {
            display: inline-block;
            height: 100%;
            line-height: 80px;
          }
        }
      }
      .pic {
        width: 1200px;
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
    }
   
  }
</style>
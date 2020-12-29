<template>
  <div>
    <Tabbar whichItem="4"/>
    <div class="college">
      <div class="top">
        <img src="@/assets/images/college/banner.png" alt="">
      </div>
      <div class="middle">
        <div class="middle-top"><img src="@/assets/images/college/college01.png" alt=""></div>
        <div class="middle-bottom"><img src="@/assets/images/college/college02.png" alt=""></div>
      </div>
      <div class="bottom">
        <div class="title">资源库</div>
        <div class="toggle">
          <div class="btn" @click="toggle(1)" ><span :class="[ type==1 ? 'active' : '' ]">建设模式</span></div>
          <div class="btn" @click="toggle(2)" ><span :class="{ 'active': type == 2 }">AR实训</span></div>
          <div class="btn" @click="toggle(3)" ><span :class="{ 'active': type == 3 }">基地资源</span></div>
        </div>
        <div class="pic">
          <img v-if="type == 1" src="@/assets/images/college/college04.png" alt="">
          <img v-if="type == 1" src="@/assets/images/college/college05.png" alt="">
          <img v-else-if="type == 2" src="@/assets/images/college/college07.png" alt="">
          <img v-else src="@/assets/images/college/college09.png" alt="">
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
  .college {
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
      .middle-bottom {
        width: 1200px;
        margin: 0 auto;
      }
    }
    .bottom {
      .title {
        font-size: #333333;
        padding: 20px 0px 10px;
        font-size: 38px;
        color: #666;
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
          width: 33.33%;
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
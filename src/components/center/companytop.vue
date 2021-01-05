<template>
  <div>
    <div class="wrap">
      <div class="blue"></div>
      <div class="int">
        <div class="int2">
          <div class="pic">
            <img v-if="info.compLogo != null" :src="info.CompLogo" alt="" />
            <img v-else src="@/assets/images/center/u27.svg" alt="" />
          </div>
          <div class="content">
            <p>{{changeRemarkNull(info.CompanyName)}}</p>
            <div>
              <span class="title">公司地址</span
              ><span class="text">{{changeRemarkNull(info.Address)}}</span>
            </div>
            <div>
              <span class="title">行业类型</span
              ><span class="text">{{changeRemarkNull(info.CompType)}}</span>
            </div>
            <div>
              <span class="title">经营方向</span
              ><span class="text">{{changeRemarkNull(info.CompBusiness)}}</span>
            </div>
            <div>
              <span class="title">公司介绍</span
              ><span class="text">{{changeRemarkNull(info.ComProfile)}}</span>
            </div>
          </div>
          <Button size="large">编辑资料</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCenterInfo} from '@/api'
export default {
  data(){
    return {
      info: {},
    }
  },
  mounted(){
    this.GetCenterInfo()
  },
  computed: {
    changeRemarkNull() {
      return function(text) {
        if (!text) {
          return "-";
        } else {
          return text;
        }
      };
    }
  },
  methods: {
    GetCenterInfo(){
      getCenterInfo().then(res=>{
        if(res.ercode == 0) {
          this.info = res.data
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.wrap {
  .blue {
    background-color: #a7def6;
    height: 200px;
  }
  .int {
    background-color: #fff;
    .int2 {
      display: flex;
      margin: 0 auto;
      width: 1200px;
      position: relative;
      Button {
        position: absolute;
        right: 0;
        bottom: 10px;
      }
      .pic {
        width: 221px;
        height: 233px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: -50px;
        }
      }
      .content {
        margin-left: 50px;
        p {
          font-size: 30px;
          color: #333;
        }
        div {
          margin-top: 20px;
          .title {
            font-size: 15px;
            margin-right: 50px;
            color: #333;
          }
          .text {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
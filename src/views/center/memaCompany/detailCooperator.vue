<template>
  <div class="centerbg">
    <Tabbar whichItem="0" />
    <div class="nav">
      <div class="row">
        <div class="goback" @click="$router.go(-1)">合作企业</div>
        <div>>{{detailCor.CompanyName}}</div>
      </div>
    </div>
    <div class="main">
      <div class="top">
        <div class="pic">
          <img v-if="detailCor" :src="detailCor.CompLogo"/>
          <img v-else src="@/assets/images/no_image.jpg" alt="" />
        </div>
        <div class="base">
          <div class="title">{{detailCor.CompanyName}}</div>
          <Tag color="blue" v-if="detailCor.StatusID == 1">合作中</Tag>
          <Tag color="eror" v-else>已结束</Tag>
          <div class="type">
            <span style="margin-right: 50px">公司性质：{{detailCor.CompType}}</span><span>行业类型：{{detailCor.CompIndustry}}</span>
          </div>
          <div>公司地址：{{detailCor.Address}}</div>
        </div>
      </div>
      <div class="middle">
        <div class="head">合作信息</div>
        <div class="wrap">
          <div class="concact">
          <span>联系人：{{detailCor.ContactName}}</span><span>联系方式：{{detailCor.ContactPhone}}</span
          ><span>初次合作时间：{{detailInfo.StartTime}}</span>
        </div>
        <div class="machine">
          <span>合作设备： </span><span v-for="(item,index) in detailInfo.CorMachine" :key="index">{{item}}</span>
        </div>
        <div class="info">
          <div>合作信息： </div>
          <div class="machinelist">
            <div class="item">
            <Icon type="md-document" size="25" /><span>与XXX得新设备合同</span
            ><span>申请人：章晓晓</span><span>申请日期：2020-10-11</span>
            </div>
            <div>
              <Icon type="md-document" size="25" /><span>与XXX得新设备合同</span
              ><span>申请人：章晓晓</span><span>申请日期：2020-10-11</span>
            </div>
          </div>
          
        </div>
        </div>
        
      </div>
      <div class="bottom">
        <div class="head">企业图集</div>
        <div class="photo">
          <div class="item"><img src="" alt="" /></div>
          <div class="item"><img src="" alt="" /></div>
          <div class="item"><img src="" alt="" /></div>
          <div class="item"><img src="" alt="" /></div>
          <div class="item"><img src="" alt="" /></div>
        </div>
      </div>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<script>
import { corDetail } from "@/api";
import Tabbar from "@/components/tabbar";

export default {
  data() {
    return {
      id: null,
      detailInfo: {},
      detailCor: {},
    };
  },
  components: {
    Tabbar,
  },
  computed: {
    changeNameLength() {
      return function (text) {
        if (!text) {
          return "暂无";
        } else if (text.length > 6) {
          return text.slice(0, 6) + "...";
        } else {
          return text;
        }
      };
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.GetDetail();
  },
  methods: {
    GetDetail() {
      corDetail({ pk_Company_Cor: this.id }).then((res) => {
        if (res.ercode == 0) {
          this.detailInfo = res.data;
          this.detailCor = res.data.PartyBInfo
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.nav {
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  .row {
    width: 1280px;
    margin: 0 auto;
    display: flex;
    padding: 0 20px;
    color: #02a7f0;
    .goback {
      margin-right: 5px;
      cursor: pointer;
      &:hover {
      }
    }
  }
}
.main {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  .top {
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    margin-bottom: 20px;
    .pic {
      height: 160px;
      width: 160px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .base {
      margin-left: 50px;
      .title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
      }
      .type {
        margin: 30px 0 10px 0;
      }
    }
  }
  .middle {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 10px 20px 20px 20px;
    .head {
      height: 50px;
      line-height: 50px;
      color: #333;
      font-weight: bold;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }
    .wrap {
      padding: 30px;
      .concact {
        span {
          margin-right: 50px;
        }
      }
      .machine {
        margin: 20px 0 40px 0;
        span {
          &:nth-child(n + 2) {
            margin-right: 20px;
          }
        }
      }
      .info {
        display: flex;
        .machinelist {
          .item {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .bottom {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 10px 20px 20px 20px;
    .head {
      height: 50px;
      line-height: 50px;
      color: #333;
      font-weight: bold;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }
    .photo {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        width: 20px;
      }
    }
  }
}
</style>
<template>
  <div style="background-color: #f2f2f2">
    <Tabbar whichItem="0" />
    <div class="center">
      <div class="left">
        <Stubar num="1"/>
      </div>
      <div class="right">
        <div class="right-item">
          <p><span></span><span>基本信息</span></p>
          <div>用户名称： 黄佳星</div>
          <div>真实姓名： 黄佳鑫</div>
          <div>手机号码： 13751577248</div>
          <div>电子邮箱： 2420193942@qq.com</div>
        </div>
        <div class="right-item">
          <p><span></span>账号信息</p>
          <div>当前绑定账号： 13751577248<span>换绑手机号</span></div>
          <div>密码： 123456<span>重置密码</span></div>
        </div>
      </div>
    </div>

    <div style="height: 50px"></div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";
import Stubar from '@/components/center/stuBar'
export default {
  data() {
    return {

    };
  },
  components: {
    Tabbar,
    Stubar
  },
  mounted() {
  },
};
</script>

<style lang='less' scoped>
  .right-item {
    p {
      margin: 10px 0;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      span:nth-child(1) {
        width: 5px;
        height: 18px;
        display: inline-block;
        background-color:#2b85e4;
        margin-right: 10px;
        vertical-align: middle;
      }
      span:nth-child(2) {
        vertical-align: middle;
      }
    }
    div {
      margin: 20px 20px;
      span {
        margin-left: 10px;
        cursor: pointer;
        color: royalblue;
      }
    }
  }
</style>
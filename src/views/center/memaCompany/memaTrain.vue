<template>
  <div>
    <div>
      <div class="ccenter">
        <div class="left">
          <MemaComBar num="5" />
          <div>
            待开发
          </div>
        </div>
        <div class="right">
          <!-- <div class="btn">上传设备信息</div> -->
          <div class="table">
            <p>课程中心</p>
            <div class="wrap">
              <div class="item">昨日浏览量</div>
              <div class="item">昨日收藏量</div>
              <div class="item">昨日下载量</div>
              <div class="item">昨日学习量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MemaComBar from "@/components/center/memaComBar";
export default {
  data() {
    return {};
  },
  components: {
    MemaComBar,
  },
  mounted() {},
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
      background-color: #2b85e4;
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
      font-size: 12px;
      margin-left: 20px;
      cursor: pointer;
      color: royalblue;
    }
  }
}
</style>
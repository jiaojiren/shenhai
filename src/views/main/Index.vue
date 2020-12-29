<template>
  <div>
    <Tabbar whichItem="1" />
    <!-- 轮播图 -->
    <div class="banner">
      <Carousel
        autoplay
        v-model="value2"
        loop
        :autoplay-speed="5000"
        :radius-dot="true"
      >
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/images/home/b01.png" alt="" />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/images/home/b02.png" alt="" />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/images/home/b03.png" alt="" />
          </div>
        </CarouselItem>
      </Carousel>
      <!-- 遮挡 -->
      <div style="z-index: 999; position: absolute; bottom: 0px; width: 100%">
        <img src="@/assets/images/home/home_banner_bg.png" style="width: 100%" />
      </div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="list-wrap">
        <div class="list-item">
          <div class="list-item-pic">
            <img src="@/assets/images/home/1.jpg" alt="" />
          </div>
          <div class="list-item-title">AR产品解决方案</div>
        </div>
        <div class="list-item">
          <div class="list-item-pic">
            <img src="@/assets/images/home/2.jpg" alt="" />
          </div>
          <div class="list-item-title">考试认证</div>
        </div>
        <div class="list-item">
          <div class="list-item-pic">
            <img src="@/assets/images/home/3.jpg" alt="" />
          </div>
          <div class="list-item-title">联合学院</div>
        </div>
        <div class="list-item">
          <div class="list-item-pic">
            <img src="@/assets/images/home/4.jpg" alt="" />
          </div>
          <div class="list-item-title">实训基地</div>
        </div>
        <div class="list-item">
          <div class="list-item-pic">
            <img src="@/assets/images/home/5.jpg" alt="" />
          </div>
          <div class="list-item-title">专家资源</div>
        </div>
      </div>
    </div>
    <!-- 解决方案&实训基地 -->
    <div class="methods">
      <div
        style="text-align: center; font-size: 26px; padding: 0px 0px 30px 0px"
      >
        AR远程教学解决方案
      </div>

      <div style="text-align: center; background: #244377; padding: 50px 0px">
        <img src="@/assets/images/home/home01.png" />
      </div>

      <div style="height: 30px"></div>

      <div
        style="text-align: center; font-size: 26px; padding: 20px 0px 30px 0px"
      >
        实训基地
      </div>

      <div id="info" style="text-align: center;">
        <img style="width: 100%" src="@/assets/images/home/home02.png" />
      </div>
    </div>
    <!-- 资讯 -->
    <div style="height: 30px"></div>
    <div class="information">
      <div
        style="text-align: center; font-size: 20pt; padding: 20px 0px 30px 0px"
      >
        资讯介绍
        <div
          style="
            text-align: right;
            padding: 10px;
            width: 1200px;
            margin: 0 auto;
            font-size: 11pt;
            margin-top: -30px;
          "
        >
          <a href="Media.aspx">更多资讯></a>
        </div>
      </div>

      <div style="text-align: center">
        <table style="width: 1200px; margin: 0 auto">
          <tr>
            <td style="width: 590px" valign="top">
              <img src="@/assets/images/home/home03.png" style="width: 100%" />
            </td>
            <td style="width: 20px"></td>
            <td style="width: 590px; text-align: left" valign="top">
              <ul>
                <li>
                  <div>
                    <Icon
                      color="#94b66f"
                      type="ios-arrow-forward"
                    />全省教育系统网络安全工作推进视频会议召开
                  </div>
                  <span class="news_time">2020-12-18</span>
                </li>
                <li>
                  <div>
                    <Icon color="#94b66f" type="ios-arrow-forward" />
                    关于举办职业院校校长治理能力提升专题研讨班（第三期）的通知
                  </div>
                  <span class="news_time">2020-12-18</span>
                </li>
                <li>
                  <div>
                    <Icon color="#94b66f" type="ios-arrow-forward" />山东高校
                    “放管服”改革暨法治工作培训班举办
                  </div>
                  <span class="news_time">2020-12-11</span>
                </li>
                <li>
                  <div>
                    <Icon
                      color="#94b66f"
                      type="ios-arrow-forward"
                    />教育部高等教育司司长吴岩：构建高质量发展体系建设高等教育强国
                  </div>
                  <span class="news_time">2020-12-10</span>
                </li>
                <li>
                  <div>
                    <Icon
                      color="#94b66f"
                      type="ios-arrow-forward"
                    />邓云锋在教育部新闻发布会介绍山东职教高地建设情况
                  </div>
                  <span class="news_time">2020-12-09</span>
                </li>
                <li>
                  <div>
                    <Icon
                      color="#94b66f"
                      type="ios-arrow-forward"
                    />省教育厅党组扩大会议专题学习省委十一届十二次全体会议精神
                  </div>
                  <span class="news_time">2020-12-08</span>
                </li>
                <li>
                  <div>
                    <Icon
                      color="#94b66f"
                      type="ios-arrow-forward"
                    />山东省教育科学研究院“网络与信息安全”主题宣传校园行活动走进山东职业学院
                  </div>
                  <span class="news_time">2020-12-07</span>
                </li>
                <li>
                  <div>
                    <Icon
                      color="#94b66f"
                      type="ios-arrow-forward"
                    />“终身学习有家也有我”教育论坛暨现场观摩会在东营市河口区举行
                  </div>
                  <span class="news_time">2020-12-07</span>
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>

      <div style="height: 80px"></div>
    </div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";
export default {
  data() {
    return {
      value2: 0,
    };
  },
  components: {
    Tabbar,
  },
};
</script>

<style lang='less' scoped>
.banner {
  // height: 627px;
  position: relative;
  .demo-carousel {
    img {
      width: 100%;
      height: 100%;
    }
  }
  /deep/ .ivu-carousel {
    .ivu-carousel-dots {
      bottom: 100px;
    }
  }
}
.list {
  padding: 40px 0;
  margin-bottom: 80px;
  .list-wrap {
    display: flex;
    justify-content: center;
    .list-item {
      width: 260px;
      font-size: 18px;
      .list-item-pic {
        text-align: center;
      }
      .list-item-title {
        text-align: center;
      }
    }
  }
}
.information table li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0 10px 15px;
  border-bottom: 1px dashed #ddd;
  div {
    width: 480px;
    font-size: 14px;
    cursor: pointer;
    color: #646464;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: #2186cf;
    }
  }
  span {
    color: #898989;
  }
}
</style>
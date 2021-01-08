<template>
  <div class="centerbg">
    <Tabbar whichItem="6" />
    <div class="resume">
      <div class="resume-left">
        <div class="top">
          <div class="name">周晓宇</div>
          <div class="belong">
            <span>聊城职业技术学院</span><span>机电学院2班</span>
          </div>
        </div>
        <div class="info-item">
          <div class="head">基本信息</div>
          <div class="row row1">
            <div class="item">毕业时间：2020年7月1日</div>
            <div class="item">现居住地：青岛</div>
            <div class="item">户口：青岛</div>
            <div class="item">政治面貌：党员</div>
          </div>
          <div class="row row2">
            <div class="item">手机号：75648319980</div>
            <div class="item">邮箱：7564831@qq.com</div>
          </div>
        </div>
        <div class="info-item">
          <div class="head">求职期望</div>
          <div class="row row3">
            <span class="item">机械维修</span>
            <span class="item">6-11k</span>
            <span class="item">移动互联网</span>
            <span class="item">青岛</span>
          </div>
        </div>
        <div class="info-item">
          <div class="head">学习机械</div>
          <div class="row row4">
            <span class="item">A设备厂BFGI-24Y8</span>
            <span class="item">B设备厂FJ-3758</span>
            <span class="item">C设备厂GHJ-3785</span>
          </div>
        </div>
        <div class="info-item">
          <div class="head">教育经历</div>
          <div class="row row5">
            ss
          </div>
        </div>
        <div class="info-item">
          <div class="head">实习经历</div>
          <div class="row row6">
            ss
          </div>
        </div>
        <div class="info-item">
          <div class="head">语言能力</div>
          <div class="row row7">
            英语四级
          </div>
        </div>
        <div class="info-item">
          <div class="head">专业技能</div>
          <div class="row8 row">
            <span>计算机 5年 熟练</span><span>驾驶 1年 不熟练</span>
          </div>
        </div>
        <div class="info-item">
          <div class="head">自我评价</div>
          <div class="row9 row">
            我的评价
          </div>
        </div>
      </div>
      <div class="resume-right">
        <div class="top">
          <div class="item">
            <div class="icon"><img src="@/assets/images/talentsTransport/myResume/1.svg" alt=""></div>
            <div>收藏</div>
          </div>
          <div class="item" style="border-left: 1px solid #f1f1f1; border-right: 1px solid #f1f1f1;">
            <div class="icon"><img src="@/assets/images/talentsTransport/myResume/2.svg" alt=""></div>
            <div>发消息</div>
          </div>
          <div class="item">
            <div class="icon"><img src="@/assets/images/talentsTransport/myResume/3.svg" alt=""></div>
            <div>发邮件</div>
          </div>
          <div class="item">
            <div class="icon"><img src="@/assets/images/talentsTransport/myResume/4.svg" alt=""></div>
            <div>下载</div>
          </div>
          <div class="item" style="border-left: 1px solid #f1f1f1; border-right: 1px solid #f1f1f1;">
            <div class="icon"><img src="@/assets/images/talentsTransport/myResume/5.svg" alt=""></div>
            <div>打印</div>
          </div>
          <div class="item">
            <div class="icon"><img src="@/assets/images/talentsTransport/myResume/6.svg" alt=""></div>
            <div>分享</div>
          </div>
        </div>
        <!-- 约面试 -->
        <div class="face">
          <div class="face-btn"><Button long ghost type="primary">约面试</Button></div>       
          <div class="faceForm">
            <Form :label-width='75' label-position='left'>
              <FormItem label="面试时间:">
                <Input></Input>
              </FormItem>
              <FormItem label="面试地点:">
                <Input></Input>
              </FormItem>
              <FormItem label="联系人:">
                <Input></Input>
              </FormItem>
              <FormItem label="联系方式:">
                <Input></Input>
              </FormItem>
              <div class="send">
                <Button long type="primary">发送</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";

export default {
  data() {
    return {
      
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
  methods: {},
};
</script>

<style lang='less' scoped>
  .resume {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    .resume-left {
      background-color: #fff;
      width: 880px;
      margin-right: 10px;
      padding: 20px;
      .top {
        .name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .belong {
          padding-left: 10px;
        }
      }
      .info-item {
        margin-top: 20px;
        .head {
          font-size: 15px;
          font-weight: bold;
        }
        .row {
          padding-left: 10px;
          .item {
            margin-top: 10px;
          }
        }
        .row1 {
          display: flex;
          .item {
            margin-right: 30px;
          }
        }
        .row2 {
          display: flex;
          .item {
            margin-right: 30px;
          }
        }
        .row3 {
          display: flex;
          .item {
            margin-right: 30px;
          }
        }
        .row4 {
          display: flex;
          .item {
            margin-right: 30px;
          }
        }
        .row8 {
          span {
            margin-right: 30px;
          }
        }
      }
    }
    .resume-right {
      background-color: #fff;
      width: 310px;
      .top {
        display: flex;
        flex-wrap: wrap;
        .item {
          cursor: pointer;
          border-bottom: 1px solid #f1f1f1;
          width: 33.33%;
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icon {
            width: 40px;
            height: 40px;
            margin-bottom: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .face {
        margin-top: 20px;
        .face-btn {
          padding: 0 50px;
        }
        .faceForm {
          border: 1px solid #ddd;
          padding: 10px;
          margin: 10px;
          .ivu-form-item {
            margin-bottom: 10px;
          }
          .send {
            padding: 0 80px;
          }
        }
      }
    }
  }
</style>
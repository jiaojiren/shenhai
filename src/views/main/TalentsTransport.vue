<template>
  <div class="centerbg">
    <Tabbar whichItem="6" />
    <div class="talent-transport">
      <div class="left">
        <div class="bar">
          <div class="active" @click="goCenterList('TalentsTransport')">
            岗位需求
          </div>
          <div @click="goCenterList('TalentsTransportTrain')">实训需求</div>
        </div>
        <div class="filter-more">
          <div class="box">
            <Row class="mm-row">
              <i-col :span="2" class="mm-col-title">地点：</i-col>
              <i-col :span="22" class="mm-col-main">
                <div class="divwrap">
                  <v-distpicker></v-distpicker>
                </div>
              </i-col>
            </Row>
            <Row class="mm-row">
              <i-col :span="2" class="mm-col-title">行业：</i-col>
              <i-col :span="22" class="mm-col-main">
                <div class="flex-filter">
                  <div
                    class="tip-box"
                    v-for="(v, i) in industryLabel"
                    :key="i"
                    v-if="i < 5"
                  >
                    <Tooltip
                      transfer
                      :content="v.industryName"
                      placement="top"
                      class="tip-item"
                    >
                      <div
                        class="tip-name"
                        @click="ClickRange(i)"
                        :class="{ isActive: v.active }"
                      >
                        {{ changeNameLength(v.industryName) }}
                      </div>
                    </Tooltip>
                  </div>
                  <div
                    class="tip-box"
                    v-for="(v, i) in industryLabel"
                    v-show="industryShowMore"
                    :key="i"
                    v-if="i >= 5"
                  >
                    <Tooltip
                      transfer
                      :content="v.industryName"
                      placement="top"
                      class="tip-item"
                    >
                      <div
                        class="tip-name"
                        @click="ClickRange(i)"
                        :class="{ isActive: v.active }"
                      >
                        {{ changeNameLength(v.industryName) }}
                        <span
                          class="b-class-font"
                          v-if="
                            v.companyCount !== null &&
                            v.companyCount !== undefined
                          "
                          >({{ v.companyCount }})</span
                        >
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div
                  class="shrink-toggle"
                  v-if="industryLabel.length > 5"
                  @click="industryShowMore = !industryShowMore"
                >
                  {{ industryShowMore ? "收起" : "更多" }}
                  <Icon type="ios-arrow-up" v-if="industryShowMore" />
                  <Icon type="ios-arrow-down" v-else />
                </div>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="list">
          <p>岗位推荐</p>
          <div class="wrap">
            <div class="item">
              <div class="item1">
                <span class="title">机械维修</span>
                <span>AA设备BFD-2355</span>
                <span>需求200人</span>
                <span class="like">匹配度：99%</span>
              </div>
              <div class="item2">
                <span>4K-8K</span>
                <span>青岛-市南区</span>
                <span>3-5年</span>
                <span>招聘2人</span>
              </div>
              <div class="item3">
                <Tag>五险一金</Tag><Tag>周末双休</Tag><Tag>餐补</Tag>
              </div>
              <div class="item4">
                <div class="company">xxxx股份有限公司</div>
                <div class="type">
                  <span>国企</span>
                  <span> | </span>
                  <span>1000人以上</span>
                </div>
                <div class="btn">
                  <Button size="small"
                    ><Icon type="md-star-outline" />收藏</Button
                  ><Button size="small" type="primary" style="margin-left: 10px"
                    >投递简历</Button
                  >
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item1">
                <span class="title">机械维修</span>
                <span>AA设备BFD-2355</span>
                <span>需求200人</span>
                <span class="like">匹配度：99%</span>
              </div>
              <div class="item2">
                <span>4K-8K</span>
                <span>青岛-市南区</span>
                <span>3-5年</span>
                <span>招聘2人</span>
              </div>
              <div class="item3">
                <Tag>五险一金</Tag><Tag>周末双休</Tag><Tag>餐补</Tag>
              </div>
              <div class="item4">
                <div class="company">xxxx股份有限公司</div>
                <div class="type">
                  <span>国企</span>
                  <span> | </span>
                  <span>1000人以上</span>
                </div>
                <div class="btn">
                  <Button size="small"
                    ><Icon type="md-star-outline" />收藏</Button
                  ><Button size="small" type="primary" style="margin-left: 10px"
                    >投递简历</Button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item1">
          <p class="head">简历管理</p>
          <div>完善线上简历</div>
        </div>
        <div class="item2">
          <p class="head">附件管理</p>
          <div class="myresume">
            <Icon type="md-document" /> 
            <span>我的简历.pdf</span>
            <Icon style="float: right; line-height: 20px" :size="18" type="ios-trash" />
          </div>
          <div class="btn">
            <Button long type="primary">上传简历</Button>
          </div>
        </div>
        <div class="item3">
          <p class="head">实训基地</p>
          <div class="content">
            <div>海尔崂山XX公司实训基地</div>
            <div>海尔崂山XX公司实训基地</div>
            <div>海尔崂山XX公司实训基地</div>
            <div>海尔崂山XX公司实训基地</div>
            <div>海尔崂山XX公司实训基地</div>
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
      industryLabel: [
        {
          industryName: "互联网/IT/电子/通信",
          active: true,
        },
        {
          industryName: "互联网/IT/电子/通信",
        },
        {
          industryName: "互联网/IT/电子/通信",
        },
      ],
      industryShowMore: false,
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
  methods: {
    ClickRange(i) {},
    goCenterList(name) {
      this.$router.push({ name: name });
    },
  },
};
</script>

<style lang='less' scoped>
.talent-transport {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  .left {
    width: 900px;
    .bar {
      background-color: #fff;
      display: flex;
      padding: 10px 50px 9px;
      div {
        text-align: center;
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        cursor: pointer;
        user-select: none;
        margin-right: 40px;
      }
    }
    .filter-more {
      width: 100%;
      margin: 10px auto 0;
      border: 1px solid #eee;
      background-color: #fff;
      padding: 4px 16px;
      .box {
        // height: 150px;
        overflow: hidden;
        .mm-row {
          padding: 8px 0;
          .mm-col-title {
            // width: 90px;
            line-height: 30px;
            // font-weight: 600;
            font-size: 14px;
            // color: #000;
          }
          .mm-col-main {
            position: relative;
            font-size: 14px;
            font-weight: 400;
            color: #333;
            .flex-filter {
              width: 100%;
              height: auto;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              .tip-box {
                line-height: 30px;
                // width: 20%;
                margin-right: 10px;
                flex: 0 0 auto;
                .tip-item {
                  cursor: pointer;
                  .tip-name {
                    padding: 0 9px;
                    border-radius: 5px;
                    line-height: 26px;
                    font-size: 13px;
                    .b-class-font {
                      color: #888;
                    }
                  }
                  .isActive {
                    color: #fff;
                    background-color: #148aff;
                    .b-class-font {
                      color: #fff;
                    }
                  }
                }
                // .tip-item:hover {
                //   color: #148aff;
                //   .b-class-font {
                //     color: #148aff;
                //   }
                // }
              }
            }
            .shrink-toggle {
              color: #666;
              position: absolute;
              top: 0;
              line-height: 30px;
              right: -34px;
              font-size: 13px;
              cursor: pointer;
            }
            .reset-toggle {
              position: absolute;
              top: 0;
              line-height: 30px;
              right: -40px;
              cursor: pointer;
              .reset-icon {
                font-size: 26px;
                transform: translateX(-4px);
              }
            }
          }
        }
        .mm-row:last-child {
          border-bottom: none;
        }
      }
    }
    .list {
      margin-top: 10px;
      background-color: #fff;
      p {
        padding: 10px 0 10px 10px;
        border-bottom: 1px solid #ddd;
      }
      .wrap {
        padding-left: 10px;
        .item {
          padding: 10px 0 20px 0;
          border-bottom: 1px solid #eee;
          position: relative;
          .item1 {
            display: flex;
            .title {
              font-weight: bold;
              color: #333;
              font-size: 16px;
            }
            .like {
              color: #f59a23;
            }
            span {
              margin-right: 30px;
            }
          }
          .item2 {
            display: flex;
            margin: 20px 0 10px 0;
            span {
              margin-right: 30px;
            }
          }
          .item4 {
            position: absolute;
            top: 0;
            right: 0;
            padding: 10px 20px;
            .company {
              font-size: 16px;
              text-align: right;
            }
            .type {
              margin: 10px 0 20px 0;
              text-align: right;
            }
            .btn {
            }
          }
        }
      }
    }
  }
  .right {
    width: 280px;
    margin-left: 20px;
    .item1 {
      background-color: #fff;
      .head {
        text-align: center;
        font-size: 18px;
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
      }
      div {
        color: #02a7f0;
        font-size: 16px;
        padding: 10px;
      }
    }
    .item2 {
      margin: 10px 0;
      background-color: #fff;
      .head {
        text-align: center;
        font-size: 18px;
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
      }
      .myresume {
        padding: 10px;
      }
      .btn {
        padding: 10px;
      }
    }
    .item3 {
      background-color: #fff;
      .head {
        text-align: center;
        font-size: 18px;
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
      }
      .content {
        padding: 10px;
        div {
          text-align: center;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}

.active {
  color: #02a7f0;
}
/deep/ .mm-col-main {
  .divwrap .distpicker-address-wrapper > label select {
    height: 100% !important;
    color: #666 !important;
    padding: 4px 12px !important;
    width: 150px !important;
    font-size: 14px;
  }
}
</style>
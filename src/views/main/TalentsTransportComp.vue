<template>
  <div class="centerbg">
    <Tabbar whichItem="6" />
    <div class="talent-transport">
      <div class="left">
        <div class="filter-more">
          <div class="box">
            <Row class="mm-row">
              <i-col :span="2" class="mm-col-title">设备：</i-col>
              <i-col :span="22" class="mm-col-main">
                <div class="flex-filter">
                  <div
                    class="tip-box"
                    v-for="(v, i) in machineSeriesLabel"
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
                    v-for="(v, i) in machineSeriesLabel"
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
                  v-if="machineSeriesLabel.length > 5"
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
          <div class="head">
            <div class="head-left">
              收到<span style="color: #02a7f0">500</span>条简历
            </div>
            <div class="head-right">
              <div class="state">
                <div class="item active">全部</div>
                <div class="item">待处理</div>
                <div class="item">已拒绝</div>
                <div class="item">约面试</div>
              </div>
              <div>
                <Select style="width: 200px">
                  <Option :value="sortWay">默认排序</Option>
                </Select>
              </div>
            </div>
          </div>
          <div class="wrap">
            <div class="item">
              <div class="item1">
                <span class="title" @click="toDetailResume">周晓宇</span>
              </div>
              <div class="item2">
                <span>聊城职业技术学院</span>
                <span>机电专业</span>
              </div>
              <div class="item3">
                <span><Icon type="ios-pin" />青岛</span
                ><span><Icon type="logo-yen" />6001-8000</span
                ><span><Icon type="ios-school-outline" />专科</span
                ><span>一年实习经历</span>
              </div>
              <div class="item4">
                <div class="company">意向职位：机械自动化</div>
              </div>
            </div>
            <div class="item">
              <div class="item1">
                <span class="title">周晓宇</span>
              </div>
              <div class="item2">
                <span>聊城职业技术学院</span>
                <span>机电专业</span>
              </div>
              <div class="item3">
                <span><Icon type="ios-pin" />青岛</span
                ><span><Icon type="logo-yen" />6001-8000</span
                ><span><Icon type="ios-school-outline" />专科</span
                ><span>一年实习经历</span>
              </div>
              <div class="item4">
                <div class="company">意向职位：机械自动化</div>
              </div>
            </div>
            <div class="item">
              <div class="item1">
                <span class="title">周晓宇</span>
              </div>
              <div class="item2">
                <span>聊城职业技术学院</span>
                <span>机电专业</span>
              </div>
              <div class="item3">
                <span><Icon type="ios-pin" />青岛</span
                ><span><Icon type="logo-yen" />6001-8000</span
                ><span><Icon type="ios-school-outline" />专科</span
                ><span>一年实习经历</span>
              </div>
              <div class="item4">
                <div class="company">意向职位：机械自动化</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="wrap">
          <div class="top">
            <div class="pic"><img src="@/assets/images/talentsTransport/u57.svg" alt=""></div>
            <div class="btn" @click="toPublish">发布职位+</div>
          </div>
          <div class="middle">
            <div class="middle-left">暂存职位</div>
            <div class="middle-right">查看详情>></div>
          </div>
          <div class="bottom">
            <div class="item">
              <div>机械自动化</div>
              <div>2020-07-14</div>
              <div><span class="opt">删除</span><i class="divide"></i><span class="opt">编辑</span></div>
            </div>
            <div class="item">
              <div>机械自动化</div>
              <div>2020-07-14</div>
              <div><span class="opt">删除</span><i class="divide"></i><span class="opt">编辑</span></div>
            </div>
            <div class="item">
              <div>机械自动化</div>
              <div>2020-07-14</div>
              <div><span class="opt">删除</span><i class="divide"></i><span class="opt">编辑</span></div>
            </div>
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
      sortWay: "",
      machineSeriesLabel: [
        {
          industryName: "不限",
          active: true,
        },
        {
          industryName: "设备类别1",
        },
        {
          industryName: "设备类别2",
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
    toPublish() {
      this.$router.push({path: '/publishJob'})
    },
    toDetailResume(){
      this.$router.push({path: '/detailResume'})
    }
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
    width: 850px;
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
      // margin: 10px auto 0;
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
      .head {
        padding: 10px 0 10px 10px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        .head-left {
          line-height: 32px;
          font-size: 16px;
        }
        .head-right {
          margin-right: 10px;
          display: flex;
          .state {
            margin-right: 10px;
            display: flex;
            .item {
              cursor: pointer;
              width: 60px;
              line-height: 32px;
              text-align: center;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
              border-left: 1px solid #ddd;
              &:nth-last-child(1) {
                border-right: 1px solid #ddd;
              }
            }
          }
          .active {
            background-color: #2d8cf0;
            color: #fff;
          }
        }
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
              cursor: pointer;
            }
            span {
              margin-right: 30px;
            }
          }
          .item2 {
            display: flex;
            margin: 10px 0 10px 0;
            span {
              margin-right: 30px;
            }
          }
          .item3 {
            span {
              margin-right: 20px;
            }
          }
          .item4 {
            position: absolute;
            top: 0;
            right: 0;
            padding: 10px 20px;
            .company {
              text-align: right;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .right {
    width: 330px;
    margin-left: 20px;
    .wrap {
      background-color: #fff;
      .top {
        padding: 10px 0;
        position: relative;
        .pic {
          position: absolute;
          left: 28px;
          top: 5px;
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .btn {
          cursor: pointer;
          margin: 0 auto;
          width: 120px;
          height: 40px;
          line-height: 40px;
          background-color: #f59a23;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
        }
      }
      .middle {
        margin: 20px 0 10px;
        padding: 0 10px 10px;
        border-bottom: 1px solid #666;
        display: flex;
        justify-content: space-between;
        .middle-left {
          font-weight: bold;
          font-size: 16px;
        }
        .middle-right {
          cursor: pointer;
          color: #02a7f0;
          line-height: 24px;
        }
      }
      .bottom {
        .item {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          .opt {
            color: #02a7f0;
            cursor: pointer;
          }
          .divide {
            margin: 0 5px;
            border-left: 1px solid #ddd;
          }
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
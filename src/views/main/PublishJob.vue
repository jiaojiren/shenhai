<template>
  <div class="centerbg">
    <Tabbar whichItem="6" />
    <div class="job-publish">
      <div class="wrap">
        <div class="top">
          <div class="nav">
            <span style="cursor: pointer;" @click="$router.go(-1)">人才输送</span>
            <span style="margin-left: 5px">>发布职位</span>
          </div>
          <div class="baseInfo">
            <div class="pic">
              <img src="@/assets/images/center/companydefault.png" alt="" />
            </div>
            <div class="baseInfo-right">
              <p>青岛XXX设备有限公司</p>
              <div class="item">
                <span class="name">公司地址</span
                ><span class="value">山东省青岛市区路</span>
              </div>
              <div class="item">
                <span class="name">行业类型</span
                ><span class="value">行业类型</span>
              </div>
              <div class="item">
                <span class="name">经营方向</span
                ><span class="value">经营</span>
              </div>
              <div class="item">
                <span class="name">公司介绍</span
                ><span class="value">公司介绍</span>
              </div>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="head">职位介绍</div>
          <Form class="formItem" :label-width="100" label-position="left">
            <FormItem label="岗位名称：" style="width: 500px">
              <Input v-model="formItem.name"></Input>
            </FormItem>
            <FormItem label="对应设备：" style="width: 800px">
              <div class="machine">
                <div class="item">AA设备BFD-2533</div>
                <div class="item">AA设备BFD-2533</div>
                <div class="item"><Icon type="md-add" /></div>
              </div>
            </FormItem>
            <FormItem label="工作地址：" style="width: 500px">
              <Input v-model="formItem.name"></Input>
            </FormItem>
            <FormItem label="薪资设置：" style="width: 500px">
              <Input v-model="formItem.name"></Input>
            </FormItem>
            <FormItem label="经验要求：" style="width: 500px">
              <Input v-model="formItem.name"></Input>
            </FormItem>
            <FormItem label="招聘人数：" style="width: 500px">
              <Input type="number" v-model="formItem.name"></Input>
            </FormItem>
             <FormItem label="职位亮点：" style="width: 800px">
              <div class="light">
                <div class="item active">五险一金</div>
                <div class="item active">双休</div>
                <div class="item">餐补</div>
                <div class="item">通讯补助</div>
                <div class="item">交通补助</div>
                <div class="item">班车</div>
                <div class="item">年底双薪</div>
                <div class="item">带薪年假</div>
        
                <div class="item"><Icon type="md-add" />自定义标签</div>
              </div>
            </FormItem>
            <FormItem label="学历要求：" style="width: 500px">
              <Input v-model="formItem.name"></Input>
            </FormItem>
            <FormItem label="技术要求：" style="width: 500px">
              <Input v-model="formItem.name"></Input>
            </FormItem>
            <FormItem label="岗位职责：" style="width: 500px">
              <Input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                v-model="formItem.name"
              ></Input>
            </FormItem>
            <FormItem label="任职资格：" style="width: 500px">
              <Input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                v-model="formItem.name"
              ></Input>
            </FormItem>
          </Form>
        </div>
        <div class="bottom">
          <Button type="primary" class="leftbtn">暂存</Button>
          <Button type="primary" class="rightbtn">发布</Button>
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
      formItem: {},
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
.job-publish {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  .wrap {
    .top {
      background-color: #fff;
      .nav {
        color: #02a0f7;
        padding: 10px;
      }
      .baseInfo {
        display: flex;
        padding-left: 100px;
        .pic {
          width: 200px;
          height: 200px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .baseInfo-right {
          margin-left: 50px;
          padding-top: 20px;
          p {
            font-size: 26px;
            font-weight: bold;
            color: #333;
          }
          .item {
            padding: 10px 0 0 10px;
            .name {
              font-weight: bold;
              margin-right: 20px;
            }
          }
        }
      }
    }
    .middle {
      margin-top: 10px;
      background-color: #fff;
      .head {
        padding-left: 50px;
        font-size: 16px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
      }
      .formItem {
        padding: 20px 0 20px 100px;
        .machine {
          display: flex;
          .item {
            border: 1px solid #ddd;
            margin-right: 10px;
            padding: 0 10px;
          }
        }
        .light {
          display: flex;
          flex-wrap: wrap;
          .item {
            margin-bottom: 10px;
            border: 1px solid #ddd;
            margin-right: 10px;
            padding: 0 10px;
            border-radius: 5px;
          }
          .active {
            color: #02a0f7;
            border: 1px solid #02a0f7;
          }
        }
      }
    }
    .bottom {
      margin-top: 10px;
      background-color: #fff;
      text-align: center;
      padding: 50px 0;
      .leftbtn {
        margin-right: 50px;
        width: 180px;
      }
      .rightbtn {
        width: 180px;
      }
    }
  }
}
</style>
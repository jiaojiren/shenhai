<template>
  <div>
    <div>
      <ComNav num="2"></ComNav>
      <div class="manage">
        <div class="int1">
          <div class="left">
            <div class="wrap">
              <div
                class="item"
                :class="[type == 1 ? 'active' : '']"
                @click="toggle(1)"
              >
                普通用户
              </div>
              <div
                class="item"
                :class="[type == 2 ? 'active' : '']"
                @click="toggle(2)"
              >
                销售账号
              </div>
            </div>
          </div>
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>账号ID：</span>
                <Input placeholder="输入账号ID" />
              </div>
              <div class="item">
                <span>手机号：</span>
                <Input placeholder="输入手机号" />
              </div>
              <div class="item">
                <span>姓名：</span>
                <Input placeholder="输入姓名" />
              </div>
              <div class="item">
                <span>是否为专家：</span>
                <Select style="width: 80px">
                  <Option :value="1">是</Option>
                </Select>
              </div>
              <div class="item">
              <Button type="primary">搜索</Button>
              <Button style="margin-left: 10px">重置</Button>
            </div>
            </div>
            
            <div class="head">
              <div>共1000条记录</div>
              <Button type="primary">新建用户</Button>
            </div>
            <div class="table">
              <Table border :columns="column" :data="tableData"></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComNav from "@/components/console/comNav";
export default {
  data() {
    return {
      formItem: {
        name: "山东蓝翔",
        code: "12842132761",
        address: "山东省青岛市区路",
        area: "经营范围",
        xingzhi: "jjj",
        leixing: "hhh",
      },
      type: 1,
      column: [
        {
          type: 'index',
          title: '序号',
          align: 'center',
          width: '70px'
        },
        {
          title: "账号ID",
          align: "center",
          key: "name",
        },
        {
          title: "用户姓名",
          align: "center",
          key: "time",
        },
        {
          title: "部门",
          align: "center",
          key: "date",
        },
        {
          title: "专家",
          align: "center",
          key: "check",
          width: '70px'
        },
        {
          title: "手机号",
          align: "center",
          key: "jigou",
        },
        {
          title: "最近登录",
          align: "center",
          key: "link",
        },
        {
          title: "创建时间",
          align: "center",
          key: "link",
        },
        {
          title: "操作",
          align: "center",
          key: "link",
        },
      ],
      tableData: [
        {
          name: "jjj",
          time: "jjj",
          date: "jjj",
          check: "jjj",
          jigou: "jjj",
          link: "jjj",
        },
      ],
    };
  },
  components: {
    ComNav,
  },
  methods: {
    chooseUser() {},
    toggle(value) {
      this.type = value;
      //....
    },
  },
};
</script>

<style lang="less" scoped>
.manage {
  background-color: #f2f2f2;
  padding: 10px 0 50px;
  .int1 {
    
    padding: 0 50px;
    display: flex;
    .left {
      background-color: #fff;
      width: 110px;
      .wrap {
        padding: 10px 0;
        .item {
          text-align: center;
          height: 50px;
          font-size: 16px;
          line-height: 50px;
          cursor: pointer;
        }
        .active {
          color: #02a7f0;
        }
      }
    }
    .right {
      background-color: #fff;
      margin-left: 10px;
      padding: 20px;
      flex: 1;
      .filter {
        display: flex;
        .item {
          margin-right: 30px;
          display: flex;
          span {
            white-space: nowrap;
            line-height: 32px;
          }
        }
      }
      .head {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
      }
      .table {
        margin-top: 10px;
      }
    }
  }
}
</style>
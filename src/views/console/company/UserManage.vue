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
                <Input
                  v-model="queryCondition.UserName"
                  placeholder="输入账号ID"
                />
              </div>
              <div class="item">
                <span>手机号：</span>
                <Input
                  v-model="queryCondition.Phone"
                  placeholder="输入手机号"
                />
              </div>
              <div class="item">
                <span>姓名：</span>
                <Input v-model="queryCondition.Name" placeholder="输入姓名" />
              </div>
              <div class="item">
                <span>是否为专家：</span>
                <Select style="width: 80px" v-model="queryCondition.IsExpert">
                  <Option :value="0">否</Option>
                  <Option :value="1">是</Option>
                </Select>
              </div>
              <div class="item">
                <Button @click="GetCompanyList" type="primary">搜索</Button>
                <Button style="margin-left: 10px" @click="reset">重置</Button>
              </div>
            </div>

            <div class="head">
              <div>共1000条记录</div>
              <Button type="primary" @click="toNewUser">新建用户</Button>
            </div>
            <div class="table">
              <Table
                border
                :columns="column"
                :data="tableData"
                :loading="isLoading"
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  companyMemberPageList,
  companyMemeberStatus,

} from "@/api";
import ComNav from "@/components/console/comNav";
export default {
  data() {
    return {
      
      isLoading: false,
      queryCondition: {
        UserName: "",
        Name: "",
        Phone: "",
        IsExpert: null,
        TypeID2: null,
        pageNo: 1,
        pageSize: 10,
      },
      type: 1,
      column: [
        {
          type: "index",
          title: "序号",
          align: "center",
          width: "70px",
        },
        {
          title: "账号ID",
          align: "center",
          key: "UserName",
        },
        {
          title: "用户姓名",
          align: "center",
          key: "Name",
        },
        {
          title: "部门",
          align: "center",
          key: "Department",
        },
        {
          title: "专家",
          align: "center",
          key: "IsExpert",
          width: "70px",
        },
        {
          title: "手机号",
          align: "center",
          key: "Phone",
        },
        {
          title: "最近登录",
          align: "center",
          key: "LastLoginDate",
        },
        {
          title: "创建时间",
          align: "center",
          key: "CreateDate",
        },
        {
          title: "操作",
          align: "center",
          width: "200",
          render: (h, params) => {
            var activ1 = h(
              "Button",
              {
                props: {
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    companyMemeberStatus({
                      pk_Account: params.row.pk_Account,
                    }).then((res) => {
                      if (res.ercode == 0) {
                        this.$Message.success(res.data);
                        this.GetCompanyList();
                      } else {
                        this.$Message.error(res.msg);
                      }
                    });
                  },
                },
              },
              "启用"
            );
            var activ2 = h(
              "Button",
              {
                props: {
                  type: "warning",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    companyMemeberStatus({
                      pk_Account: params.row.pk_Account,
                    }).then((res) => {
                      if (res.ercode == 0) {
                        this.$Message.success(res.data);
                        this.GetCompanyList();
                      } else {
                        this.$Message.error(res.msg);
                      }
                    });
                  },
                },
              },
              "禁用"
            );
            var edit = h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {},
                },
              },
              "编辑"
            );
            var del = h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    consolCorDeleteByPk({
                      pk_Company_Cor: params.row.pk_Company_Cor,
                    }).then((res) => {
                      if (res.ercode == 0) {
                        this.$Message.success(res.data);
                        this.Condition.pageNo = 1;
                        this.GetConsolCorPageList();
                      } else {
                        this.$Message.error(res.msg);
                      }
                    });
                  },
                },
              },
              "删除"
            );
            let activ = null;
            if (params.row.TypeID2 == 3) {
              activ = null;
            } else if (params.row.TypeID2 == 4) {
              activ = params.row.StatusID == 0 ? activ1 : activ2;
            }
            return h("div", [edit, activ, del]);
          },
        },
      ],
      tableData: [],
    };
  },
  components: {
    ComNav,
  },
  mounted() {
    if (Number(this.$route.query.type)) {
      this.type = Number(this.$route.query.type);
    }
    this.queryCondition.TypeID2 = this.type == 1 ? "3" : "4";
    this.GetCompanyList();
  },
  methods: {
    // 重置
    reset() {
      this.queryCondition = {
        UserName: "",
        Name: "",
        Phone: "",
        IsExpert: null,
        TypeID2: null,
        pageNo: 1,
        pageSize: 10,
      };
      this.queryCondition.TypeID2 = this.type == 1 ? "3" : "4";
      this.GetCompanyList()
    },

    // 用户列表
    GetCompanyList() {
      this.isLoading = true;
      companyMemberPageList(this.queryCondition).then((res) => {
        this.isLoading = false;
        if (res.ercode == 0) {
          this.tableData = res.data.entities;
        }
      });
    },
    chooseUser() {},
    toggle(value) {
      this.type = value;
      this.queryCondition.TypeID2 = this.type == 1 ? "3" : "4";
      this.GetCompanyList();
    },
    toNewUser() {
      this.$router.push({
        path: "/console/addUser",
        query: { type: this.type },
      });
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
      flex-shrink: 0; //避免被flex:1挤压
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
      flex-basis: 0;
      flex-grow: 1;
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
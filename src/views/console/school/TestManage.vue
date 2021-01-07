<template>
  <div>
    <div>
      <SchNav num="5"></SchNav>
      <div class="manage">
        <div class="int1">
          <div class="left">
            <div class="wrap">
              <div
                class="item"
                :class="[type == 1 ? 'active' : '']"
                @click="toggle(1)"
              >
                考试设置
              </div>
              <div
                class="item"
                :class="[type == 2 ? 'active' : '']"
                @click="toggle(2)"
              >
                考试统计
              </div>
              <div
                class="item"
                :class="[type == 3 ? 'active' : '']"
                @click="toggle(3)"
              >
                阅卷管理
              </div>
            </div>
          </div>
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>考试类型：</span>
                <Select style="width: 80px">
                  <Option :value="1">阶段考试</Option>
                </Select>
              </div>
              <div class="item">
                <span>设备系列：</span>
                <Input placeholder="输入设备系列" />
              </div>
              <div class="item">
                <span>设备型号：</span>
                <Input placeholder="输入设备型号" />
              </div>
              <div class="item">
                <Button type="primary">搜索</Button>
                <Button style="margin-left: 10px">重置</Button>
              </div>
            </div>

            <div class="head">
              <div>共1000条记录</div>
              <div>
                <Button type="primary" style="margin-right: 10px"
                  >新增考试</Button
                >
                <Button type="primary">导出excel</Button>
              </div>
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
import SchNav from "@/components/console/schNav";
export default {
  data() {
    return {
      type: 1,
      column: [
        {
          type: "index",
          title: "序号",
          align: "center",
          width: "70px",
        },
        {
          title: "设备型号",
          align: "center",
          key: "name",
        },
        {
          title: "设备系列",
          align: "center",
          key: "time",
        },
        {
          title: "学习人数",
          align: "center",
          key: "date",
        },
        {
          title: "考试类型",
          align: "center",
          key: "jigou",
        },
        {
          title: "考试时间",
          align: "center",
          key: "link",
        },
        {
          title: "通过分数",
          align: "center",
          key: "link",
        },
        {
          title: "题库",
          align: "center",
          key: "link",
        },
        {
          title: "操作",
          align: "center",
          width: "190",
          render: (h, params) => {
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
            var down = h(
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
              "下架"
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
            return h("div", [edit, down, del]);
          },
        },
        {
          title: "查看详情",
          align: "center",
          width: "200",
          render: (h, params) => {
            var del = h(
              "a",
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
              "查看详情"
            );

            return h("div", [del]);
          },
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
    SchNav,
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
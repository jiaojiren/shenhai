<template>
  <div>
    <div>
      <SchNav num="1"></SchNav>
      <div class="manage">
        <div class="int1">
          <div class="left">
            <div class="wrap">
              <div
                class="item"
                :class="[type == 1 ? 'active' : '']"
                @click="toggle(1)"
              >
                学习统计
              </div>
              <div
                class="item"
                :class="[type == 2 ? 'active' : '']"
                @click="toggle(2)"
              >
                实习统计
              </div>
              <div
                class="item"
                :class="[type == 3 ? 'active' : '']"
                @click="toggle(3)"
              >
                毕业统计
              </div>
            </div>
          </div>
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>学生姓名：</span>
                <Input placeholder="输入学生姓名" />
              </div>
              <div class="item">
                <span>学生学号：</span>
                <Input placeholder="输入学生学号" />
              </div>
              <div class="item">
                <span>专业：</span>
                <Select style="width: 80px">
                  <Option :value="1">专业1</Option>
                </Select>
              </div>
              <div class="item">
                <Button type="primary">搜索</Button>
                <Button style="margin-left: 10px">重置</Button>
              </div>
            </div>

            <div class="head">
              <div>共1000条记录</div>
              <Button type="primary">导出excel</Button>
            </div>
            <div class="table">
              <Table border :columns="column" :data="tableData" :loading="isLoading"></Table>
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
      isLoading: true,
      column: [
        {
          type: "index",
          title: "序号",
          align: "center",
          width: "70px",
        },
        {
          title: "姓名",
          align: "center",
          key: "name",
        },
        {
          title: "学号",
          align: "center",
          key: "time",
        },
        {
          title: "专业",
          align: "center",
          key: "date",
        },
        {
          title: "设备系列",
          align: "center",
          key: "check",
        },
        {
          title: "设备型号",
          align: "center",
          key: "jigou",
        },
        {
          title: "学习进度",
          align: "center",
          key: "link",
        },
        {
          title: "阶段考试分数",
          align: "center",
          key: "link",
        },
        {
          title: "结课考试分数",
          align: "center",
          key: "link",
        },
        {
          title: "认证结果",
          align: "center",
          width: '200',
          render: (h, params) => {
            var edit = h(
              "div",
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
              "无认证"
            );
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
              "查看认证"
            );
          
            return h("div", [del]);
          },
        },
      ],
      tableData: [],
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
<template>
  <div>
    <div>
      <ComNav num="5"></ComNav>
      <div class="manage">
        <div class="int1">
          <div class="left">
            <div class="wrap">
              <div
                class="item"
                :class="[type == 1 ? 'active' : '']"
                @click="toggle(1)"
              >
                基地管理
              </div>
              <div
                class="item"
                :class="[type == 2 ? 'active' : '']"
                @click="toggle(2)"
              >
                实训需求
              </div>
              <div
                class="item"
                :class="[type == 3 ? 'active' : '']"
                @click="toggle(3)"
              >
                入厂申请
              </div>
            </div>
          </div>
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>设备系列：</span>
                <Input placeholder="输入设备系列" />
              </div>
              <div class="item">
                <span>设备型号：</span>
                <Input placeholder="输入手机号" />
              </div>
              <div class="item">
                <span>课程状态：</span>
                <Select style="width: 80px">
                  <Option :value="1">可授课</Option>
                </Select>
              </div>
              <div class="item">
                <Button type="primary">搜索</Button>
                <Button style="margin-left: 10px">重置</Button>
              </div>
            </div>

            <div class="head">
              <div>共1000条记录</div>
              <Button type="primary">添加设备信息</Button>
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
          title: "基地名称",
          align: "center",
          key: "name",
        },
        {
          title: "区域",
          align: "center",
          key: "time",
        },
        {
          title: "联系人",
          align: "center",
          key: "date",
        },
        {
          title: "联系方式",
          align: "center",
          key: "check",
        },
        {
          title: "规模",
          align: "center",
          key: "jigou",
        },
        {
          title: "主要设备",
          align: "center",
          key: "link",
        },
        {
          title: "操作",
          align: "center",
          width: "200",
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

            return h("div", [edit, del]);
          },
        },

        {
          title: "查看详情",
          align: "center",
          width: "100",
          render: (h, params) => {
            return h(
              "a",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                on: {
                  click: () => {},
                },
              },
              "查看"
            );
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
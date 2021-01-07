<template>
  <div>
    <div>
      <SchNav num="2"></SchNav>
      <div class="manage">
        <div class="int1">
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>姓名：</span>
                <Input placeholder="输入姓名" />
              </div>
              <div class="item">
                <span>学校：</span>
                <Select style="width: 80px">
                  <Option :value="1">惠州学院</Option>
                </Select>
              </div>
              <div class="item">
                <span>学院：</span>
                <Select style="width: 80px">
                  <Option :value="1">计算机</Option>
                </Select>
              </div>
              

              <div class="item">
                <Button type="primary">搜索</Button>
                <Button style="margin-left: 10px">重置</Button>
              </div>
            </div>

            <div class="head">
              <div>共1000条记录</div>
              <div>
                <Button
                  style="margin-right: 10px"
                  type="primary"
                  @click="toAddMema"
                  >新建专家信息</Button
                >
                <Button type="primary" @click="toAddMema">导出excel</Button>
              </div>
            </div>
            <div class="table">
              <Table border :columns="column" :data="tableData"></Table>
              <div style="text-align: right; margin-top: 10px">
                <Page
                  :total="entityCount"
                  :page-size="Condition.pageSize"
                  :show-total="true"
                  :current="Condition.pageNo"
                  @on-change="changePage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  consolCorPageList,
  consolCorDeleteByPk,
  corGetCompIndustryList,
} from "@/api";
import SchNav from "@/components/console/schNav";
export default {
  data() {
    return {
      entityCount: null,
      Condition: {
        pageNo: 1,
        pageSize: 10,
        CompanyName: "",
        CompIndustry: "",
        StatusID: 1,
      },
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
          key: "CompanyName",
          tooltip: "true",
        },
        {
          title: "联系方式",
          align: "center",
          key: "CompType",
          tooltip: "true",
        },
        {
          title: "学院",
          align: "center",
          key: "CompIndustry",
          tooltip: "true",
        },

        {
          title: "操作",
          align: "center",
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
      ],
      tableData: [],
    };
  },
  components: {
    SchNav,
  },
  mounted() {
    this.GetConsolCorPageList();
  },
  methods: {
    //获取行业分类
    getIndustryLabel() {
      corGetCompIndustryList().then((res) => {
        console.log(res);
      });
    },
    // 添加合作企业
    toAddMema() {
      this.$router.push({ name: "ConsoleAddCooperator" });
    },
    // 获取列表
    GetConsolCorPageList() {
      consolCorPageList(this.Condition).then((res) => {
        if (res.ercode == 0) {
          let temp = [];
          res.data.entities.forEach((item, index) => {
            let tempp = Object.assign(item, item.PartyBInfo);
            temp.push(tempp);
          });
          this.tableData = temp;
          this.entityCount = res.data.entityCount;
        }
      });
    },
    addCooperate() {
      this.$router.push({ name: "AddCooperator" });
    },
    changePage(pageNo) {
      this.Condition.pageNo = pageNo;
      this.GetConsolCorPageList();
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
    .right {
      background-color: #fff;
      margin-left: 10px;
      padding: 20px;

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
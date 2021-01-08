<template>
  <div>
    <div>
      <SchNav num="6"></SchNav>
      <div class="manage">
        <div class="int1">
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>设备系列：</span>
                <Select style="width: 180px">
                  <Option :value="1">设备系列1</Option>
                </Select>
              </div>
              <div class="item">
                <span>设备型号：</span>
                <Input placeholder="输入设备型号" />
              </div>
              <div class="item">
                <span>考试类型：</span>
                <Select style="width: 180px">
                  <Option :value="1">阶段考试</Option>
                </Select>
              </div>
              <div class="item">
                <span>考试阶段分数：</span>
                <Select style="width: 180px">
                  <Option :value="1">0~60分</Option>
                </Select>
              </div>
              <div class="item">
                <span>证书类型：</span>
                <Select style="width: 180px">
                  <Option :value="1">优秀证书</Option>
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
          title: "学生姓名",
          align: "center",
          key: "CompanyName",
          tooltip: "true",
        },
        {
          title: "学号",
          align: "center",
          key: "CompType",
          tooltip: "true",
        },
        {
          title: "专业",
          align: "center",
          key: "CompIndustry",
          tooltip: "true",
        },
        {
          title: "设备系列",
          align: "center",
          key: "CompIndustry",
          tooltip: "true",
        },
        {
          title: "设备型号",
          align: "center",
          key: "CompIndustry",
          tooltip: "true",
        },
        {
          title: "考试类型",
          align: "center",
          key: "CompIndustry",
          tooltip: "true",
        },
        {
          title: "考试时间",
          align: "center",
          key: "CompIndustry",
          tooltip: "true",
        },
        {
          title: "考试分数",
          align: "center",
          key: "CompIndustry",
          tooltip: "true",
        },
        {
          title: "证书",
          align: "center",
          key: "CompIndustry",
          tooltip: "true",
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
        flex-wrap: wrap;
        .item {
          margin-right: 30px;
          margin-bottom: 20px;
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
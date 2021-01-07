<template>
  <div>
    <div>
      <ComNav num="3"></ComNav>
      <div class="manage">
        <div class="int1">
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>企业名称：</span>
                <Input placeholder="输入公司名称" />
              </div>
              <div class="item">
                <span>行业分类：</span>
                <Select style="width: 80px">
                  <Option :value="1">制造业</Option>
                </Select>
              </div>
              <div class="item">
                <span>省：</span>
                <Select style="width: 80px">
                  <Option :value="1">山东</Option>
                </Select>
              </div>
              <div class="item">
                <span>市区：</span>
                <Select style="width: 80px">
                  <Option :value="1">济南市</Option>
                </Select>
              </div>
              <div class="item">
                <span>状态：</span>
                <Select style="width: 80px">
                  <Option :value="1">停止合作</Option>
                </Select>
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
              <Button type="primary" @click="toAddMema">添加合作企业</Button>
            </div>
            <div class="table">
              <Table border :columns="column" :data="tableData" :loading="isLoading"></Table>
              <div style="text-align: right; margin-top: 10px;">
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
import { consolCorPageList, consolCorDeleteByPk, corGetCompIndustryList } from "@/api";
import ComNav from "@/components/console/comNav";
export default {
  data() {
    return {
      isLoading: false,
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
          title: "企业名称",
          align: "center",
          key: "CompanyName",
          tooltip: 'true',
        },
        {
          title: "企业性质",
          align: "center",
          key: "CompType",
          tooltip: 'true',
        },
        {
          title: "所属行业",
          align: "center",
          key: "CompIndustry",
          tooltip: 'true',
        },
        {
          title: "合作代表",
          align: "center",
          key: "ContactName",
          tooltip: 'true',
        },
        {
          title: "联系方式",
          align: "center",
          key: "ContactPhone",
          tooltip: 'true',
        },
        {
          title: "初次合作时间",
          align: "center",
          key: "link",
          tooltip: 'true',
        },
        {
          title: "合作设备",
          align: "center",
          key: "link",
          tooltip: 'true',
        },
        {
          title: "合作状态",
          align: "center",
          width: '100',
          render: (h, params) => {
            var h1 = h(
              "Tag",
              {
                props: {
                  color: "blue",
                },
              },
              "合作中"
            );
            var h2 = h(
              "Tag",
              {
                props: {
                  color: "error",
                },
              },
              "已结束"
            );
            var status = params.row.StatusID;
            if (1 == status) {
              return h1;
            }
            if (2 == status) {
              return h2;
            }

          },
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
                    consolCorDeleteByPk({pk_Company_Cor: params.row.pk_Company_Cor}).then(res=>{
                      if(res.ercode == 0){
                        this.$Message.success(res.data)
                        this.Condition.pageNo = 1;
                         this.GetConsolCorPageList();
                      }else {
                        this.$Message.error(res.msg)
                      }
                    })
                  },
                },
              },
              "删除"
            );
            return h("div", [edit,del]);

          },
        },
        {
          title: "查看详情",
          align: "center",
          width: '100',
          render: (h, params) => {
            return h(
              "a",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                on: {
                  click: () => {
                  },
                },
              },
              "查看"
            );
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
    this.GetConsolCorPageList();
  },
  methods: {
    //获取行业分类
    getIndustryLabel(){
      corGetCompIndustryList().then(res=>{
        console.log(res)
      })
    },
    // 添加合作企业
    toAddMema(){
      this.$router.push({name: 'ConsoleAddCooperator'})
    },
    // 获取列表
    GetConsolCorPageList() {
      this.isLoading = true
      consolCorPageList(this.Condition).then((res) => {
        this.isLoading = false
        if (res.ercode == 0) {
          let temp = [];
          res.data.entities.forEach((item,index)=>{
            let tempp = Object.assign(item,item.PartyBInfo)
            temp.push(tempp)
          })
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
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
                <Button type="primary" style="margin-right: 10px" @click="toAddTest"
                  >新增考试</Button
                >
                <Button type="primary">导出excel</Button>
              </div>
            </div>
            <div class="table">
              <Table border :columns="column" :data="testData" :loading="isLoading"></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {pageListConExam, changeConSchExamStatus} from "@/api"
import SchNav from "@/components/console/schNav";
export default {
  data() {
    return {
      type: 1,
      isLoading: false,
      queryCondition: {
        pageNo:1,
        pageSize:10,
        StartDate:"",
        ExamTypeStr:"",
        MachineSeries:0,
        MachineName:""
      },
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
          key: "MachineName",
        },
        {
          title: "设备系列",
          align: "center",
          key: "MachineSeriesName",
        },
        {
          title: "学习人数",
          align: "center",
          key: "date",
          width: '100'
        },
        {
          title: "考试类型",
          align: "center",
          key: "ExamTypeStr",
        },
        {
          title: "考试时间",
          align: "center",
          key: "StartDate",
        },
        {
          title: "通过分数",
          align: "center",
          key: "PassLine",
          width: '100'
        },
        {
          title: "题库",
          align: "center",
          width: '100',
          render: (h,params) => {
            var edit = h(
              "a",
              {
                props: {
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
              "编辑题库"
            );
            return h("div", [edit])
          }
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
                  type: "warning",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    changeConSchExamStatus({
                      pk_Exam: params.row.pk_Exam,
                    }).then((res) => {
                      if (res.ercode == 0) {
                        this.$Message.success(res.data);
                        this.GetTextList();
                      } else {
                        this.$Message.error(res.msg);
                      }
                    });
                  },
                },
              },
              "下架"
            );
            var up = h(
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
                     changeConSchExamStatus({
                      pk_Exam: params.row.pk_Exam,
                    }).then((res) => {
                      if (res.ercode == 0) {
                        this.$Message.success(res.data);
                        this.GetTextList();
                      } else {
                        this.$Message.error(res.msg);
                      }
                    })
                  },
                },
              },
              "上架"
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
            let updown = null
            if(params.row.StatusID == 1){
              updown = down
            }else {
              updown = up
            }
            return h("div", [edit, updown, del]);
          },
        },
        {
          title: "查看详情",
          align: "center",
          width: "100",
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
      testData: [],
    };
  },
  components: {
    SchNav,
  },
  mounted(){
    this.GetTextList()
  },
  methods: {
    // 获取考试列表
    GetTextList(){
      this.isLoading = true
      pageListConExam(this.queryCondition).then(res=>{
        this.isLoading = false
        if(res.ercode == 0){
          this.testData = res.data.entities
        }
      })
    },
    toggle(value) {
      this.type = value;
      //....
    },
    toAddTest(){
      this.$router.push({path: '/console/addTest'})
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
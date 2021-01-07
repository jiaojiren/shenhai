<template>
  <div>
    <div>
      <SchNav num="3"></SchNav>
      <div class="manage">
        <div class="int1">
          <div class="left">
            <div class="wrap">
              <div
                class="item"
                :class="[type == 1 ? 'active' : '']"
                @click="toggle(1)"
              >
                设备课程
              </div>
              <div
                class="item"
                :class="[type == 2 ? 'active' : '']"
                @click="toggle(2)"
              >
                专家培训
              </div>
            </div>
          </div>
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>设备系列：</span>
                <Select style="width: 80px">
                  <Option :value="1">设备系列1</Option>
                </Select>
              </div>
              <div class="item">
                <span>设备型号：</span>
                <Input placeholder="输入学生姓名" />
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
                  @click="showModal"
                  >上传新课程</Button
                >
                <Button type="primary">导出excel</Button>
              </div>
            </div>
            <div class="table">
              <Table border :columns="column" :data="tableData" :loading="isLoading"></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal"
      title="上传设备信息"
      :mask-closable="false"
      @on-ok="addCourser"
      @on-cancel="clear"
    >
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="100"
        label-position="left"
      >
        <FormItem label="设备厂：">
          <Select
            v-model="companyNo"
            style="width: 260px"
            @on-change="chooseMachine"
          >
            <Option
              v-for="item in companyList"
              :value="item.CompanyNo"
              :key="item.pk_Company"
              >{{ item.CompanyName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="设备系列：">
          <Select v-model="machineType" style="width: 260px" @on-change="chooseMachine">
            <Option
              v-for="item in machineSeries"
              :value="item.pk_MachineSeries"
              :key="item.SeriesName"
              >{{ item.SeriesName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="设备名称：">
          <Select v-model="formItem.Machine" style="width: 260px">
            <Option
              v-for="item in machineList"
              :value="item.pk_Machine"
              :key="item.pk_Machine"
              >{{ item.MachineName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="课程学时：">
          <Input
            type="number"
            v-model="formItem.Periods"
            placeholder="请输入课程学时"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  listConCourseSch,
  saveCourse,
  getMachineSeries,
  getCompanyList,
  getMachineList,
  changeCourseConSchool,
  removeCourseConSchool,
} from "@/api";
import SchNav from "@/components/console/schNav";
export default {
  data() {
    return {
      type: 1,
      isLoading: false,
      machineSeries: [],
      companyList: [],
      machineList: [],
      machineType: "",
      companyNo: "",
      modal: false,
      formItem: {
        Machine: "",
        Periods: 0,
        MachinePicList: ["http://baidu.com"],
      },
      queryCondition: {
        MachineSeries: 0,
        CourseStatus: 0,
        MachineName: "",
        pageNo: 1,
        pageSize: 10,
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
          title: "设备厂",
          align: "center",
          key: "date",
        },
        {
          title: "学习人数",
          align: "center",
          key: "check",
        },
        {
          title: "课时",
          align: "center",
          key: "jigou",
        },
        {
          title: "阶段考试数",
          align: "center",
          key: "link",
        },
        {
          title: "结课考试数",
          align: "center",
          key: "link",
        },
        {
          title: "认证通过数",
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
                  type: "warning",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    changeCourseConSchool({ pk_Course: params.row.pk_Course}).then(res=>{
                      if(res.ercode == 0){
                        this.$Message.success(res.data)
                        this.ListConCourseSch()
                      }else {
                        this.$Message.error(res.msg)
                      }
                    })
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
                    changeCourseConSchool({ pk_Course: params.row.pk_Course}).then(res=>{
                      if(res.ercode == 0){
                        this.$Message.success(res.data)
                        this.ListConCourseSch()
                      }else {
                        this.$Message.error(res.msg)
                      }
                    })
                  },
                },
              },
              "上架"
            );
            let updown = null
            if(params.row.CourseStatus == 1){
              updown = down
            }else {
              updown = up
            }
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
                    removeCourseConSchool({ pk_Course: params.row.pk_Course}).then(res=>{
                      if(res.ercode == 0){
                        this.$Message.success(res.data)
                        this.ListConCourseSch()
                      }else {
                        this.$Message.error(res.msg)
                      }
                    })
                  },
                },
              },
              "删除"
            );
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
      tableData: [],
    };
  },
  components: {
    SchNav,
  },
  mounted() {
    this.ListConCourseSch();
  },
  methods: {
    // 获取公司列表
    GetCompanyList() {
      getCompanyList({ TypeID2: 2 }).then((res) => {
        if (res.ercode == 0) {
          this.companyList = res.data;
        }
      });
    },
    // 获取设备系列
    GetMachineSeries() {
      getMachineSeries().then((res) => {
        if (res.ercode == 0) {
          this.machineSeries = res.data;
        }
      });
    },
    // 设备列表
    chooseMachine() {
      if (this.machineType  && this.companyNo ) {
        this.GetMachineList();
      }else {
        this.machineList = []
      }
    },
    // 获取设备列表
    GetMachineList() {
      getMachineList({
        CompanyNo: this.companyNo,
        MachineSeries: this.machineType,
      }).then((res) => {
        if (res.ercode == 0) {
          this.machineList = res.data;
        }
      });
    },
    clear() {
      this.formItem = {
        Machine: "",
        Periods: null,
      };
    },
    // 打开新建课程的弹窗
    showModal() {
      this.modal = true;
      this.GetCompanyList();
      this.GetMachineSeries();
    },
    // 添加课程
    addCourser() {
      saveCourse(this.formItem).then((res) => {
        if (res.ercode == 0) {
          this.$Message.success(res.data)
          this.ListConCourseSch()
        }else {
          this.$Message.error(res.msg)
        }
      });
    },
    // 课程列表
    ListConCourseSch() {
      this.isLoading = true
      listConCourseSch(this.queryCondition).then((res) => {
        this.isLoading = false;
        if (res.ercode == 0) {
          this.tableData = res.data.entities;
        }
      });
    },
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
<template>
  <div>
    <div>
      <ComNav num="4"></ComNav>
      <div class="manage">
        <div class="int1">
          <div class="left">
            <div class="wrap">
              <div
                class="item"
                :class="[type == 1 ? 'active' : '']"
                @click="toggle(1)"
              >
                设备管理
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
              <Button type="primary" @click="showModal">添加设备信息</Button>
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
      @on-ok="addMachineInfo"
      @on-cancel="clear"
    >
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="100"
        label-position="left"
      >
        <FormItem label="设备名称：">
          <Input
            v-model="formItem.MachineName"
            placeholder="请输入设备名称"
          ></Input>
        </FormItem>
        <FormItem label="设备系列：">
          <Select v-model="formItem.MachineSeries" style="width: 200px">
            <Option
              v-for="item in machineLabel"
              :value="item.pk_MachineSeries"
              :key="item.pk_MachineSeries"
              >{{ item.SeriesName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="学习文档：">
          <Upload
            ref="upload"
            style="width: 96%"
            name="file"
            :on-success="handleUploadSuccess1"
            :on-remove="handleUploadRemove1"
            :action="$publicPath + '/file/uploadFile'"
            :max-size="10240"
            :default-file-list="fileUrlList1"
          >
            <Button icon="ios-cloud-upload-outline">上传文档</Button>
          </Upload>
        </FormItem>
        <FormItem label="3D图纸：">
          <Upload
            ref="upload"
            style="width: 96%"
            name="file"
            :on-success="handleUploadSuccess2"
            :on-remove="handleUploadRemove2"
            :action="$publicPath + '/file/uploadFile'"
            :max-size="10240"
            :default-file-list="fileUrlList2"
          >
            <Button icon="ios-cloud-upload-outline">上传图纸</Button>
          </Upload>
        </FormItem>
        <FormItem label="合作企业：" v-if="modal">
          <Select
            v-model="formItem.CorCompanyList"
            multiple
            style="width: 260px"
          >
            <Option
              v-for="item in corCompanyLabel"
              :value="item.CompanyNo"
              :key="item.pk_Company"
              >{{ item.CompanyName }}</Option
            >
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  pageListConCourse,
  saveConMachine,
  getMachineSeries,
  getCompanyCorList,
  changeCourseConComp,
  removeCourseConComp,
} from "@/api";
import ComNav from "@/components/console/comNav";
export default {
  data() {
    return {
      //编辑设备信息 start
      modal2: false,
      //编辑设备信息 end
      // 添加设备信息 start
      modal: false,
      corCompanyLabel: [],
      machineLabel: [],
      formItem: {
        //发布设备信息参数
        MachineName: "",
        MachineSeries: "1",
        CourseFileList: [],
        CorCompanyList: [],
        DrawingList: [],
      },
      fileUrlList1: [],
      fileUrlList2: [],
      // 添加设备信息 end
      // 设备管理列表 start
      isLoading: false,
      queryCondition: {
        MachineSeries: 0,
        CourseStatus: 0,
        MachineName: "1",
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
          title: "课程状态",
          align: "center",
          key: "StatusID",
        },
        {
          title: "合作企业",
          align: "center",
          key: "check",
        },
        {
          title: "学习人数",
          align: "center",
          key: "jigou",
        },
        {
          title: "收藏量",
          align: "center",
          key: "link",
        },
        {
          title: "专家培训次数",
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
                  click: () => {

                  },
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
                    // 删除课程
                    removeCourseConComp({pk_Course: params.row.pk_Course}).then(res=>{
                      if(res.ercode == 0){
                        this.$Message.success(res.data)
                        this.PageListConCourse()
                      }else {this.$Message.error(res.msg)}
                    })
                  },
                },
              },
              "删除"
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
                    changeCourseConComp({ pk_Course: params.row.pk_Course}).then(res=>{
                      if(res.ercode == 0){
                        this.$Message.success(res.data)
                        this.PageListConCourse()
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
                  type: "",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    changeCourseConComp({ pk_Course: params.row.pk_Course}).then(res=>{
                      if(res.ercode == 0){
                        this.$Message.success(res.data)
                        this.PageListConCourse()
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
            return h("div", [edit, updown, del]);
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
      tableData: [],
      // 设备管理列表 end
      type: 1,
    };
  },
  components: {
    ComNav,
  },
  mounted() {
    this.GetMachineSeries();
    this.PageListConCourse();
  },
  methods: {
    
    showModal() {
      this.modal = true;
      this.GetCorCompanyLabel();
    },
    // 获取合作公司列表
    GetCorCompanyLabel() {
      getCompanyCorList({ pageNo: 1 }).then((res) => {
        if (res.ercode == 0) {
          this.corCompanyLabel = res.data;
        }
      });
    },
    // 获取设备类别
    GetMachineSeries() {
      getMachineSeries().then((res) => {
        if (res.ercode == 0) {
          this.machineLabel = res.data;
        }
      });
    },
    clear() {
      this.formItem = {
        MachineName: "",
        MachineSeries: null,
        CourseFileList: [],
        CorCompanyList: [],
        DrawingList: [],
      };
      this.fileUrlList1 = [];
      this.fileUrlList2 = [];
    },
    // 上传设备信息
    addMachineInfo() {
      saveConMachine(this.formItem).then((res) => {
        if (res.ercode == 0) {
          this.$Message.success(res.data);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    toggle(value) {
      this.type = value;
      //....
    },
    PageListConCourse() {
      this.isLoading = true
      pageListConCourse(this.queryCondition).then((res) => {
        this.isLoading = false
        if (res.ercode == 0) {
          this.tableData = res.data.entities;
        }
      });
    },
    handleUploadSuccess1(file) {
      if (file.ercode == 0) {
        this.formItem.CourseFileList.push(file.data);
        var item = file.data;
        var hadFile = {};
        hadFile.name = item.match(/([^/*.]+)\.\w+$/)[0];
        hadFile.url = item;
        this.fileUrlList1.push(hadFile);
      } else {
        this.$Message.warning(file.msg);
      }
    },
    handleUploadRemove1(fileList) {
      this.formItem.CourseFileList.forEach((item, index) => {
        if (item == fileList.url) {
          this.formItem.CourseFileList.splice(index, 1);
          this.fileUrlList1.splice(index, 1);
        }
      });
    },
    handleUploadSuccess2(file) {
      if (file.ercode == 0) {
        this.formItem.DrawingList.push(file.data);
        var item = file.data;
        var hadFile = {};
        hadFile.name = item.match(/([^/*.]+)\.\w+$/)[0];
        hadFile.url = item;
        this.fileUrlList2.push(hadFile);
      } else {
        this.$Message.warning(file.msg);
      }
    },
    handleUploadRemove2(fileList) {
      this.formItem.DrawingList.forEach((item, index) => {
        if (item == fileList.url) {
          this.formItem.DrawingList.splice(index, 1);
          this.fileUrlList2.splice(index, 1);
        }
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
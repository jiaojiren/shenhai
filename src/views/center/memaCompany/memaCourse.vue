<template>
  <div>
    <div>
      <div class="ccenter">
        <div class="left">
          <MemaComBar num="3" />
          <div class="group">
            <p>分组类别：</p>
            <div
              class="item"
              v-for="(item, index) in machineLabel"
              :key="index"
            >
              {{ item.SeriesName }}
            </div>
          </div>
          <div class="list">
            <div class="item" v-for="item in list" :key="item.pk_Course">
              <div class="pic">
                <img
                  v-if="item != null"
                  src="@/assets/images/center/u72.svg"
                  alt=""
                /><img v-else src="@/assets/images/center/u72.svg" alt="" />
              </div>
              <div class="pro">
                <p class="title">{{item.MachineName}}</p>
                <div class="status">
                  <Tag color="warning">AR课程</Tag>
                  <Tag color="warning">PPT</Tag>
                </div>
                <div class="type">
                  <span style="margin-right: 40px">课时：7课时</span>
                </div>
                <div class="area">
                  <span>课程播放次数：2000次</span>
                  <span style="margin: 0 40px">PPT下载次数：2000次</span>
                  <span>收藏量：3000</span>
                </div>
              </div>
              <div class="opt">
                <div class="cate">
                  <span>选择分组</span>
                  <Select v-model="type" style="width: 100px">
                    <Option
                      v-for="(item, index) in machineLabel"
                      :value="item.SeriesName"
                      :key="index"
                      >{{ item }}</Option
                    >
                  </Select>
                </div>

                <div class="del" @click="delCourse(item.pk_Course)">
                  <Icon type="ios-trash" size="18" /><span
                    style="font-size: 12px"
                    >删除</span
                  >
                </div>
              </div>
            </div>
            <div style="text-align: right; margin-top: 10px">
              <Page
                :total="entityCount"
                :page-size="queryCondition.pageSize"
                :show-total="true"
                :current="queryCondition.pageNo"
                @on-change="changePage"
              />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="btn" @click="showModal">上传设备信息</div>
          <div class="table">
            <p>课程中心</p>
            <div class="wrap">
              <div class="item">昨日浏览量</div>
              <div class="item">昨日收藏量</div>
              <div class="item">昨日下载量</div>
              <div class="item">昨日学习量</div>
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
import { getMachineSeries, saveMachine, getCompanyCorList, pageListCourse, removeCoursePri } from "@/api";
import MemaComBar from "@/components/center/memaComBar";
export default {
  data() {
    return {
      type: '',
      machineLabel: [],
      list: [],
      Condition: {
        pageNo: 1,
        pageSize: 10,
      },
      entityCount: null,
      modal: false,
      queryCondition: {
        MachineSeries:0,
        CourseStatus:0,
        pageNo:1,
        pageSize:10
      },
      formItem: {     //发布设备信息参数
        MachineName: "",
        MachineSeries: "1",
        CourseFileList: [],
        CorCompanyList: [],
        DrawingList: [],
      },
      fileUrlList1: [],
      fileUrlList2: [],
      corCompanyLabel: [], // 合作公司列表
    };
  },
  components: {
    MemaComBar,
  },
  mounted() {
    this.GetMachineSeries();
    this.GetageListCourse()
  },
  methods: {
    // 删除课程
    delCourse(id){
      removeCoursePri({pk_Course: id}).then(res=>{
        if(res.ercode == 0){
          this.$Message.success(res.data)
          this.GetageListCourse()
        }else {this.$Message.error(res.msg)}
      })
    },
    // 获取课程列表
    GetageListCourse(){
      pageListCourse(this.queryCondition).then(res=>{
        if(res.ercode == 0){
          this.list = res.data.entities;
          this.entityCount = res.data.entityCount
        }
      })
    },
    // 上传设备信息
    addMachineInfo() {
      saveMachine(this.formItem).then((res) => {
        if (res.ercode == 0) {
          this.$Message.success(res.data);
        } else {
          this.$Message.error(res.msg);
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
    changePage(pageNo) {
      this.queryCondition.pageNo = pageNo;
      this.GetageListCourse();
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

<style lang='less' scoped>
.group {
  display: flex;
  padding-left: 50px;
  height: 50px;
  border-bottom: 1px solid #ddd;
  line-height: 50px;
  div {
    margin-right: 20px;
    cursor: pointer;
  }
}
.list {
  padding: 0 20px 20px 20px;
  .item {
    padding: 20px 0;
    display: flex;
    border-bottom: 1px solid #ddd;
    .pic {
      width: 135px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pro {
      flex: 1;
      padding-left: 20px;
      .title {
        color: #333;
        font-weight: bold;
        font-size: 16px;
      }
      .status {
        margin: 10px 0 20px 0;
      }
      .type {
        margin-bottom: 10px;
      }
      .area {
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .opt {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      .cate {
        display: flex;
        align-items: center;
        span {
          font-size: 12px;
          margin-right: 10px;
        }
      }
      .del {
        text-align: right;
        cursor: pointer;
      }
    }
  }
}
.right-item {
  p {
    margin: 10px 0;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    span:nth-child(1) {
      width: 5px;
      height: 18px;
      display: inline-block;
      background-color: #2b85e4;
      margin-right: 10px;
      vertical-align: middle;
    }
    span:nth-child(2) {
      vertical-align: middle;
    }
  }
  div {
    margin: 20px 20px;
    span {
      font-size: 12px;
      margin-left: 20px;
      cursor: pointer;
      color: royalblue;
    }
  }
}
</style>
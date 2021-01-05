<template>
  <div class="centerbg">
    <Tabbar whichItem="0" />
    <div class="add">
      <Form
        class="cooperateForm"
        ref="cooperateForm"
        :model="cooperateForm"
        :rules="rule"
        :label-width="140"
        label-position="left"
      >
        <FormItem prop="CompanyName" label="公司名称">
          <Input
            v-model="cooperateForm.CompanyName"
            placeholder="请输入公司名称"
            style="width: 50%"
            @on-enter="searchCompany"
          ></Input>
          <span style="margin-left: 10px; color: #ff9900; font-size: 12px"
            >可按回车键查询对应企业</span
          >
        </FormItem>
        <FormItem prop="CreditCode" label="统一社会信用代码">
          <Input
            v-model="cooperateForm.CreditCode"
            placeholder="请输入统一社会信用代码"
            style="width: 50%"
            @on-enter="searchCompany"
          ></Input>
          <span style="margin-left: 10px; color: #ff9900; font-size: 12px"
            >可按回车键查询对应企业</span
          >
        </FormItem>
        <FormItem prop="Address" label="公司地址">
          <Input
            v-model="cooperateForm.Address"
            placeholder="请输入公司地址"
            style="width: 50%"
          ></Input>
        </FormItem>
        <FormItem prop="CompType" label="公司性质">
          <Input
            v-model="cooperateForm.CompType"
            placeholder="请输入公司性质"
            style="width: 50%"
          ></Input>
        </FormItem>
        <FormItem prop="CompIndustry" label="行业类型">
          <Input
            v-model="cooperateForm.CompIndustry"
            placeholder="请输入行业类型"
            style="width: 50%"
          ></Input>
        </FormItem>
        <FormItem prop="CompBusiness" label="经营范围">
          <Input
            v-model="cooperateForm.CompBusiness"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入经营范围"
            style="width: 50%"
          ></Input>
        </FormItem>
        <FormItem prop="CompLogo" label="公司logo">
          <div
            class="demo-upload-list"
            v-show="hasLogo || cooperateForm.CompLogo"
          >
            <img :src="cooperateForm.CompLogo" />
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-eye-outline"
                @click.native="handleLogoView()"
              ></Icon>
              <Icon
                type="ios-trash-outline"
                @click.native="handleLogoRemove()"
              ></Icon>
            </div>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleLogoSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleLogoFormatError"
            :on-exceeded-size="handleLogoMaxSize"
            multiple
            type="drag"
            :action="$publicPath + '/file/uploadFile'"
            style="display: inline-block; width: 58px"
          >
            <div style="width: 58px; height: 58px; line-height: 58px">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="View Image" v-model="logoVisible">
            <img
              :src="cooperateForm.CompLogo"
              v-if="logoVisible"
              style="width: 100%"
            />
          </Modal>
        </FormItem>
        <FormItem label="展示图">
          <div
            v-for="(item, index) in cooperateForm.CompAltasList"
            :key="index"
            class="demo-upload-list"
            v-show="hasImg || cooperateForm.CompAltasList.length != 0"
          >
            <img :src="item" />
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-eye-outline"
                @click.native="handleImgView(index)"
              ></Icon>
              <Icon
                type="ios-trash-outline"
                @click.native="handleImgRemove(index)"
              ></Icon>
            </div>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleImgSuccess"
            :before-upload="ImgBeforeUpload"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleImgFormatError"
            :on-exceeded-size="handleImgMaxSize"
            multiple
            type="drag"
            :action="$publicPath + '/file/uploadFile'"
            style="display: inline-block; width: 58px"
          >
            <div style="width: 58px; height: 58px; line-height: 58px">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <!-- <p style="color: red">请上传1200px*640尺寸的图片</p> -->
          <Modal title="View Image" v-model="imgVisible">
            <img
              :src="cooperateForm.CompAltasList[showImgNum]"
              v-if="imgVisible"
              style="width: 100%"
            />
          </Modal>
        </FormItem>
        <FormItem label="合作状态">
          <Select v-model="cooperateForm.StatusID" style="width: 200px">
            <Option value="1">合作中</Option>
            <Option value="2">合作结束</Option>
          </Select>
        </FormItem>
        <FormItem prop="ContactNameCor" label="合作代表">
          <Input
            v-model="cooperateForm.ContactNameCor"
            placeholder="请输入合作代表"
            style="width: 50%"
          ></Input>
        </FormItem>
        <FormItem prop="ContactPhoneCor" label="联系方式">
          <Input
            v-model="cooperateForm.ContactPhoneCor"
            placeholder="请输入行业类型"
            style="width: 50%"
          ></Input>
        </FormItem>
        <FormItem label="初次合作时间">
          <DatePicker
            type="date"
            placeholder="请初次合作时间"
            :transfer="true"
            @on-change="TransDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="合作设备">
          <div class="machine">
            <div
              v-for="(item, index) in cooperateForm.CorMachineList"
              :key="index"
              class="item"
            >
              {{ item }}
              <Icon
                type="ios-close"
                :size="20"
                style="float: right; margin-top: 7px; cursor: pointer"
                @click="deleteMachine(index)"
              />
            </div>
            <div class="item additem" @click="modal1 = true">
              <Icon
                type="ios-add"
                :size="25"
                style="position: relative; top: 3px"
              />
            </div>
          </div>
        </FormItem>
        <FormItem label="合作信息">
          <div class="info">
            <div
              v-for="(item, index) in cooperateForm.CorInfoList"
              :key="index"
              class="item"
            >
              <div class="title">{{ item.Name }}</div>
              <div class="people">申请人：{{ item.ApplyUser }}</div>
              <div>申请日期：{{ item.ApplyDate }}</div>
              <div>
                <Icon
                  type="ios-close"
                  :size="20"
                  style="cursor: pointer"
                  @click="deleteInfo(index)"
                />
              </div>
            </div>
            <span class="additem" @click="modal2 = true">
              <Icon
                type="ios-add"
                :size="25"
                style="position: relative; top: 3px"
              />添加信息
            </span>
          </div>
        </FormItem>
        <FormItem prop="Remark" label="添加备注">
          <Input
            v-model="cooperateForm.Remark"
            placeholder="请添加备注"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            style="width: 50%"
          ></Input>
        </FormItem>
        <div style="text-align: center">
          <Button type="primary" @click="allSave">保存</Button>
        </div>
      </Form>
      <Modal v-model="modal1" title="添加合作设备" @on-ok="submitMachine">
        <Input v-model="machine" placeholder="输入设备名称"></Input>
      </Modal>
      <Modal v-model="modal2" title="添加合作信息" @on-ok="submitInfo">
        <Form
          class="infoForm"
          ref="infoForm"
          :model="infoForm"
          :rules="infoFormRule"
          :label-width="100"
          label-position="left"
        >
          <FormItem label="名称">
            <Input v-model="infoForm.Name" placeholder="输入合同名称"></Input>
          </FormItem>
          <FormItem label="申请人">
            <Input
              v-model="infoForm.ApplyUser"
              placeholder="输入申请人"
            ></Input>
          </FormItem>
          <FormItem label="申请时间">
            <DatePicker
              type="date"
              placeholder="选择申请时间"
              :transfer="true"
              @on-change="TransDate2"
            ></DatePicker>
          </FormItem>
          <FormItem label="合作信息">
            <Upload
              ref="upload"
              style="width: 96%"
              name="file"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
              :on-remove="handleUploadRemove"
              :action="$publicPath + '/file/uploadFile'"
              :max-size="10240"
              :on-exceeded-size="handleMaxSize"
              :default-file-list="fileUrlList"
            >
              <Button icon="ios-cloud-upload-outline">上传材料</Button>
            </Upload>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<script>
import { checkCompanyExist, addCompanyCor } from "@/api";
import Tabbar from "@/components/tabbar";

export default {
  data() {
    return {
      showImgNum: null,
      infoForm: {
        Name: "",
        ApplyUser: "",
        ApplyDate: "",
        CorInfoFileList: [],
      },
      infoFormRule: {},
      modal2: false,
      machine: "",
      modal1: false,
      fileUrlList: [],
      hasLogo: false,
      logoVisible: false,
      imgVisible: false,
      hasImg: false,
      uploadUrl: "",
      cooperateForm: {
        CompanyName: "",
        CreditCode: "",
        Address: "地址地址地址",
        CompType: "国企",
        CompIndustry: "行业行业",
        CompBusiness: "经营范围",
        CompLogo:
          "http://192.168.1.117:32680/api/file/Image2?id=1609781478.png",
        CompAltasList: [
          "http://192.168.1.117:32680/api/file/Image2?id=1609781478.png",
          "http://192.168.1.117:32680/api/file/Image2?id=1609781478.png",
        ],
        StatusID: "1",
        ContactNameCor: "陈",
        ContactPhoneCor: "15768561181",
        StartTime: "2021/01/04 13:05:00",
        CorMachineList: ["1111", "2222"],
        CorInfoList: [
          {
            Name: "1111111111111111111111111111111111111111",
            ApplyUser: "zhang",
            ApplyDate: "2020-10-12",
            CorInfoFileList: ['http://192.168.1.117:32680/api/file/Image2?id=1609783314.png','http://192.168.1.117:32680/api/file/Image2?id=1609783318.png'],
          },
          {
            Name: "333",
            ApplyUser: "zhang",
            ApplyDate: "2020-10-12",
            CorInfoFileList: ['http://192.168.1.117:32680/api/file/Image2?id=1609783314.png'],
          },
        ],
        Remark: "备注",
      },
      rule: {
        CompanyName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur",
          },
        ],
        CreditCode: [
          {
            required: true,
            message: "统一社会信用代码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    Tabbar,
  },
  computed: {
    changeNameLength() {
      return function (text) {
        if (!text) {
          return "暂无";
        } else if (text.length > 6) {
          return text.slice(0, 6) + "...";
        } else {
          return text;
        }
      };
    },
  },
  methods: {
    allSave(){
      console.log(this.cooperateForm)
      addCompanyCor(this.cooperateForm).then(res=>{
        if(res.ercode == 0){
          this.$Message.success(res.data)
        }else {
          this.$Message.error(res.msg)
        }
      })
    },
    submitInfo() {
      this.cooperateForm.CorInfoList.push(this.infoForm)
      console.log(this.cooperateForm.CorInfoList)
    },
    deleteInfo(index) {
      this.cooperateForm.CorInfoList.splice(index, 1);
    },
    deleteMachine(index) {
      this.cooperateForm.CorMachineList.splice(index, 1);
    },
    submitMachine() {
      this.cooperateForm.CorMachineList.push(this.machine);
    },
    TransDate(date) {
      this.cooperateForm.StartTime = date;
      // console.log(this.dateTransform)
    },
    TransDate2(date) {
      this.infoForm.ApplyDate = date
      // console.log(this.dateTransform)
    },
    searchCompany() {
      checkCompanyExist({
        CompanyName: this.cooperateForm.CompanyName,
        CreditCode: this.cooperateForm.CreditCode,
      }).then((res) => {
        if (res.ercode == 0) {
          console.log(res.data);
        } else {
          this.$Message.warn("暂无记录");
        }
      });
    },
    handleLogoView() {
      this.logoVisible = true;
    },
    handleLogoRemove() {
      this.cooperateForm.CompLogo = "";
      this.hasLogo = false;
    },
    handleLogoSuccess(res, file) {
      if (res.ercode == 0) {
        this.$Message.info("上传成功");
        this.cooperateForm.CompLogo = res.data;
        this.hasLogo = true;
      }
    },
    handleLogoFormatError(file) {
      this.$Message.warning("图片格式" + file.name + " 要求jpg或png.");
    },
    handleLogoMaxSize(file) {
      this.$Message.warning("图片  " + file.name + " 太大，不能超过2M");
    },
    // 企业图片
    handleImgView(index) {
      this.imgVisible = true;
      this.showImgNum = index;
    },
    handleImgRemove(index) {
      this.cooperateForm.CompAltasList.splice(index, 1);
    },
    handleImgSuccess(res, file) {
      if (res.ercode == 0) {
        this.$Message.info("上传成功");
        this.cooperateForm.CompAltasList.push(res.data);
        this.hasImg = true;
      }
    },
    handleImgFormatError(file) {
      this.$Message.warning("图片格式" + file.name + " 要求jpg或png.");
    },
    handleImgMaxSize(file) {
      this.$Message.warning("图片  " + file.name + " 太大，不能超过2M");
    },
    ImgBeforeUpload(file) {
      // return this.checkImageWH(file, 1200, 640);
    },
    // checkImageWH(file, width, height) {
    //   let self = this;
    //   return new Promise(function (resolve, reject) {
    //     let filereader = new FileReader();
    //     filereader.onload = (e) => {
    //       let src = e.target.result;
    //       const image = new Image();
    //       image.onload = function () {
    //         if (width && image.width != width) {
    //           self.$Message.error("请上传宽为" + width + "px的图片");
    //           reject();
    //         } else if (height && image.height != height) {
    //           self.$Message.error("请上传高为" + height + "px的图片");
    //           reject();
    //         } else {
    //           resolve();
    //         }
    //       };
    //       image.onerror = reject;
    //       image.src = src;
    //     };
    //     filereader.readAsDataURL(file);
    //   });
    // },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "上传文件大小超出限制",
        desc: "文件  " + file.name + " 太大, 不能超过10M.",
      });
    },
    handleBeforeUpload(file) {
      if (this.infoForm.CorInfoFileList.length == 10) {
        this.$Message.info("只能上传至多10个文件");
        return false;
      }
      return true;
    },
    handleUploadSuccess(file) {
      // console.log(file)
      if (file.ercode == 0) {
        this.infoForm.CorInfoFileList.push(file.data);
        var item = file.data;
        var hadFile = {};
        hadFile.name = item.match(/([^/*.]+)\.\w+$/)[0];
        hadFile.url = item;
        this.fileUrlList.push(hadFile);
      } else {
        this.$Message.warning(file.msg);
      }
    },
    handleUploadRemove(fileList) {
      // console.log(fileList)
      this.infoForm.CorInfoFileList.forEach((item, index) => {
        if (item == fileList.url) {
          // alert('jj')
          this.infoForm.CorInfoFileList.splice(index, 1);
          this.fileUrlList.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.add {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  background-color: #fff;
  .cooperateForm {
    width: 100%;
    padding: 20px 0 20px 50px;
    .machine {
      display: flex;
      .item {
        border: 1px solid #ddd;
        border-radius: 5px;
        min-width: 100px;
        margin-right: 10px;
        text-align: center;
      }
      .additem {
        cursor: pointer;
        position: relative;
      }
    }
    .info {
      .item {
        display: flex;
        color: #999;
        .title,
        .people {
          overflow: hidden;
        }
        div {
          margin-right: 10px;
          width: 150px;
        }
      }
      .additem {
        border: 1px solid #ddd;
        border-radius: 5px;
        display: inline-block;
        cursor: pointer;
        padding: 0 10px;
      }
    }
  }
}

.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
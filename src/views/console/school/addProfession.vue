<template>
  <div>
    <SchNav num="2"></SchNav>
    <div class="centerbg">
      <div class="main">
        <div class="nav">
          <div class="row">
            <div class="goback" @click="$router.go(-1)">专家管理</div>
            <div>>新增专家</div>
          </div>
        </div>
        <div class="top">
          <Form :label-width="120" label-position="left" class="formItem">
              <FormItem prop="name" label="姓名">
                <Input
                  v-model="formItem.Name"
                  placeholder="请输入姓名"
                  style="width: 60%"
                ></Input>
              </FormItem>
              <FormItem prop="Phone" label="手机号">
                <Input
                  v-model="formItem.Phone"
                  placeholder="请输入手机号"
                  style="width: 60%"
                ></Input>
              </FormItem>
              <FormItem prop="dept" label="学院">
                <Input
                  v-model="formItem.Department"
                  placeholder="请输入学院"
                  style="width: 60%"
                ></Input>
              </FormItem>
            <FormItem prop="pic" label="上传照片">
                <div
                  class="demo-upload-list"
                  v-show="hasLogo || formItem.UserLogo"
                >
                  <img :src="formItem.UserLogo" />
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
                    :src="formItem.UserLogo"
                    v-if="logoVisible"
                    style="width: 100%"
                  />
                </Modal>
              </FormItem>
              <FormItem prop="pic" label="人物简介">
                <Input
                  v-model="formItem.Profile"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  placeholder="请输入人物介绍"
                  style="width: 60%"
                ></Input>
              </FormItem>
            <div class="submit">
              <Button style="width: 200px" type="primary" @click="submit">发布</Button>
            </div>
          </Form>
        </div>
      </div>
      <div style="height: 50px"></div>
    </div>
  </div>
</template>
<script>
import { saveSchoolMemberUser } from "@/api";
import SchNav from "@/components/console/schNav";

export default {
  data() {
    return {
      machineLabel: [],
      formItem: {
        Name: "",
        Phone: "",
        Department: "",
        UserLogo: "",
        Profile: "",
      },
      logoVisible: false,
      hasLogo: false,
    };
  },
  components: {
    SchNav,
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
  mounted() {},
  methods: {
    // 发布 
    submit(){
      saveSchoolMemberUser(this.formItem).then(res=>{
        if(res.ercode == 0){
          this.$Message.success(res.data)
          setTimeout(()=>{
            this.$router.go(-1)
          },1000)
        }else {
          this.$Message.error(res.msg)
        }
      })
    },
    handleLogoView() {
      this.logoVisible = true;
    },
    handleLogoRemove() {
      this.formItem.UserLogo = "";
      this.hasLogo = false;
    },
    handleLogoSuccess(res, file) {
      if (res.ercode == 0) {
        this.$Message.info("上传成功");
        this.formItem.UserLogo = res.data;
        this.hasLogo = true;
      }
    },
    handleLogoFormatError(file) {
      this.$Message.warning("图片格式" + file.name + " 要求jpg或png.");
    },
    handleLogoMaxSize(file) {
      this.$Message.warning("图片  " + file.name + " 太大，不能超过2M");
    },
  },
};
</script>

<style lang='less' scoped>
.main {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  .nav {
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    .row {
      width: 1280px;
      margin: 0 auto;
      display: flex;
      padding: 0 20px;
      color: #02a7f0;
      .goback {
        margin-right: 5px;
        cursor: pointer;
        &:hover {
        }
      }
    }
  }
  .top {
    background-color: #fff;
    padding: 40px 20px 10px 20px;
    margin-bottom: 20px;
    .formItem {
      padding-left: 100px;
    }
  }
  .section {
    background-color: #fff;
    padding: 40px 20px 10px 20px;
    margin-bottom: 20px;
    .head {
      color: #02a7f0;
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      padding-left: 100px;
      margin-bottom: 20px;
    }
    .formItem {
      padding-left: 100px;
    }
  }
  .final {
    background-color: #fff;
    padding: 40px 20px 10px 20px;
    margin-bottom: 20px;
    .head {
      color: #02a7f0;
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      padding-left: 100px;
      margin-bottom: 20px;
    }
    .formItem {
      padding-left: 100px;
      .scoreSet {
        display: flex;
        .item {
          margin-right: 30px;
        }
      }
      .book {
        display: flex;
        .item {
          margin-right: 30px;
        }
      }
    }
  }
  .submit {
    background-color: #fff;
    text-align: center;
    padding: 10px;
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
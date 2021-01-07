<template>
  <div>
    <div>
      <ComNav num="2"></ComNav>
      <div class="manage">
        <div class="int1">
          <div class="left">
            <div class="wrap">
              <div
                class="item"
                :class="[type == 1 ? 'active' : '']"
                @click="toggle(1)"
              >
                普通用户
              </div>
              <div
                class="item"
                :class="[type == 2 ? 'active' : '']"
                @click="toggle(2)"
              >
                销售账号
              </div>
            </div>
          </div>
          <div class="right">
            <Form
              class="userForm"
              ref="userForm"
              :model="userForm"
              :rules="rule"
              :label-width="140"
              label-position="left"
            >
              <FormItem prop="id" label="账号ID">
                <Input
                  v-model="userForm.UserName"
                  placeholder="请输入账号ID"
                  style="width: 60%"
                ></Input>
              </FormItem>
              <FormItem prop="name" label="用户名">
                <Input
                  v-model="userForm.Name"
                  placeholder="请输入用户名"
                  style="width: 60%"
                ></Input>
              </FormItem>
              <FormItem prop="Phone" label="手机号">
                <Input
                  v-model="userForm.Phone"
                  placeholder="请输入手机号"
                  style="width: 60%"
                ></Input>
              </FormItem>
              <FormItem prop="dept" label="部门">
                <Input
                  v-model="userForm.Department"
                  placeholder="请输入部门"
                  style="width: 60%"
                ></Input>
              </FormItem>
              <FormItem prop="profer" label="专家">
                <RadioGroup v-model="userForm.IsExpert">
                  <Radio :label="0">否</Radio>
                  <Radio :label="1">是</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem prop="pic" label="上传照片">
                <div
                  class="demo-upload-list"
                  v-show="hasLogo || userForm.UserLogo"
                >
                  <img :src="userForm.UserLogo" />
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
                    :src="userForm.CompLogo"
                    v-if="logoVisible"
                    style="width: 100%"
                  />
                </Modal>
              </FormItem>
              <FormItem prop="pic" label="人物简介">
                <Input
                  v-model="userForm.Profile"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  placeholder="请输入人物介绍"
                  style="width: 60%"
                ></Input>
              </FormItem>
              <FormItem label="权限设置">
                <CheckboxGroup v-model="userForm.permissionList">
                  <Checkbox v-for="(item, index) in permissionList" :key="index" :label="item.En">{{item.Ch}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
              <div style="padding: 0 50px; margin-top: 50px">
                <Button type="primary" long @click="saveForm">保存</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveCompanyMemberUser, getPermissionList, } from "@/api";
import ComNav from "@/components/console/comNav";
export default {
  data() {
    return {
      type: 1,
      permissionList: [], // 权限列表
      userForm: {
        UserName: "",
        Name: "",
        Phone: "",
        Department: "",
        IsExpert: 0,
        UserLogo: "",
        Profile: "",
        TypeID2: "",
        permissionList: []
      },
      rule: {},
      logoVisible: false,
      hasLogo: false,
    };
  },
  components: {
    ComNav,
  },
  mounted() {
    if (Number(this.$route.query.type)) {
      this.type = Number(this.$route.query.type);
      this.userForm.TypeID2 = this.type == 1 ? "3" : "4";
    }
    this.GetPermissionList()
  },
  methods: {
    // 权限列表
    GetPermissionList() {
      getPermissionList().then((res) => {
        if (res.ercode == 0) {
          this.permissionList = res.data;
        }
      });
    },
    saveForm() {
      saveCompanyMemberUser(this.userForm).then((res) => {
        if (res.ercode == 0) {
          this.$Message.success(res.data);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    chooseUser() {},
    toggle(value) {
      this.$router.push({
        path: "/console/UserManage",
        query: { type: value },
      });
    },
    handleLogoView() {
      this.logoVisible = true;
    },
    handleLogoRemove() {
      this.userForm.UserLogo = "";
      this.hasLogo = false;
    },
    handleLogoSuccess(res, file) {
      if (res.ercode == 0) {
        this.$Message.info("上传成功");
        this.userForm.UserLogo = res.data;
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
      .userForm {
        width: 500px;
        margin: 0 auto;
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
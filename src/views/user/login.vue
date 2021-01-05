<template>
  <div>
    <!-- <Tabbar whichItem="0" /> -->
    <div class="login">
      <div class="login-wrap">
        <div class="login-left">
          <p style="margin-bottom: 20px; font-size: 26px">欢迎登录</p>
          <p>莘海教育产教融合平台</p>
        </div>
        <div class="login-right">
          <div class="login-head">用户登录</div>
          <Form
            class="login-form"
            ref="formItem"
            :model="formItem"
            :rules="rule"
          >
            <FormItem prop="UserName">
              <Input
                size="large"
                v-model="formItem.UserName"
                prefix="md-person"
                placeholder="请输入用户名/手机号"
              ></Input>
            </FormItem>
            <FormItem prop="Password">
              <Input
                type="password"
                password
                size="large"
                prefix="md-lock"
                v-model="formItem.Password"
                placeholder="请输入登录密码"
              ></Input>
            </FormItem>
            <FormItem>
              <div style="display: flex; justify-content: space-between">
                <span style="font-size: 12px; color: #aaa"
                  >若存在初始密码请用初始密码登录</span
                ><span
                  style="color: #409eff; cursor: pointer"
                  @click="ForgotPass"
                  >忘记密码</span
                >
              </div>
            </FormItem>
            <FormItem style="text-align: center">
              <Button
                size="large"
                style="border-radius: 10px; margin-right: 15px"
                @click="$router.go(-1)"
              >
                返回
              </Button>
              <Button
                size="large"
                type="primary"
                style="border-radius: 10px"
                @click="handleSubmit('formItem')"
                >登陆</Button
              >
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api";
import { state, mutation } from "@/store";
import Tabbar from "@/components/tabbar";
export default {
  data() {
    return {
      value2: 0,
    };
  },
  components: {
    Tabbar,
  },
  data() {
    const that = this;
    return {
      keyText: "",
      formItem: {
        UserName: "",
        Password: "",
      },
      rule: {
        UserName: [
          {
            required: true,
            message: "用户名/手机号不能为空",
            trigger: "blur",
          },
        ],
        Password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ForgotPass() {
      this.$router.push({ path: "/forgotPass" });
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          login(this.formItem).then((res) => {
            if (res.ercode == 0) {
              this.$Message.success(res.msg);
              this.handUserInfo();
              this.$router.push({ path: "/" });
            } else {
              this.$Message.error("登录失败!");
            }
          });
        }
      });
    },
    // 检测是否登录
    handUserInfo() {
      mutation.checkLogin();
    },
  },
};
</script>

<style lang='less' scoped>
.login {
  position: relative !important;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #f1f1f1;
  // background: url(../../assets/img/login.png) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-wrap {
    width: 600px;
    // height: 300px;
    overflow: hidden;
    border-radius: 38px;
    display: flex;
    .login-left {
      padding-top: 90px;
      width: 50%;
      background-color: #17233d;
      // background: url("../../assets/img/login-left.png");
      color: #fff;
      padding-left: 20px;
      font-size: 14px;
    }
    .login-right {
      width: 50%;
      background-color: #fff;
      .login-head {
        margin: 20px 10px 0 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        font-size: 16px;
        color: #17233d;
        font-weight: 00;
        text-align: center;
      }
      .login-form {
        padding: 20px;
        /deep/ .ivu-form-item {
          &:nth-child(4) {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
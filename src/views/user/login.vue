<template>
  <div>
    <!-- <Tabbar whichItem="0" /> -->
    <div class="login">
      <div class="login-wrap">
        <div class="login-left">
          <p style="margin-bottom: 20px">欢迎登录</p>
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
            <FormItem prop="mobile">
              <Input
                size="large"
                v-model="formItem.mobile"
                prefix="md-person"
                placeholder="请输入用户名/手机号"
              ></Input>
            </FormItem>
            <FormItem prop="password">
              <Input
                size="large"
                prefix="md-lock"
                v-model="formItem.password"
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
            <FormItem>
              <Button
                size="large"
                long
                type="primary"
                style="border-radius: 50px"
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
        mobile: "",
        password: "",
      },
      rule: {
        mobile: [
          {
            required: true,
            message: "用户名/手机号不能为空",
            trigger: "blur",
          },
        ],
        password: [
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
      this.$router.push({path: '/forgotPass'})
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          login(this.formItem).then((res) => {
            if (res.isSuccess) {
              this.$Message.success(res.data);
              this.handUserInfo();
              this.$router.push({ path: "/" });
            } else {
              this.$Message.error("登录失败!");
            }
          });
        }
      });
    },
    handUserInfo() {
      webAuthUserInfo().then((res) => {
        console.log(res);
        if (res.isSuccess) {
          this.updateLoginStatus(res.data);
        }
      });
    },
    updateLoginStatus(data) {
      state.userInfo = data;
      state.isLogin = true;
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
    height: 300px;
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
        font-size: 15px;
        color: #ff9900;
        font-weight: 500;
      }
      .login-form {
        padding: 20px;
        /deep/ .ivu-form-item {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
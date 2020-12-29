<template>
  <div>
    <!-- <Tabbar whichItem="0" /> -->
    <div class="forgotPass">
      <div class="forgotPass-wrap">
        <p>重置密码</p>
        <Form
          class="reset-form"
          ref="formItem"
          :model="formItem"
          :rules="rule"
          :label-width="80"
          label-position="left"
        >
          <FormItem prop="mail" label="邮箱">
            <Input
              size="large"
              style="width: 80%"
              v-model="formItem.mail"
              placeholder="请输入邮箱"
            ></Input>
          </FormItem>
          <FormItem prop="validCode" label="验证码">
            <Input
              size="large"
              style="width: 50%; margin-right: 5px;"
              v-model="formItem.validCode"
              placeholder="请输入验证码"
            ></Input>
            <Button
              style="height: 40px"
              @click="Getverycode"
              :disabled="permit == false"
              >{{ refreshTitle }}</Button
            >
          </FormItem>
          <FormItem prop="password" label="新密码">
            <Input
              size="large"
              style="width: 80%"
              v-model="formItem.password"
              placeholder="请输入新密码"
            ></Input>
          </FormItem>
          <FormItem prop="password2" label="重复密码">
            <Input
              size="large"
              style="width: 80%"
              v-model="formItem.password2"
              placeholder="请重复输入新密码"
            ></Input>
          </FormItem>
          <div style="text-align: center">
            <Button type="primary" @click="handleSubmit('formItem')"
              >提交修改</Button
            >
          </div>
        </Form>
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
      refreshTitle: "发送验证码", //初始化默认展示文字
      timer: null,
      countdown: 60, //初始化默认倒计时
      permit: true,
      formItem: {
        mail: "",
        validCode: "",
        password: "",
        password2: "",
      },
      rule: {
        mail: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
        ],
        validCode: [
          {
            required: true,
            message: "验证码不能为空",
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
        password2: [
          {
            required: true,
            message: "重复密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    Tabbar,
  },
  methods: {
    Getverycode() {
      let email = this.formItem.mail
      if (email) {
        getverycode({ mail: email }).then((res) => {
          if (!res.isSuccess) {
            this.$Message.warning(res.msg);
            return;
          }
          if (!this.timer) {
            this.countdown = 10;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.countdown > 0 && this.countdown <= 10) {
                this.countdown--;
                this.permit = false;
                this.refreshTitle = "重发(" + this.countdown + "s)";
              } else {
                clearInterval(this.timer);
                this.timer = null;
                this.permit = true;
                this.refreshTitle = "重发";
              }
            }, 1000);
          }
        });
      } else {
        this.$Message.warning("请输入邮箱");
      }
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
.forgotPass {
  background-color: #f1f1f1;
  padding: 50px 0;
  .forgotPass-wrap {
    width: 500px;
    margin: 0 auto;
    box-shadow: 4px 4px 16px #ccc;
    background: #fff;
    p {
      font-size: 16px;
      height: 40px;
      background-color: #17233d;
      color: #fff;
      text-align: center;
      line-height: 40px;
    }
    .reset-form {
      padding: 20px;
    }
  }
}
</style>
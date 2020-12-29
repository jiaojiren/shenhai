<template>
  <div>
    <!-- <Tabbar whichItem="0" /> -->
    <div style="background-color: #f1f1f1; padding: 20px 0 50px;">


    <div class="register">
      <div class="register-wrap">
        <p>新用户注册</p>
        <Form
          ref="formItem"
          :model="formItem"
          :label-width="150"
          :rules="ruleInline"
        >
          <FormItem prop="preType" label="用户类型">
            <Select v-model="formItem.preType" style="width: 300px">
              <Option value="1">学校</Option>
              <Option value="2">企业</Option>
            </Select>
          </FormItem>
          <FormItem
            v-if="formItem.preType == 2"
            label="企业名称："
            prop="companyName"
          >
            <Input
              v-model="formItem.companyName"
              placeholder="请输入企业名称"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem
            v-if="formItem.preType == 2"
            label="统一社会信用代码："
            prop="creditCode"
          >
            <Input
              v-model="formItem.creditCode"
              placeholder="请输入企业统一社会信用代码"
              style="width: 300px"
            ></Input>
          </FormItem>

          <FormItem
            v-if="formItem.preType == 1"
            label="学校名称："
            prop="schoolName"
          >
            <Input
              v-model="formItem.schoolName"
              placeholder="请输入学校名称"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem label="用户名" prop="name">
            <Input v-model="formItem.name" placeholder="请输入用户名" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="手机号：" prop="mobile">
            <Input
              v-model="formItem.mobile"
              placeholder="请输入手机号码"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem label="验证码：">
            <Row>
              <Col span="13">
                <FormItem prop="veryCode">
                  <Input
                    v-model="formItem.veryCode"
                    placeholder="请输入验证码"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="5">
                <img
                  style="margin-left: 10px; width: auto; height: 31px"
                  @click="getVeryCode()"
                  :src="publicPath + '/webLcUser/getVeryCode'"
                  id="randomImg"
                />
              </Col>
            </Row>
          </FormItem>
          <FormItem label="邮箱：" prop="mail">
            <Input v-model="formItem.mail" placeholder="请输入邮箱" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="密码：" prop="password">
            <Input
              v-model="formItem.password"
              type="password"
              placeholder="请输入密码"
              style="width: 300px"
            ></Input>
          </FormItem>
          <FormItem label="重复密码：" prop="pwdCheck">
            <Input
              v-model="formItem.pwdCheck"
              type="password"
              placeholder="请重复输入密码"
              style="width: 300px"
            ></Input>
          </FormItem>
          <div style="text-align: center">
            <Button type="primary" @click="handleSubmit('formItem')"
              >提交注册</Button
            >
          </div>
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
    // 异步校验
    const asyValidCompanyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入统一社会信用编码"));
      }
      // if (!Number.isInteger(value)) {
      //   return callback(new Error("请输入数字"));
      // }
      if (this.formItem.companyName == "") {
        return callback(new Error("请输入企业名称校验"));
      }
      checkCompanyName({
        companyName: this.formItem.companyName,
        creditCode: value,
      }).then((res) => {
        if (res.isSuccess) {
          if (res.data) {
            return callback();
          } else {
            return callback(new Error("与企业名称不对应，请确认"));
          }
        } else {
          this.$Message.warning(res.msg);
          return callback(new Error("校验出错"));
        }
      });
    };
    const validateVeryCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else {
        return callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择用户类型"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formItem.pwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formItem.validateField("pwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入你的密码"));
      } else if (value !== this.formItem.password) {
        callback(new Error("密码不匹配，请重新输入"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback("手机号格式不正确");
      } else {
        callback();
      }
    };
    return {
      value2: 0,
      formItem: {
        password: "",
        pwdCheck: "",
        mobile: "",
        veryCode: "",
        preType: "1",
        type: null,
        companyName: "",
        schoolName: "",
        name: "",
        creditCode: "",
        mail: "",
      },
      ruleInline: {
        creditCode: [{ validator: asyValidCompanyName, trigger: "blur" }],
        mobile: [{ validator: validatePhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        pwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        mail: [{ required: true, trigger: "blur" }],
        veryCode: [{ validator: validateVeryCode, trigger: "blur" }],
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        schoolName: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    Tabbar,
  },
  methods: {
    getVeryCode() {
      $("#randomImg").attr(
        "src",
        this.publicPath + "/webLcUser/getVeryCode?random=" + Math.random()
      );
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.handRegister();
        } else {
          return;
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.register {
  width: 600px;
  margin: 0 auto;
  .register-wrap {
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
    .ivu-form {
      padding: 20px 0;
    }
  }
}
</style>
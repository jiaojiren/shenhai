<template>
  <div>
    <!-- <Tabbar whichItem="0" /> -->
    <div style="background-color: #f1f1f1; padding: 20px 0 50px">
      <div class="register">
        <div class="register-wrap">
          <p>新用户注册</p>
          <Form
            ref="formItem"
            :model="formItem"
            :label-width="180"
            :rules="ruleInline"
          >
            <FormItem prop="TypeID1" label="用户类型">
              <Select v-model="formItem.TypeID1" style="width: 300px">
                <Option :value="1">企业</Option>
                <Option :value="2">学校</Option>
              </Select>
            </FormItem>

            <!-- 企业-------------------------------------------------------------------------- -->
            <FormItem
              label="企业类别"
              :key="'key1'"
              v-if="formItem.TypeID1 == 1"
            >
              <RadioGroup v-model="formItem.TypeID2">
                <Radio label="1">普通公司</Radio>
                <Radio label="2">设备厂</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              v-if="formItem.TypeID1 == 1"
              :key="'key2'"
              label="企业名称："
              prop="CompName"
            >
              <Input
                v-model="formItem.CompName"
                placeholder="请输入企业名称"
                style="width: 300px"
              ></Input>
            </FormItem>
            <FormItem
              :key="'key3'"
              v-if="formItem.TypeID1 == 1"
              label="统一社会信用代码："
              prop="CreditCode"
            >
              <Input
                v-model="formItem.CreditCode"
                placeholder="请输入企业统一社会信用代码"
                style="width: 300px"
              ></Input>
            </FormItem>

            <!-- 学校---------------------------------------------------------------------------->
            <FormItem label="类别：" v-if="formItem.TypeID1 == 2" :key="'key4'">
              <RadioGroup v-model="formItem.TypeID2">
                <Radio label="1">教师</Radio>
                <Radio label="2">学生</Radio>
                <Radio label="3">学校</Radio>
              </RadioGroup>
            </FormItem>

            <!-- 用户名 手机 邮箱 验证码 密码----------------------------------------------------------------------------- -->
            <FormItem label="用户名：" prop="UserName">
              <Input
                v-model="formItem.UserName"
                placeholder="请输入用户名"
                style="width: 300px"
              ></Input>
            </FormItem>
            <FormItem label="手机号：" prop="Phone">
              <Input
                v-model="formItem.Phone"
                placeholder="请输入手机号码"
                style="width: 300px"
              ></Input>
            </FormItem>
            <FormItem label="邮箱：" prop="Email">
              <Input
                v-model="formItem.Email"
                placeholder="请输入邮箱"
                style="width: 300px"
              ></Input>
            </FormItem>

            <FormItem label="密码：" prop="Password">
              <Input
                v-model="formItem.Password"
                type="password"
                placeholder="请输入6-20位字母+数字的组合密码"
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
            <FormItem label="验证码：" prop="veryCode">
              <Input
                v-model="formItem.veryCode"
                placeholder="请输入验证码"
                style="width: 200px"
              ></Input>
              <img
                style="margin-left: 10px; width: auto; height: 31px"
                @click="getVeryCode()"
                :src="$publicPath + '/webLcUser/getVeryCode'"
                id="randomImg"
              />
            </FormItem>
            <div style="text-align: center">
              <Button style="margin-right: 50px" @click="$router.go(-1)"
                >返回</Button
              >
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
import { register } from "@/api";
import Tabbar from "@/components/tabbar";
export default {
  data() {
    // 异步校验
    const asyValidCompanyName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入统一社会信用编码"));
      } else {
        return callback();
      }
      // checkCompanyName({
      //   companyName: this.formItem.CompName,
      //   creditCode: value,
      // }).then((res) => {
      //   if (res.isSuccess) {
      //     if (res.data) {
      //       return callback();
      //     } else {
      //       return callback(new Error("与企业名称不对应，请确认"));
      //     }
      //   } else {
      //     this.$Message.warning(res.msg);
      //     return callback(new Error("校验出错"));
      //   }
      // });
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
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
        callback(new Error("密码必须是由6-20位字母+数字组合"));
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
      } else if (value !== this.formItem.Password) {
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
        Password: "",
        pwdCheck: "",
        Phone: "",
        veryCode: "",
        TypeID1: 1,
        TypeID2: "1",
        CompName: "",
        UserName: "",
        CreditCode: "",
        Email: "",
      },
      ruleInline: {
        CreditCode: [
          { required: true, validator: asyValidCompanyName, trigger: "blur" },
        ],
        Phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        Password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        pwdCheck: [
          { required: true, validator: validatePassCheck, trigger: "blur" },
        ],
        Email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        veryCode: [
          { required: true, validator: validateVeryCode, trigger: "blur" },
        ],
        CompName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        UserName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
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
        $publicPath + "/webLcUser/getVeryCode?random=" + Math.random()
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
    handRegister() {
      register(this.formItem).then((res) => {
        if (res.ercode == 0) {
          this.$Message.success("注册成功");
          setTimeout(() => {
            //延时加载页面
            this.$router.push({ path: "/login" });
          }, 500);
        } else {
          this.$Message.warning(res.msg);
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
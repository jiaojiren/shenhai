<template>
  <div class="centerbg">
    <Tabbar whichItem="0" />
    <div class="center">
      <div class="left">
        <Stubar num="1" />
      </div>
      <div class="right">
        <div class="right-item">
          <p>
            <span></span><span>基本信息</span
            ><span @click="showModal1"
              ><Icon
                style="margin-left: 5px; cursor: pointer"
                type="ios-create-outline"
            /></span>
          </p>
          <div>用户名称： {{ changeRemarkNull(information.UserName) }}</div>
          <div>真实姓名： {{ changeRemarkNull(information.Name) }}</div>
          <div>手机号码： {{ information.Phone }}</div>
          <div>电子邮箱： {{ information.Email }}</div>
          <Modal
            v-model="Modal1"
            title="修改基本信息"
            @on-ok="Modal1Sub('baseForm')"
            @on-visible-change="reSearch"
          >
            <Form
              class="baseForm"
              ref="baseForm"
              :model="baseForm"
              :rules="rule"
              :label-width="100"
              label-position="right"
            >
              <FormItem prop="UserName" label="用户名称">
                <Input
                  size="large"
                  style="width: 80%"
                  v-model="baseForm.UserName"
                  placeholder="请输入用户名称"
                ></Input>
              </FormItem>
              <FormItem prop="Name" label="真实姓名">
                <Input
                  size="large"
                  style="width: 80%"
                  v-model="baseForm.Name"
                  placeholder="请输入真实姓名"
                ></Input>
              </FormItem>
              <FormItem prop="Phone" label="手机号码">
                <Input
                  size="large"
                  style="width: 80%"
                  v-model="baseForm.Phone"
                  placeholder="请输入手机号码"
                ></Input>
              </FormItem>
              <FormItem prop="Email" label="电子邮箱">
                <Input
                  size="large"
                  style="width: 80%"
                  v-model="baseForm.Email"
                  placeholder="请输入邮箱"
                ></Input>
              </FormItem>
            </Form>
          </Modal>
        </div>
        <div class="right-item">
          <p><span></span>账号信息</p>
          <div>
            当前绑定账号： {{ changeRemarkNull(information.Phone)
            }}<span @click="showModal2">换绑手机号</span>
          </div>
          <div>密码： ****<span @click="showModal3">重置密码</span></div>
          <Modal
            v-model="Modal2"
            title="绑定手机号"
            @on-ok="Modal2Sub('phoneForm')"
            @on-visible-change="reSearch"
          >
            <Form
              class="phoneForm"
              ref="phoneForm"
              :model="phoneForm"
              :rules="rule2"
              :label-width="120"
              label-position="right"
            >
              <FormItem prop="Phone" label="绑定手机号码">
                <Input
                  size="large"
                  style="width: 80%"
                  v-model="phoneForm.Phone"
                  placeholder="请输入手机号码"
                ></Input>
              </FormItem>
            </Form>
          </Modal>
          <Modal
            v-model="Modal3"
            title="重置密码"
            @on-ok="Modal3Sub('passwordForm')"
            @on-visible-change="reSearch"
          >
            <Form
              class="passwordForm"
              ref="passwordForm"
              :model="passwordForm"
              :rules="rule3"
              :label-width="120"
              label-position="right"
            >
              <FormItem prop="Password" label="原密码">
                <Input
                  size="large"
                  style="width: 80%"
                  v-model="passwordForm.Password"
                  placeholder="请输入原密码"
                ></Input>
              </FormItem>
              <FormItem prop="NewPassword" label="新密码">
                <Input
                  size="large"
                  style="width: 80%"
                  v-model="passwordForm.NewPassword"
                  placeholder="请输入新密码"
                ></Input>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
    </div>

    <div style="height: 50px"></div>
  </div>
</template>
<script>
import {
  modifyAccountBaseData,
  modifyPassword,
  modifyPhone,
  webAuthUserInfo,
} from "@/api";
import { state, mutation } from "@/store";
import Tabbar from "@/components/tabbar";
import Stubar from "@/components/center/stuBar";
export default {
  data() {
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
      information: {},
      Modal1: false,
      Modal2: false,
      Modal3: false,
      passwordForm: {
        Password: "",
        NewPassword: "",
      },
      phoneForm: {
        Phone: "",
      },
      baseForm: {
        UserName: "",
        Name: "",
        Phone: "",
        Email: "",
      },
      rule: {
        UserName: [
          {
            required: true,
            message: "用户名称不能为空",
            trigger: "blur",
          },
        ],
        Name: [
          {
            required: true,
            message: "真实姓名不能为空",
            trigger: "blur",
          },
        ],
        Phone: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur",
          },
        ],
        Email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
        ],
      },
      rule2: {
        Phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
      },
      rule3: {
        Password: [
          {
            required: true,
            message: "原密码不能为空",
            trigger: "blur",
          },
        ],
        NewPassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    Tabbar,
    Stubar,
  },
  computed: {
    changeRemarkNull() {
      return function (text) {
        if (!text) {
          return "-";
        } else {
          return text;
        }
      };
    },
  },
  mounted() {
    this.information = state.userInfo;
    this.baseForm = this.information;
  },
  methods: {
    reSearch(bool) {
      if (bool == false) {
        mutation.checkLogin();
        this.information = state.userInfo;
        this.baseForm = this.information;
        this.passwordForm = {
          Password: "",
          NewPassword: "",
        };
        this.phoneForm = {
          Phone: "",
        };
      }
    },
    Modal3Sub(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          modifyPassword(this.passwordForm).then((res) => {
            if (res.ercode == 0) {
              this.$Message.success(res.data);
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },
    Modal2Sub(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          modifyPhone(this.phoneForm).then((res) => {
            if (res.ercode == 0) {
              this.$Message.success(res.data);
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },
    Modal1Sub(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          modifyAccountBaseData(this.baseForm).then((res) => {
            if (res.ercode == 0) {
              this.$Message.success(res.data);
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },
    showModal1() {
      this.Modal1 = true;
    },
    showModal2() {
      this.Modal2 = true;
    },
    showModal3() {
      this.Modal3 = true;
    },
  },
};
</script>

<style lang='less' scoped>
.right-item {
  .baseForm {
  }
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
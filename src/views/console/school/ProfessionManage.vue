<template>
  <div>
    <div>
      <SchNav num="2"></SchNav>
      <div class="manage">
        <div class="int1">
          <div class="right">
            <div class="filter">
              <div class="item">
                <span>姓名：</span>
                <Input placeholder="输入姓名" />
              </div>
              <div class="item">
                <span>学校：</span>
                <Select style="width: 80px">
                  <Option :value="1">惠州学院</Option>
                </Select>
              </div>
              <div class="item">
                <span>学院：</span>
                <Select style="width: 80px">
                  <Option :value="1">计算机</Option>
                </Select>
              </div>

              <div class="item">
                <Button type="primary">搜索</Button>
                <Button style="margin-left: 10px">重置</Button>
              </div>
            </div>

            <div class="head">
              <div>共1000条记录</div>
              <div>
                <Button
                  style="margin-right: 10px"
                  type="primary"
                  @click="toAddPro"
                  >新建专家信息</Button
                >
                <Button type="primary" @click="">导出excel</Button>
              </div>
            </div>
            <div class="table">
              <Table
                border
                :columns="column"
                :data="tableData"
                :loading="isLoading"
              ></Table>
              <div style="text-align: right; margin-top: 10px">
                <Page
                  :total="entityCount"
                  :page-size="Condition.pageSize"
                  :show-total="true"
                  :current="Condition.pageNo"
                  @on-change="changePage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal title="更新专家信息" v-model="modal">
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
          <div class="demo-upload-list" v-show="hasLogo || formItem.UserLogo">
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
          <Button style="width: 200px" type="primary" @click="submit"
            >发布</Button
          >
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  schoolMemberPageList,
  schoolMemeberDelete,
  schoolMemeberDetail,
} from "@/api";
import SchNav from "@/components/console/schNav";
export default {
  data() {
    return {
      modal: false,
      entityCount: null,
      isLoading: false,
      Condition: {
        pageNo: 1,
        pageSize: 10,
        CompanyNo: "",
        Name: "",
      },
            formItem: {
        Name: "",
        Phone: "",
        Department: "",
        UserLogo: "",
        Profile: "",
      },
      logoVisible: false,
      hasLogo: false,
      column: [
        {
          type: "index",
          title: "序号",
          align: "center",
          width: "70px",
        },
        {
          title: "姓名",
          align: "center",
          key: "Name",
          tooltip: "true",
        },
        {
          title: "联系方式",
          align: "center",
          key: "Phone",
          tooltip: "true",
        },
        {
          title: "学院",
          align: "center",
          key: "Department",
          tooltip: "true",
        },

        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            var edit = h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    this.modal = true
                  },
                },
              },
              "编辑"
            );
            var del = h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    schoolMemeberDelete({
                      pk_Account: params.row.pk_Account,
                    }).then((res) => {
                      if (res.ercode == 0) {
                        this.$Message.success(res.data);
                        this.GetConsolProList();
                      } else {
                        this.$Message.error(res.msg);
                      }
                    });
                  },
                },
              },
              "删除"
            );
            return h("div", [edit, del]);
          },
        },
      ],
      tableData: [],
    };
  },
  components: {
    SchNav,
  },
  mounted() {
    this.GetConsolProList();
  },
  methods: {
    // 更新专家 
    submit(){
      saveSchoolMemberUser(this.formItem).then(res=>{
        if(res.ercode == 0){
          this.$Message.success(res.data)
        }else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 新建专家
    toAddPro() {
      this.$router.push({ path: "/console/addProfession" });
    },
    // 获取列表
    GetConsolProList() {
      this.isLoading = true;
      schoolMemberPageList(this.Condition).then((res) => {
        this.isLoading = false;
        if (res.ercode == 0) {
          let temp = [];
          res.data.entities.forEach((item, index) => {
            let tempp = Object.assign(item, item.PartyBInfo);
            temp.push(tempp);
          });
          this.tableData = temp;
          this.entityCount = res.data.entityCount;
        }
      });
    },

    changePage(pageNo) {
      this.Condition.pageNo = pageNo;
      this.GetConsolProList();
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

<style lang="less" scoped>
.manage {
  background-color: #f2f2f2;
  padding: 10px 0 50px;
  .int1 {
    padding: 0 50px;
    .right {
      background-color: #fff;
      margin-left: 10px;
      padding: 20px;

      .filter {
        display: flex;
        .item {
          margin-right: 30px;
          display: flex;
          span {
            white-space: nowrap;
            line-height: 32px;
          }
        }
      }
      .head {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
      }
      .table {
        margin-top: 10px;
      }
    }
  }
}
</style>
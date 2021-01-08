<template>
  <div>
    <SchNav num="5"></SchNav>
    <div class="centerbg">
      <div class="main">
        <div class="nav">
          <div class="row">
            <div class="goback" @click="$router.go(-1)">考试管理</div>
            <div>>新增考试</div>
          </div>
        </div>
        <div class="top">
          <Form :label-width="120" label-position="left" class="formItem">
            <FormItem label="设备系列：">
              <Select v-model="formItem.MachineSeries" style="width: 300px">
                <Option
                  v-for="item in machineLabel"
                  :value="item.pk_MachineSeries"
                  :key="item.pk_MachineSeries"
                  >{{ item.SeriesName }}</Option
                >
              </Select>
            </FormItem>
            <FormItem label="设备名称：" style="width: 500px">
              <Input v-model="formItem.name" />
            </FormItem>
            <FormItem label="考试类型：" style="width: 500px">
              <CheckboxGroup v-model="formItem.type">
                <Checkbox :label="1"> 阶段考试 </Checkbox>
                <Checkbox :label="2"> 结课考试 </Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>
        </div>
        <div class="section" v-if="showForm1">
          <div class="head">阶段考试</div>
          <Form :label-width="120" label-position="left" class="formItem">
            <FormItem label="考试开始时间" style="width: 500px">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择开始考试时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem label="考试结束时间" style="width: 500px">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择结束考试时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem label="题库：" style="width: 500px">
              <span style="cursor: pointer">设备HGHG-123的阶段考试</span
              ><span style="margin: 0 50px 0 10px; cursor: pointer"
                ><Icon size="18" type="ios-trash" /></span
              ><span style="color: #02a7f0; cursor: pointer"
                ><Icon type="md-add" />上传考题</span
              >
            </FormItem>
            <FormItem label="及格分数：" style="width: 500px">
              <Input type="number" v-model="formItem.score" />
            </FormItem>
            <FormItem label="作答限制：" style="width: 500px">
              <CheckboxGroup v-model="formItem.type">
                <Checkbox :label="1"> 首次50%课时结束 </Checkbox>
                <Checkbox :label="2"> 50%课时结束 </Checkbox>
                <Checkbox :label="3"> 非首次不限时间 </Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>
        </div>
        <div class="final" v-if="showForm2">
          <div class="head">结课考试</div>
          <Form :label-width="120" label-position="left" class="formItem">
            <FormItem label="考试开始时间" style="width: 500px">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择开始考试时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem label="考试结束时间" style="width: 500px">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择结束考试时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem label="分值配置" style="width: 800px">
              <div class="scoreSet">
                <div class="item">
                  <FormItem style="width: 200px">
                    <span>优秀</span>
                    <Input style="width: 100px; margin-left: 10px"></Input>
                  </FormItem>
                </div>
                <div class="item">
                  <FormItem style="width: 200px">
                    <span>良好</span>
                    <Input style="width: 100px; margin-left: 10px"></Input>
                  </FormItem>
                </div>
                <div class="item">
                  <FormItem style="width: 200px">
                    <span>不及格</span>
                    <Input style="width: 100px; margin-left: 10px"></Input>
                  </FormItem>
                </div>
              </div>
            </FormItem>
            <FormItem label="证书" style="width: 800px">
              <div class="book">
                <div class="item">
                  <FormItem style="width: 200px">
                    <span>优秀</span>
                    <Upload
                      style="display: inline-block; width: 100px; margin-left: 10px"
                      action="//jsonplaceholder.typicode.com/posts/"
                    >
                      <Button icon="md-add"></Button>
                    </Upload>
                  </FormItem>
                </div>
                <div class="item">
                  <FormItem style="width: 200px">
                    <span>良好</span>
                    <Upload
                      style="display: inline-block; width: 100px; margin-left: 10px"
                      action="//jsonplaceholder.typicode.com/posts/"
                    >
                      <Button icon="md-add"></Button>
                    </Upload>
                  </FormItem>
                </div>
              </div>
            </FormItem>
            <FormItem label="题库：" style="width: 500px">
              <span style="cursor: pointer">设备HGHG-123的阶段考试</span
              ><span style="margin: 0 50px 0 10px; cursor: pointer"
                ><Icon size="18" type="ios-trash" /></span
              ><span style="color: #02a7f0; cursor: pointer"
                ><Icon type="md-add" />上传考题</span
              >
            </FormItem>
            <FormItem label="及格分数：" style="width: 500px">
              <Input type="number" v-model="formItem.score" />
            </FormItem>
            <FormItem label="作答限制：" style="width: 500px">
              <CheckboxGroup v-model="formItem.type">
                <Checkbox :label="1"> 首次50%课时结束 </Checkbox>
                <Checkbox :label="2"> 50%课时结束 </Checkbox>
                <Checkbox :label="3"> 非首次不限时间 </Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>
        </div>
        <div class="submit"><Button style="width: 200px" type="primary">发布</Button></div>
      </div>
      <div style="height: 50px"></div>
    </div>
  </div>
</template>
<script>
import { corDetail } from "@/api";
import SchNav from "@/components/console/schNav";

export default {
  data() {
    return {
      machineLabel: [],
      formItem: {
        type: [1],
      },
    };
  },
  components: {
    SchNav,
  },
  computed: {
    showForm1(){
      return this.formItem.type.includes(1)
    },
    showForm2(){
      return this.formItem.type.includes(2)
    },
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
  methods: {},
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
</style>
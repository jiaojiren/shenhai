<template>
  <div>
    <div>
      <ComNav num="1"></ComNav>
      <div class="manage">
        <div class="int1">
          <div class="int2">
            <div class="pic">
              <img src="@/assets/images/center/u27.svg" alt="" />
            </div>
            <div class="content">
              <Form class="form" ref="formItem" :label-width="180" label-position="left">
                <FormItem label="公司名称" prop="UserName">
                  <Input
                    size="large"
                    v-model="formItem.name"
                    placeholder=""
                  ></Input>
                </FormItem>
                <FormItem label="统一社会信用代码" prop="UserName">
                  <Input
                    size="large"
                    v-model="formItem.code"
                    placeholder=""
                  ></Input>
                </FormItem>
                <FormItem label="公司地址" prop="Password">
                  <Input
                    size="large"
                    v-model="formItem.address"
                    placeholder=""
                  ></Input>
                </FormItem>
                <FormItem label="公司性质" prop="Password">
                  <Select v-model="formItem.xingzhi" size="large">
                    <Option :value="'hhh'">有限责任公司</Option>
                    <Option :value="'jjj'">有限责任公司</Option>
                  </Select>
                </FormItem>
                <FormItem label="行业类型" prop="Password">
                  <Select v-model="formItem.leixing" size="large">
                    <Option :value="'hhh'">农林牧渔业</Option>
                    <Option :value="'jjj'">有限责任公司</Option>
                  </Select>
                </FormItem>
                <FormItem label="经营范围" prop="Password">
                  <Input
                    size="large"
                    type="textarea"
                    :rows="4"
                    v-model="formItem.area"
                    placeholder=""
                  ></Input>
                </FormItem>
                <div style="margin: 50px 0; padding: 0 150px">
                  <Button type="primary" long >确认修改资料</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComNav from "@/components/console/comNav";
export default {
  data() {
    return {
      formItem: {
        name: '山东蓝翔',
        code: "12842132761",
        address: "山东省青岛市区路",
        area: "经营范围",
        xingzhi: 'jjj',
        leixing: 'hhh',
      },
    };
  },
  components: {
    ComNav,
  },
};
</script>

<style lang="less" scoped>
.manage {
  background-color: #f2f2f2;
  padding: 10px 0 50px;
  .int1 {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    .int2 {
      display: flex;
      position: relative;
      padding-left: 50px;
      .pic {
        width: 150px;
        height: 140px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          // top: -50px;
        }
      }
      .content {
        flex: 1;
        padding: 50px 300px 0 20px;
      }
    }
  }
}
</style>
<template>
  <div class="centerbg">
    <Tabbar whichItem="0" />
    <div class="center">
      <div class="left">
        <Stubar num="2" />
      </div>
      <div class="right">
        <Tabs value="name1" @on-click="RenderTable">
          <TabPane label="课程" name="name1">
            <Table border :columns="reportColnum" :data="reportList"></Table>
            <Page
              @on-change="changePageReport"
              :current="pageNo"
              :total="reportTital"
              style="float: right; margin-top: 10px"
            />
          </TabPane>
          <TabPane label="职位" name="name2">
            <Table border :columns="policyColnum" :data="policyList"></Table>
            <Page
              @on-change="changePagePolicy"
              :total="policyTital"
              style="float: right; margin-top: 10px"
            />
          </TabPane>
        </Tabs>
      </div>
    </div>

    <div style="height: 50px"></div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";
import Stubar from "@/components/center/stuBar";
export default {
  data() {
    return {};
  },
  components: {
    Tabbar,
    Stubar,
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
</style>
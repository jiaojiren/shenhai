<template>
  <div style="background-color: #f2f2f2">
    <Tabbar whichItem="0" />
    <div class="center">
      <div class="left">
        <Stubar num="3" />
      </div>
      <div class="right">
        <Tabs value="name1" @on-click="RenderTable">
          <TabPane label="已投递" name="name1">
            <Table border :columns="reportColnum" :data="reportList"></Table>
            <Page
              @on-change="changePageReport"
              :current="pageNo"
              :total="reportTital"
              style="float: right; margin-top: 10px"
            />
          </TabPane>
          <TabPane label="被查看" name="name2">
            <Table border :columns="policyColnum" :data="policyList"></Table>
            <Page
              @on-change="changePagePolicy"
              :total="policyTital"
              style="float: right; margin-top: 10px"
            />
          </TabPane>
          <TabPane label="待沟通" name="name3">
            <Table border :columns="policyColnum" :data="policyList"></Table>
            <Page
              @on-change="changePagePolicy"
              :total="policyTital"
              style="float: right; margin-top: 10px"
            />
          </TabPane>
          <TabPane label="面试" name="name4">
            <Table border :columns="policyColnum" :data="policyList"></Table>
            <Page
              @on-change="changePagePolicy"
              :total="policyTital"
              style="float: right; margin-top: 10px"
            />
          </TabPane>
          <TabPane label="不合适" name="name5">
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
  methods: {
    RenderTable(name){

    }
  },
};
</script>

<style lang='less' scoped>
</style>
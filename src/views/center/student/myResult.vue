<template>
  <div style="background-color: #f2f2f2">
    <Tabbar whichItem="0" />
    <div class="center">
      <div class="left">
        <Stubar num="5"/>
      </div>
      <div class="right">

      </div>
    </div>

    <div style="height: 50px"></div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";
import Stubar from '@/components/center/stuBar'
export default {
  data() {
    return {

    };
  },
  components: {
    Tabbar,
    Stubar
  },
  mounted() {
  },
};
</script>

<style lang='less' scoped>

</style>
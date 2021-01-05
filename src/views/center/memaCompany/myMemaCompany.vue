<template>
  <div class="centerbg">
    <Tabbar whichItem="0" />
    <Companytop/>
    <router-view></router-view>
    <div style="height: 50px"></div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";
import Companytop from '@/components/center/companytop'
export default {
  data() {
    return {

    };
  },
  components: {
    Tabbar,
    Companytop,
  },
  mounted() {
  },
};
</script>

<style lang='less' scoped>

</style>
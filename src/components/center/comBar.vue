<template>
  <div>
    <div class="bar">
      <div :class="[ num==1 ? 'active' : '' ]" @click="goCenterList('Setting')">账号设置</div>
      <div :class="[ num==2 ? 'active' : '' ]" @click="goCenterList('Mema')">我的设备商</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    num: {
      type: String,
      default: 1,
    },
  },
  methods: {
    goCenterList(name){
      this.$router.push({name: name})
    }
  },
};
</script>

<style lang="less" scoped>
.bar {
  display: flex;
  padding: 10px 50px 9px;
  border-bottom: 1px solid #d1d1d1;
  div {
    text-align: center;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
    margin-right: 40px;
  }
} 
.active {
  color: #02A7F0;
}
</style>
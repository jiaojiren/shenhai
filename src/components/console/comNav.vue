<template>
  <div>
    <div class="bar">
      <div :class="[ num==1 ? 'active' : '' ]" @click="goCenterList('ConsoleCompany')">我的资料</div>
      <div :class="[ num==2 ? 'active' : '' ]" @click="goCenterList('UserManage')">用户管理</div>
      <div :class="[ num==3 ? 'active' : '' ]" @click="goCenterList('MemaManage')">合作商管理</div>
      <div :class="[ num==4 ? 'active' : '' ]" @click="goCenterList('DeviceManage')">设备管理</div>
      <div :class="[ num==5 ? 'active' : '' ]" @click="goCenterList('BaseManage')">实训基地管理</div>
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
  width: 1200px;
  margin: 0 auto;
  display: flex;
  padding: 10px 0 9px;
  // border-bottom: 1px solid #d1d1d1;
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
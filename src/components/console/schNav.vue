<template>
  <div>
    <div class="bar">
      <div :class="[ num==1 ? 'active' : '' ]" @click="goCenterList('ConsoleStudentManage')">学生管理</div>
      <div :class="[ num==2 ? 'active' : '' ]" @click="goCenterList('ConsoleProfessionManage')">专家管理</div>
      <div :class="[ num==3 ? 'active' : '' ]" @click="goCenterList('ConsoleCourseManage')">课程管理</div>
      <div :class="[ num==4 ? 'active' : '' ]" @click="goCenterList('ConsoleMemaManage')">设备厂管理</div>
      <div :class="[ num==5 ? 'active' : '' ]" @click="goCenterList('ConsoleTestManage')">考试管理</div>
      <div :class="[ num==6 ? 'active' : '' ]">认证管理</div>
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
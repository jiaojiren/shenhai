<template>
  <div>
    <div class="bar">
      <div :class="[ num==1 ? 'active' : '' ]" @click="goCenterList('UserSetting')">账号设置</div>
      <div :class="[ num==2 ? 'active' : '' ]" @click="goCenterList('MyCollection')">我的收藏</div>
      <div :class="[ num==3 ? 'active' : '' ]" @click="goCenterList('MyDeliver')">我的投递</div>
      <div :class="[ num==4 ? 'active' : '' ]" @click="goCenterList('MyCourse')">我的课程</div>
      <div :class="[ num==5 ? 'active' : '' ]" @click="goCenterList('MyResult')">我的成果</div>
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
  div {
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    user-select: none;
  }
} 
.active {
  background-color: #fff;
}
</style>
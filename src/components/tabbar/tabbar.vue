<template>
  <div>
    <div class="tabbar">
      <div class="tabbar-int">
        <div class="tabbar-wrap">
          <Menu mode="horizontal" :active-name="whichItem">
            <MenuItem name="1" to="/"> 首页 </MenuItem>
            <MenuItem name="2" to="/arDistancEducation"> AR远程教学 </MenuItem>
            <MenuItem name="3" to="/skill"> 技能认证 </MenuItem>
            <MenuItem name="4" class="college">
              <Dropdown @on-click="ModeJump">
                <span @click="$router.push({ path: '/college' })">
                  产业学院
                  <!-- <Icon type="md-arrow-dropdown"></Icon> -->
                </span>
                <DropdownMenu slot="list">
                  <DropdownItem name="/college2"
                    >AR虚拟仿真实训</DropdownItem
                  >
                </DropdownMenu>
              </Dropdown>
            </MenuItem>
            <MenuItem name="5" to="/mediaInformation"> 媒体与资讯 </MenuItem>
            <MenuItem v-if="isCompany" name="6" to="/talentsTransportComp"> 人才输送 </MenuItem>
            <MenuItem v-else name="6" to="/talentsTransport"> 人才输送 </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {state} from '@/store'
export default {
  props: {
    whichItem: {
      type: String,
      default: "",
    },
  },
  computed: {
    isCompany() {
      return(state.userInfo.TypeID1 == 1)
    }
  },
  mounted() {

  },
  methods: {
    ModeJump(name) {
      this.$router.push({ path: name });
    },
  },
};
</script>

<style lang='less' scoped>
.tabbar {
  width: 100%;
  height: 50px;
  // background-color: #1c3c74;
}
.tabbar-int {
  width: 100%;
  height: 50px;
  background-color: #1c3c74;
}
.tabbar-wrap {
  width: 1280px;
  margin: 0 auto;
}
.tabbar .ivu-menu {
  height: 50px;
  background-color: #1c3c74;

  .ivu-menu-item {
    color: #fff;
    line-height: 50px;
    padding: 0;
    margin: 0 20px;
  }
  .ivu-menu-item-active {
    border-bottom: 4px solid #2d8cf0;
  }
  &:after {
    display: none;
  }
}
</style>
<template>
  <div>
    <div>
      <!-- 头部 -->
      <div class="header">
        <div class="header-wrap">
          <div class="lc-logo">
            <img
              class="logo-img"
              style="cursor: pointer"
              @click="$router.push({ path: '/' })"
              src="@/assets/images/logo.png"
            />
          </div>
          <div class="nav-menu">
            <ul class="nav-menu-right">
              <li class="menu-search menu-item">
                <div class="search-input">
                  <Input
                    style="width: 250px; margin-right: 5px"
                    size="large"
                    placeholder="请输入搜索关键词"
                  />
                  <Button style="width: 80px" size="large" type="primary"
                    >搜索</Button
                  >
                </div>
              </li>
              <li v-if="!isLogin" class="menu-login menu-item">
                <div @click="$router.push({ path: '/login' })">登录</div>
              </li>
              <li v-if="!isLogin" class="menu-register menu-item">
                <div @click="$router.push({ path: '/register' })">注册</div>
              </li>
              <li v-if="isLogin" class="menu-avatar menu-item">
                <div @mouseover="userInfoShow" @mouseleave="userInfoHide">
                  黄
                </div>
              </li>
              <div
                class="usermenu"
                v-show="userInfoIsShow"
                @mouseover="userInfoShow"
                @mouseleave="userInfoHide"
              >
                <a @click="toCenter">个人中心</a>
                <a>退出登录</a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      userInfoIsShow: false,
    };
  },
  methods: {
    userInfoShow() {
      this.userInfoIsShow = true;
    },
    userInfoHide() {
      this.userInfoIsShow = false;
    },
    toCenter(){
      this.$router.push({path: '/userSetting'})
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  z-index: 1001;
  background-color: #0c151b;
  .header-wrap {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    .nav-menu {
      .nav-menu-right {
        display: flex;
        height: 100%;
        position: relative;
        .menu-login {
          margin-left: 80px;
          cursor: pointer;
        }
        .menu-register {
          margin-left: 20px;
          cursor: pointer;
        }
        .menu-avatar {
          width: 40px;
          height: 40px;
          margin-top: 20px;
          margin-left: 80px;
          border-radius: 50%;
          background: #2d8cf0;
          text-align: center;
          line-height: 40px;
          div {
            height: 100%;
            line-height: 40px;
            font-size: 18px;
            cursor: pointer;
          }
        }
        .menu-search {
          .search-input {
            display: flex;
            height: 100%;
            align-items: center;
            margin-left: 350px;
          }
        }
        .menu-item {
          color: #fff;
          font-size: 16px;
          line-height: 80px;
        }
        .usermenu a {
          padding: 3px 0 3px 16px;
          color: #333;
          font-size: 12px;
          line-height: 23px;
          display: block;
        }
        .usermenu a:hover {
          color: #57a3f3;
        }
        .usermenu {
          position: absolute;
          z-index: 1000;
          width: 84px;
          background: #fff;
          border-radius: 12px;
          top: 60px;
          right: -22px;
          padding: 8px 0;
          box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
}
</style>
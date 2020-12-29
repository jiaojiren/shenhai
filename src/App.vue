<template>
  <div id="app">
    <Header
      style="flex: 0"
      v-if="!this.$router.history.current.meta.noHeader"
    />
    <router-view style="flex: 1" />
    <BackTop></BackTop>
    <Footer
      style="flex: 0"
      v-if="!this.$router.history.current.meta.noFooter"
    />
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import plLazy from "@/components/plLazy";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
    plLazy,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
/* html, body{
  width:100%;
  height:100%;
  min-width: 1280px;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* height: 100%; */
  min-width: 1280px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  vertical-align: top;
  border: none;
}
</style>

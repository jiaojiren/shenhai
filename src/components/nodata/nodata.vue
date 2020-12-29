<template>
  <div class="zwsj">
    <img :src="icon" :width="imgW" :height="imgH"/>
    <div style="color: #999;font-size: 12px;margin-top: 5px">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'Nodata',
  props: {
    icon: {
      require: true
    },
    text: {
      require: true
    },
    imgW: {
      default: '240px'
    },
    imgH: {
      default: '80px'
    }
  }
}
</script>

<style scoped>
  .zwsj {
    text-align: center;
  }
</style>

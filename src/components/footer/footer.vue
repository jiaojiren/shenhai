<template>
  <div>
    <!-- 底部 -->
    <div class="footer">
      <table style="width: 1200px; margin: 0 auto; min-height: 200px">
        <tr>
          <td style="width: 350px; border-right: 1px solid #999">
            <img src="@/assets/images/logo_bottom.png" />
          </td>
          <td valign="top" style="padding: 5px 30px 10px 30px">
            <div class="hz-title">合作单位</div>
            <div class="hz-item">中国电子劳动学会校企合作促进会</div>
            <div class="hz-item">海尔智慧校园产教融合平台</div>
            <div class="hz-item">聊城职业技术学院</div>
          </td>
          <td valign="top" style="padding: 5px 0px 10px 0px">
            <div class="hz-title">联系方式</div>
            <div class="hz-item">
              地址：山东省青岛市高新区汇智桥路127号青岛国家大学科技园
            </div>
            <div class="hz-item">邮箱：1021690593@qq.com</div>
            <div class="hz-item">招商咨询电话：17353422136</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer {
  // position: absolute;
  // bottom: 0;
  width: 100%;
  height: 300px;
  background-color: #444444;
  padding: 50px 0;
  table {
    tr {
      .hz-title {
        font-size: 20px;
        padding: 10px;
      }
      .hz-item {
        padding: 10px;
      }
      td {
        text-align: left;
        font-size: 17px;
        color: #ffffff;
        font-weight: 500;
        height: 30px;
        padding: 10px;
      }
    }
  }
}
</style>
<template>
  <div>
    <Tabbar whichItem="3" />
    <div class="skill">
      <div class="top">
        <div class="head">
          <h1>考试日历表</h1>
        </div>
        <div class="mode">认证报名/国家资质/考试资讯/成绩查询</div>
        <div class="month">
          <div class="item">1月</div>
          <div class="item">2月</div>
          <div class="item">3月</div>
          <div class="item">4月</div>
          <div class="item">5月</div>
          <div class="item">6月</div>
          <div class="item">7月</div>
          <div class="item">8月</div>
          <div class="item">9月</div>
          <div class="item">10月</div>
          <div class="item">11月</div>
          <div class="item">12月</div>
        </div>
      </div>
      <div class="type">
        <div class="type-item">
          <p>类别一</p>
          <div class="wrap">
            <div class="name">名称一</div>
            <div class="name">名称二</div>
            <div class="name">名称三</div>
            <div class="name">名称四</div>
          </div>
        </div>
        <div class="type-item">
          <p>类别一</p>
          <div class="wrap">
            <div class="name">名称一</div>
            <div class="name">名称二</div>
            <div class="name">名称三</div>
            <div class="name">名称四</div>
          </div>
        </div>
        <div class="type-item">
          <p>类别一</p>
          <div class="wrap">
            <div class="name">名称一</div>
            <div class="name">名称二</div>
            <div class="name">名称三</div>
            <div class="name">名称四</div>
          </div>
        </div>
      </div>
      <div class="table">
        <Table border :columns="column" :data="tableData"></Table>
      </div>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";
export default {
  data() {
    return {
      column: [
        {
          title: "考试名称",
          align: "center",
          key: "name",
        },
        {
          title: "报名时间",
          align: "center",
          key: "time",
        },
        {
          title: "考试时间",
          align: "center",
          key: "date",
        },
        {
          title: "成绩查询",
          align: "center",
          key: "check",
        },
        {
          title: "主办机构",
          align: "center",
          key: "jigou",
        },
        {
          title: "报名链接",
          align: "center",
          key: "link",
        },
      ],
      tableData: [
        {
          name: 'jjj',
          time: 'jjj',
          date: 'jjj',
          check: 'jjj',
          jigou: 'jjj',
          link: 'jjj'
        }
      ]
    };
  },
  components: {
    Tabbar,
  },
};
</script>

<style lang='less' scoped>
.skill {
  width: 1200px;
  margin: 0 auto;
  .top {
    height: 210px;
    margin-top: 20px;
    background-color: #0094ff;
    .head {
      padding: 10px;
      h1 {
        line-height: 1;
        font-size: 36px;
        font-weight: 400;
        margin: 20px 0 10px;
        color: #fff;
        text-align: center;
      }
    }
    .mode {
      color: #fff;
      font-size: 17px;
      text-align: center;
    }
    .month {
      margin-top: 45px;
      display: flex;
      justify-content: space-around;
      .item {
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .type {
    padding: 10px 20px 20px;
    display: flex;
    justify-content: space-between;
    .type-item {
      width: 250px;
      box-shadow: 2px 2px 8px 0 #ddd;
      p {
        padding-top: 10px;
        text-align: center;
        font-size: 16px;
        height: 35px;
        line-height: 25px;
      }
      .wrap {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0;
        .name {
          text-align: center;
          width: 50%;
          margin: 10px 0;
        }
      }
    }
  }
  .table {
    margin-top: 20px;
    /deep/ .ivu-table-header .ivu-table-column-center{
      height: 80px;
      background-color: #6fb7ff;
      color: #fff;
    }
  }
}
</style>
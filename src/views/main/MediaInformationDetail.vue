<template>
  <div>
    <Tabbar whichItem="5" />
    <div class="media-info">
      <div class="left">
        <div class="left-top">
          <div class="left-top-int" v-for="item in mediaInfoLabel" :key="item.pk_Category" @click="GoLastPage(item.pk_Category)"><div>{{item.CategoryName}}</div></div>
        </div>
        <div class="left-con">
          <div class="title">
            {{newsDetail.Title}}
          </div>
          <div class="int">
            <div class="type">
              <span>类别：</span>
              <span>{{type}}</span>
            </div>
            <div class="num">
              <span>浏览量：</span>
              <span>{{newsDetail.Clicks}}</span>
            </div>
            <div class="date">
              <span>日期：</span>
              <span>{{newsDetail.CreateDate}}</span>
            </div>
          </div>
          <div class="int2">
            <!-- <div class="type">
              <span>山东省教育厅</span>
              <span></span>
            </div>
            <div class="date">
              <span>发布日期：</span>
              <span>2020-12-18</span>
            </div>
            <div class="num">
              <span>浏览次数：</span>
              <span>304</span>
            </div> -->
            {{newsDetail.Subtitle}}
          </div>
          <div class="content" v-html="newsDetail.Description">
           
          </div>
        </div>
        
      </div>
      <div class="right">
        <div class="right-int">
          <div class="right-head">活动推荐</div>
          <div class="right-pic">
            <img
              src="@/assets/images/no_image.jpg"
            />
          </div>
          <div class="right-title">
            山东省教育科学研究院”网络与信息999999999999999999
          </div>
        </div>
        <div class="right-int">
          <div class="right-head">考试资讯</div>
          <div class="right-pic">
            <img
              src="@/assets/images/no_image.jpg"
            />
          </div>
          <div class="right-title">
            山东省教育科学研究院”网络与信息999999999999999999
          </div>
        </div>
      </div>
    </div>
    <div style="height: 80px"></div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";
import { getMediaInfoType, getNewsDetail } from '@/api'
export default {
  data() {
    return {
      newsDetail: {},
      pk_Article: null,
      mediaInfoLabel: [],
    }
  },
  components: {
    Tabbar,
  },
  computed : {
    type(){
      let type = 0;
      this.mediaInfoLabel.forEach((item,index)=> {
        if(item.pk_Category == this.newsDetail.CategoryID1){
          type = item.CategoryName
        }
      })
      return type
    }
  },
  mounted(){
    this.GetMediaInfoType()
    this.pk_Article = Number(this.$route.query.id)
    this.GetNewsDetail()
  },
  methods: {
    GetNewsDetail(){
      getNewsDetail({pk_Article: this.pk_Article}).then(res=>{
        if(res.ercode == 0){
          this.newsDetail = res.data
        }
      })
    },
    // 返回列表页
    GoLastPage(id){
      this.$router.push({name: 'MediaInformation', params: {id}})
    },
    // 获取媒体资讯种类
    GetMediaInfoType(){
      getMediaInfoType().then(res=>{
        if(res.ercode == 0) {
          this.mediaInfoLabel = res.data
        }
      })
    },
  },
};
</script>

<style lang='less' scoped>

.media-info {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  padding-top: 20px;
  .left {
    width: 900px;
    .left-top {
      height: 24px;
      display: flex;
      .left-top-int {
        width: 120px;
        border-right: 1px solid #ddd;
        div {
          text-align: center;
          font-size: 18px;
          color: #337ab7;
          cursor: pointer;
          &:hover {
            color: #23527c;
            text-decoration: underline;
          }
        }
      }
    }
    .left-con {
      padding: 10px;
      .title {
        padding: 20px 0 10px;
        font-size: 24px;
        color: #434343;
        font-weight: bold;
        text-align: center;
      }
      .int {
        color: #999999;
        display: flex;
        justify-content: center;
        .num {
          margin: 0 20px 10px;
        }
      }
      .int2 {
        margin-bottom: 10px;
        padding: 10px;
        background-color: #f7f9fc;
        display: flex;
        color: #333;
        .date {
          margin: 0 20px;
        }
      }
      .content {
        padding: 10px;
      }

    }
  }
  .right {
    width: 260px;
    .right-head {
      color: #333;
      font-weight: bold;
      font-size: 16px;
      padding: 10px 0;
    }
    .right-pic {
      img {
        width: 260px;
        height: 170px;
        cursor: pointer;
      }
    }
    .right-title {
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
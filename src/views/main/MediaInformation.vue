<template>
  <div>
    <Tabbar whichItem="5" />
    <div class="media-info">
      <div class="left">
        <div class="left-top">
          <div
            class="left-top-int"
            v-for="item in mediaInfoLabel"
            :key="item.pk_Category"
            @click="QueryNewsList(item.pk_Category)"
          >
            <div>{{ item.CategoryName }}</div>
          </div>
        </div>
        <div class="left-con" style="padding: 16px" v-if="mainLoading">
          <content-placeholders>
            <content-placeholders-heading :img="true" />
            <content-placeholders-text :lines="3" />
          </content-placeholders>
        </div>
        <div
          class="left-con"
          v-if="!mainLoading && newsList && newsList.length"
        >
          <div class="left-con-item" v-for="item in newsList" :key="item.ROWID">
            <div class="pic" @click="GoDetail(item.pk_Article)">
              <img v-if="item.ImagePath != null" :src="`http://web.deepeduplat.com/Files/${item.ImagePath}`" alt="" />
              <img v-else src="@/assets/images/no_image.jpg" alt="" />
            </div>
            <div class="wrap">
              <div class="title" @click="GoDetail(item.pk_Article)">
                {{ item.Title }}
              </div>
              <div class="content" @click="GoDetail(item.pk_Article)" v-html="item.Description"></div>
              <div class="bottom">
                <span class="date">{{ item.CreateDate }}</span
                ><span>{{ item.Clicks }}</span>
              </div>
            </div>
          </div>
          <div style="text-align: right; margin-top: 10px; padding-right: 20px">
            <Page
              :total="entityCount"
              :page-size="queryCondition.pageSize"
              :show-total="true"
              :current="queryCondition.pageNo"
              @on-change="changePage"
            />
          </div>
        </div>

        <div class="left-con" v-if="!mainLoading && !newsList.length">
          <Nodata
            style="margin: 15px 0"
            :icon="require('@/assets/images/nodata/none_content.png')"
            imgW="240px"
            imgH="180px"
            text="暂无数据"
          ></Nodata>
        </div>
      </div>
      <div class="right">
        <div class="right-int">
          <div class="right-head">活动推荐</div>
          <div class="right-pic">
            <img v-if="rightDataEvent.ImagePath != null" :src="`http://web.deepeduplat.com/Files/${rightDataEvent.ImagePath}`" alt="" />
            <img v-else src="@/assets/images/no_image.jpg" />
          </div>
          <div class="right-title" v-if="rightDataEvent.Title">
           {{rightDataEvent.Title}}
          </div>
        </div>
        <div class="right-int">
          <div class="right-head">考试资讯</div>
          <div class="right-pic">
            <img v-if="rightDataExamInfo.ImagePath != null" :src="`http://web.deepeduplat.com/Files/${rightDataExamInfo.ImagePath}`" alt="" />
            <img v-else src="@/assets/images/no_image.jpg" />
          </div>
          <div class="right-title" v-if="rightDataExamInfo.Title">
            {{rightDataExamInfo.Title}}
          </div>
        </div>
      </div>
    </div>
    <div style="height: 80px"></div>
  </div>
</template>
<script>
import Tabbar from "@/components/tabbar";
import { getMediaInfoType, getNewsList, getRightInfo } from "@/api";
export default {
  data() {
    return {
      mainLoading: true,
      mediaInfoLabel: [],
      queryCondition: {
        CategoryID: null,
        pageNo: 1,
        pageSize: 5,
      },
      newsList: [],
      entityCount: 0,
      rightDataEvent: {},
      rightDataExamInfo: {},
    };
  },
  components: {
    Tabbar,
  },
  mounted() {
    this.GetMediaInfoType();
    this.GetRightInfo();
  },
  methods: {
    // 获取右侧信息
    GetRightInfo(){
      getRightInfo().then(res=>{
        if(res.ercode == 0){
          this.rightDataEvent = res.data.event;
          this.rightDataExamInfo = res.data.examInfo
        }
      })
    },
    // 无筛选获取新闻列表
    GetNewsList(id) {
      this.mainLoading = true;
      this.newsList = [];
      getNewsList(this.queryCondition).then((res) => {
        this.mainLoading = false;
        if (res.ercode == 0) {
          if (res.data) {
            this.newsList = res.data.entities;
            this.entityCount = res.data.entityCount;
          }
        }
      });
    },
    // 筛选获取新闻列表
    QueryNewsList(id) {
      this.mainLoading = true;
      this.newsList = [];
      if (id) {
        this.queryCondition.CategoryID = id;
      }
      this.queryCondition.pageNo = 1;
      getNewsList(this.queryCondition).then((res) => {
        this.mainLoading = false;
        if (res.ercode == 0) {
          if (res.data) {
            this.newsList = res.data.entities;
            this.entityCount = res.data.entityCount;
          }
        }
      });
    },
    // 获取媒体资讯种类
    GetMediaInfoType() {
      getMediaInfoType().then((res) => {
        if (res.ercode == 0) {
          this.mediaInfoLabel = res.data;
          this.queryCondition.CategoryID = this.$route.params.id
            ? Number(this.$route.params.id)
            : this.mediaInfoLabel[0].pk_Category;
          this.QueryNewsList();
        }
      });
    },
    GoDetail(id) {
      this.$router.push({ path: "/mediaInformationDetail", query: { id } });
    },
    changePage(pageNo) {
      this.queryCondition.pageNo = pageNo;
      this.GetNewsList();
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
      padding: 0 20px 0 0;
      .left-con-item {
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        display: flex;
        .pic {
          width: 280px;
          height: 170px;
          img {
            cursor: pointer;
            width: 260px;
            height: 100%;
          }
        }
        .wrap {
          width: 570px;
          height: 170px;
          overflow: hidden;
          .title {
            color: #337ab7;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            &:hover {
              color: #23527c;
              text-decoration: underline;
            }
          }
          .content {
            cursor: pointer;
            padding-top: 10px;
            font-size: 14px;
            color: #999999;
            line-height: 1.4;

            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
            &:hover {
              text-decoration: underline;
            }
          }
          .bottom {
            padding-top: 10px;
            color: #333;
            .date {
              display: inline-block;
              margin-right: 30px;
            }
          }
        }
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
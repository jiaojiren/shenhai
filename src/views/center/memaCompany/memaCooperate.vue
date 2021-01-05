<template>
  <div>
    <div>
      <div class="ccenter">
        <div class="left">
          <MemaComBar num="2" />
          <div class="list">
            <div class="item" v-for="item in list" :key="item.pk_Company_Cor">
              <div class="pic">
                <img
                  v-if="item.PartyBInfo.CompLogo != null"
                  :src="item.PartyBInfo.CompLogo"
                  alt=""
                /><img v-else src="@/assets/images/no_image.jpg" alt="" />
              </div>
              <div class="pro">
                <p class="title">{{ item.PartyBInfo.CompanyName }}</p>
                <div class="status">
                  <Tag color="blue">{{ item.PartyBInfo.StatusID }}</Tag>
                </div>
                <div class="type">
                  <span style="margin-right: 40px"
                    >企业类型：{{ item.PartyBInfo.CompType }}</span
                  ><span>行业：{{ item.PartyBInfo.CompIndustry }}</span>
                </div>
                <div class="area">
                  <span>经营范围：{{ item.PartyBInfo.CompBusiness }}</span>
                </div>
              </div>
              <div class="opt">
                <div class="del" @click="deleteCor(item.pk_Company_Cor)">
                  <Icon type="ios-trash" size="18" /><span
                    style="font-size: 12px"
                    >删除</span
                  >
                </div>

                <Button
                  type="primary"
                  ghost
                  @click="showModal(item.pk_Company_Cor)"
                  >编辑备注</Button
                >
              </div>
            </div>
            <div style="text-align: right; margin-top: 10px;">
            <Page
              :total="entityCount"
              :page-size="Condition.pageSize"
              :show-total="true"
              :current="Condition.pageNo"
              @on-change="changePage"
            />
          </div>
          </div>
        </div>
        <div class="right">
          <div class="btn" @click="addCooperate">添加合作企业</div>
          <div class="table">
            <p>课程中心</p>
            <div class="wrap">
              <div class="item">昨日浏览量</div>
              <div class="item">昨日收藏量</div>
              <div class="item">昨日下载量</div>
              <div class="item">昨日学习量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="modal" title="修改备注" @on-ok="editRemark">
      <Input
        v-model="Remark"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 5 }"
      ></Input>
    </Modal>
  </div>
</template>
<script>
import { corPageList, corDeleteByPk, modifyRemark } from "@/api";
import MemaComBar from "@/components/center/memaComBar";
export default {
  data() {
    return {
      list: [],
      Condition: {
        pageNo: 1,
        pageSize: 10,
      },
      entityCount: null,
      pk_id: null,
      modal: false,
      Remark: "",
    };
  },
  components: {
    MemaComBar,
  },
  mounted() {
    this.GetcorPageList();
  },
  methods: {
    showModal(id) {
      this.modal = true;
      this.pk_id = id;
      this.list.forEach((item,i)=>{
        if(item.pk_Company_Cor == id) {
          this.Remark = item.Remark
        }
      })
    },
    // 编辑备注
    editRemark() {
      modifyRemark({ pk_Company_Cor: this.pk_id, Remark: this.Remark }).then(
        (res) => {
          if (res.ercode == 0) {
            this.$Message.success(res.data);
            this.GetcorPageList()
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
    },
    deleteCor(id) {
      corDeleteByPk({ pk_Company_Cor: id }).then((res) => {
        if (res.ercode == 0) {
          this.$Message.success(res.data);
          this.Condition.pageNo = 1;
          this.GetcorPageList;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    GetcorPageList() {
      corPageList(this.Condition).then((res) => {
        if (res.ercode == 0) {
          this.list = res.data.entities;
          this.entityCount = res.data.entityCount
        }
      });
    },
    addCooperate() {
      this.$router.push({ name: "AddCooperator" });
    },
    changePage(pageNo){
      this.Condition.pageNo = pageNo
      this.GetcorPageList()
    },
  },
};
</script>

<style lang='less' scoped>
.list {
  padding: 0 20px 20px 20px;
  .item {
    padding: 20px 0;
    display: flex;
    border-bottom: 1px solid #ddd;
    .pic {
      width: 135px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pro {
      flex: 1;
      padding-left: 20px;
      .title {
        color: #333;
        font-weight: bold;
        font-size: 16px;
      }
      .status {
        margin: 10px 0 20px 0;
      }
      .type {
        margin-bottom: 10px;
      }
      .area {
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .opt {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      .del {
        text-align: right;
        cursor: pointer;
      }
    }
  }
}
.right-item {
  p {
    margin: 10px 0;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    span:nth-child(1) {
      width: 5px;
      height: 18px;
      display: inline-block;
      background-color: #2b85e4;
      margin-right: 10px;
      vertical-align: middle;
    }
    span:nth-child(2) {
      vertical-align: middle;
    }
  }
  div {
    margin: 20px 20px;
    span {
      font-size: 12px;
      margin-left: 20px;
      cursor: pointer;
      color: royalblue;
    }
  }
}
</style>
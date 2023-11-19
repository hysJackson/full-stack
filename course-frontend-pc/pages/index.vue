<script setup lang="ts">
import Banner from './index/Banner.vue'
import Classify from './index/Classify.vue'
import UserInformation from './index/UserInformation.vue'
import CardContainer from './index/CardContainer.vue'
import { getCardList } from '~/api/card'
import AliYun from './index/AliYun.vue'
import AboutInstructor from './index/instructor/AboutInstructor.vue'
// import BroadSide from './index/BroadSide.vue'

// 视频卡片列表请求接口
const cardList = $ref((await getCardList()).data)

useHead({
  title:"Jackson's Online Education - HomePage"
})

</script>

<template>
  <div style="width: 1200px; min-width: 1200px">
    <div class="main">
      <!-- 分类 -->
      <div class="menu">
        <Classify />
      </div>
      <!-- 轮播图 -->
      <div class="swiper">
        <Banner />
      </div>
      <!-- 个人信息 -->
      <div class="user">
        <UserInformation />
      </div>
    </div>
    <!-- 热门课程 -->
    <div class="two-card-container">
      <CardContainer :title="cardList[0].name" :choice-card="0" :sub-titles="[cardList[0].summay]"
        :cards="cardList[0].product_list">
        <!-- 卷王排行榜 -->
        <AliYun />

        <!-- <LearnRankList /> -->
      </CardContainer>
    </div>
    <!-- 新课上线 -->
    <div class="two-card-container">
      <CardContainer :title="cardList[1].name" :choice-card="0" :sub-titles="[cardList[1].summay]"
        :cards="cardList[1].product_list">
        <!-- 热销排行榜 -->
        <AliYun />

        <!-- <HotProduct /> -->
      </CardContainer>
    </div>
    <!-- 中级后端工程师 -->
    <div class="two-card-container">
      <CardContainer :title="cardList[2].name" :choice-card="0" :sub-titles="[cardList[2].summay]"
        :cards="cardList[2].product_list">
        <!-- 阿里云海报和活动轮播图 -->
        <AliYun />
      </CardContainer>
    </div>
    <!-- 高级前端技术栈 -->
    <div class="card-container">
      <CardContainer :title="cardList[3].name" :choice-card="1" :sub-titles="[cardList[3].summay]"
        :cards="cardList[3].product_list" />
    </div>
    <!-- 讲师介绍 -->
    <div class="card-container" h-401px>
      <AboutInstructor />
    </div>
    <!-- 侧边栏 -->
     <client-only>
      <!-- <BroadSide /> -->
    </client-only> 
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  height: 400px;
  margin-bottom: 20px;

  .swiper {
    flex: 5;
    border-radius: 10px;
  }
}

.card-container {
  margin-bottom: 20px;
}

.two-card-container {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}
</style>
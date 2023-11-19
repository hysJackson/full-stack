<script lang="ts" setup>
const { item, index } = defineProps(['item', 'index'])

// 章节收缩
let sectionShow = $ref(false)
const chapterClick = () => {
  sectionShow = !sectionShow
}

</script>

<template>
  <div wfull class="b b-#f2f2f2">
    <!-- 章模块 -->
    <div class="chapter" @click="chapterClick">
      <div>
        <span>{{ `第 ${index + 1} 章 ` }}&nbsp;</span>
        <span>{{ item.title }}</span>
      </div>
      <div w-20px h-12px mr-40px>
        <img src="/images/svg/arrows-up-down.svg" :style="{ transform: !sectionShow ? 'rotate(180deg)' : '' }" />
      </div>
    </div>
    <!-- 集模块 -->
    <div class="collection" flex v-for="(subItem, subIndex) in item.episodeList"
      v-show="sectionShow && item.episodeList.length > 0">
      <div flex>
        <img w-22px h-22px src="/images/play.png" />
        <div ml-2px>{{ `第 ${subIndex + 1} 节 &nbsp;${subItem.title}` }}</div>
      </div>
      <div class="free" v-show="subItem.free === 0">试看</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.chapter {
  width: 100%;
  height: 44px;
  font-size: 18px;
  line-height: 44px;
  padding-left: 30px;
  color: #333333;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: rgba(215, 215, 215, 0.1);
}

.collection {
  font-size: 16px;
  margin-top: 13px;
  color: #666666;
  cursor: pointer;
  padding: 0 76px 0 76px;
  justify-content: space-between;

  .free {
    color: red;
  }

  &:last-child {
    margin-bottom: 13px;
  }
}
</style>
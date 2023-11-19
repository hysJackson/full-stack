<script lang="ts" setup>
import ChapterSection from './ChapterSection.vue'
import { getChapter } from '~/api/product'

const { id } = defineProps<{ id: number }>()

// 目录接口数据
const chapterList = reactive((await getChapter(id)).data)

</script>

<template>
  <div>
    <div class="outlineItem" v-for="(item, index) in chapterList">
      <!-- 大纲组件 -->
      <ChapterSection :item="item" :index="index" mb-20px />
    </div>
  </div>
</template>

<style lang="less" scoped>
.outlineItem {
  display: flex;
  align-items: center;
}
</style>
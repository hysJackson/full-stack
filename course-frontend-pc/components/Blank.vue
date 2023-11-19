<script lang="ts" setup>
interface IProps {
  text: string
}
const { text } = defineProps<IProps>()
</script>

<template>
  <div class="blank">
    <img src="/images/blank_img.png" w-256px h-256px />
    <p text-16px color="#4d555d">{{ text }}</p>
  </div>
</template>

<style lang="less" scoped>
.blank {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50px;
}
</style>
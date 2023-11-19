<script lang="ts" setup>
interface IProps { pagination: { page: number, total: number, pageSize: number } }
const props = defineProps<IProps>()
// 调用从父组件继承的事件
const emits = defineEmits<{ (e: 'change', page: number): void }>()
const _pageSize = props.pagination.pageSize

// 页面切换
const go = (page: number) => {
  emits('change', page)
}

// 首页、第一页是否可点击
const isStart = computed(() => {
  return props.pagination.page === 1
})
// 尾页、下一下是否可点击
const isEnd = computed(() => {
  return props.pagination.page === Math.ceil(props.pagination.total / props.pagination.pageSize)
})
</script>

<template>
  <div class="pagination">
    <span mr-30px @click="go(1)" :class="{ disable: isStart }">首页</span>
    <span mr-40px @click="go(pagination.page - 1)" :class="{ disable: isStart }">上一页</span>
    <a-pagination size="small" show-less-items :show-size-changer="false" :show-quick-jumper="false"
      :total="pagination.total" v-model:current="pagination.page" @change="$emit('change', $event)"
      :page-size="_pageSize" />
    <span ml-20px @click="go(pagination.page + 1)" :class="{ disable: isEnd }">下一页</span>
    <span ml-30px @click="go(Math.ceil(pagination.total / pagination.pageSize))" :class="{ disable: isEnd }">
      尾页
    </span>
  </div>
</template>

<style lang="less" scoped>
.pagination {
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;

  span {
    font-size: 16px;
    color: #555555;
    cursor: pointer;

    &.disable {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  :deep(.ant-pagination) {
    display: flex;
    justify-content: center;

    .ant-pagination-item {
      border: none;
      background-color: #f2f2f2;
      margin-right: 20px;

      a {
        padding: 0;
        height: auto;
        font-size: 14px;
        color: #555555;
      }

      &.ant-pagination-item-active {
        background-color: #4d555d;

        a {
          color: white;
        }
      }
    }

    // 隐藏原有的切换页面按钮
    .ant-pagination-prev {
      display: none;
      cursor: default;
    }

    .ant-pagination-next {
      display: none;
      cursor: default;
    }
  }
}
</style>

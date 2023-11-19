<script setup lang="ts">
import { getCategoryList } from '~/api/category'
import { queryProductByCid } from '~/api/product'
import CardContainer from './index/CardContainer.vue'
const route = useRoute()

// 当前id
const currentId = computed(() => {
  return route.query.id || '0'
})

// 方向列表
const categoryList = reactive((await getCategoryList()).data)

// 分类列表
const getSubCategoryList = computed(() => {
  if (currentId.value === '0') {
    return categoryList.flatMap((item) => item.subCategoryList)
  } else {
    return categoryList
      .map((item) => item.id === Number(currentId.value) && item)
      .flatMap((item) => item.subCategoryList)
      .filter((item) => item)
  }
})

// 判断query中的参数是否匹配
const isMatch = (key: string, value: string) => {
  const test = new RegExp(`(${key}=)[^&]+`).test(route.fullPath)
    ? new RegExp(`(${key}=)[^&]+`).exec(route.fullPath)[0] === `${key}=${value}`
    : false
  return test ? 'primary' : 'text'
}

// 分类参数跳转的封装
const navigateToParser = (key: string, value: string) => {
  let path = route.fullPath
  // 未选择分类时的点击
  if (path.indexOf('?') == -1) {
    navigateTo(`${path}?${key}=${value}`)
    return
  }

  // 选中分类时替换分类的值
  new RegExp(`(${key}=)[^&]+`).test(path)
    ? (path = path.replace(new RegExp(`(${key}=)[^&]+`), `$1${value}`))
    : (path = `${path}&${key}=${value}`)

  navigateTo(path)
}

// 课程列表接口请求
let data = $ref((
  await queryProductByCid({
    cid: Number(route.query.cid) || undefined,
    page: Number(route.query.page) || 1,
    size: 12,
    cpid: Number(route.query.id) || undefined,
  })).data
)

// 分页数据
const pagination = reactive({
  page: Number(route.query.page) || 1, // 当前页数
  pageSize: 12, // 当前页视频个数
  total: data.total_record, // 当前视频总数
  cards: data.current_data as any // 视频列表
})

// 切换分页
const onPaginationChange = (page: number) => {
  navigateToParser('page', page.toString())
}

useHead({
  title: '小滴课堂 - 课程中心'
})

</script>

<template>
  <div wfull flexc flex-col>
    <div wfull flexc bg="#f9f9f9">
      <div class="category" flex flex-col w-1200px>
        <div class="line">
          <span>方向：</span>
          <a-button :type="currentId === '0' ? 'primary' : 'text'" @click="navigateTo(`/videoListPage?id=0`)">
            全部
          </a-button>
          <a-button :key="item.id" :type="isMatch('id', `${item.id}`)" v-for="item in categoryList"
            @click="navigateTo(`/videoListPage?id=${item.id}`)">
            {{ item.name }}
          </a-button>
        </div>
        <div class="line" overflow-warp>
          <span>分类：</span>
          <a-button :type="!$route.query.cid ? 'primary' : 'text'"
            @click="navigateTo(`/videoListPage?id=${currentId}`)">
            全部
          </a-button>
          <a-button v-for="item in getSubCategoryList" :type="isMatch('cid', `${item.id}`)"
            @click="navigateToParser('cid', `${item.id}`)">
            {{ item.name }}
          </a-button>
        </div>
      </div>
    </div>
    <div class="video-list" flexc>
      <div class="left" v-if="pagination.cards.length > 0">
        <CardContainer card-size="small" :gridRows="1" :gridColumns="3" :choiceCard="0" :cards="pagination.cards" />
        <Pagination :pagination="pagination" @change="onPaginationChange" />
      </div>
      <div v-else :style="{ width: '100%', textAlign: 'center', marginTop: '300px' }">
        <Blank text="暂无课程。。。" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.category {
  width: 1200px;
  height: 120px;
  margin-bottom: 10px;

  span {
    font-weight: bold;
    margin-right: 24px;
  }

  .line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 14px;

    &:first-child {
      margin-top: 14px;
    }

    span:first-child {
      color: #333333;
      font-size: 16px;
      height: 24px;
    }

    &> :deep(.ant-btn) {
      margin-right: 24px;
    }

    :deep(.ant-btn-text) {
      padding: 0;
      color: #555555;
    }

    :deep(.ant-btn-primary) {
      padding: 5px;
      height: 24px;
      line-height: 5px;
      font-size: 14px;
      border-radius: 5px;
      border-color: #f38e48;
      background-color: #f38e48;
    }
  }
}

.video-list {
  width: 1200px;

  .left {
    display: flex;
    width: 898px;
    flex-direction: column;
    justify-content: space-between;
  }

  .right {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    margin-top: 24px;

    &>div {
      width: 284px;
    }

    .calendar {
      margin-top: 26px;
      border-radius: 10px;
    }
  }
}

.sort {
  width: 1200px;
  display: flex;
  margin-top: 20px;

  .ant-btn {
    height: 24px;
    font-size: 14px;
    color: #f38e48;
    line-height: 5px;
    padding: 5px 20px;
    border-radius: 5px;
    margin-right: 30px;
    border-color: #f38e48;
  }

  :deep(.ant-btn-primary) {
    color: white;
    background-color: #f38e48;
  }
}
</style>
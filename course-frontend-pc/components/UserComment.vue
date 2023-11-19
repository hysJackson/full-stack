<script lang="ts" setup>
import { getComment } from '~/api/comment'
import type { IComment } from '~/types/api';
import dayjs from 'dayjs'

const { id } = defineProps<{ id: number }>()
// 分页器默认数据
const paginationData = reactive({ page: 1, total: 0, pageSize: 8 })
const { videoInfor } = $(useVideo())

// 评论列表接口请求
let data = $ref<IComment>()
data = (await getComment({ page: paginationData.page, size: paginationData.pageSize, id })).data

// 修改总数
paginationData.total = data?.total_record || 0

// 分页器的切换重新请求接口数据
const change = async (page: number) => {
  paginationData.page = page
  data = data = (await getComment({ page, id, size: paginationData.pageSize })).data
}
</script>

<template>
  <div wfull>
    <div class="evaluation">
      <div flex items-center mr-74px>
        <h2>综合<br />评分</h2>
        <h2 class="text-52px! color-#f38e48! ml-5px w-60px!">
          {{ ((videoInfor.contentPoint + videoInfor.easyPoint + videoInfor.logicPoint) / 3).toFixed(2) }}
        </h2>
      </div>

      <div class="vertical-line"></div>

      <div flexc flex-col ml-65px mr-65px font-500>
        <span text-28px color="#f38e48">{{ videoInfor.contentPoint }}</span>
        <span text-20px color="#222222" w-87px>内容实用</span>
      </div>
      <div class="vertical-line"></div>

      <div flexc flex-col ml-65px mr-65px font-500>
        <span text-28px color="#f38e48">{{ videoInfor.easyPoint }}</span>
        <span text-20px color="#222222" w-87px>简洁易懂</span>
      </div>
      <div class="vertical-line"></div>

      <div flexc flex-col ml-65px mr-65px font-500>
        <span text-28px color="#f38e48">{{ videoInfor.logicPoint }}</span>
        <span text-20px color="#222222" w-87px>逻辑清晰</span>
      </div>
    </div>

    <div v-for="item in data?.current_data ?? []" :key="item.id" ml-34px mt-39px>
      <div flex>
        <img w-60px h-60px :src="item.head_img" class="rounded-full" />
        <div ml-10px wfull>
          <div flexb>
            <span text="#333333" text-20px>{{ item.username }}</span>
            <!-- <a-rate :value="item.total_point / 10 / 2" disabled character="★" /> -->
          </div>
          <p text-16px mt-6px color="#555555">{{ item.content }}</p>

          <div flexb p1 color="#aaaaaa">
            <span>{{ dayjs(item.gmt_create).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
        </div>
      </div>
    </div>

    <pagination v-model:pagination="paginationData" @change="change" v-if="paginationData.page > 1" />
  </div>
</template>

<style lang="less" scoped>
.evaluation {
  display: flex;
  height: 100px;
  border-radius: 10px;
  padding: 22px 0;
  padding-left: 49px;
  line-height: 28px;
  box-shadow: 0px 0px 10px 0px #d5d5d5;

  h2 {
    font-size: 24px;
    color: #222222;
  }

  .vertical-line {
    width: 1px;
    height: 60px;
    border-right: 1px solid #d7d7d7;
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>

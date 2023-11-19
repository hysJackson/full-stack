<script lang="ts" setup>
import Instructor from './Instructor.vue'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Autoplay } from 'swiper'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { getTeacherList } from '~/api/teacher'

const data = $ref((await getTeacherList()).data)
</script>

<template>
  <div class="about-instructor" w-full>
    <div flex items-center>
      <div flex items-end>
        <img src="/images/svg/jsjs.svg" h-29px w-29px mr-5px />
        <h2 text-16px text="#4f555d">讲师介绍</h2>
      </div>
    </div>

    <div mt-8px>
      <a-carousel arrows autoplay dotPosition slidesToShow=3>
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <left-circle-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <right-circle-outlined />
          </div>
        </template>
        <div v-for="item in data" :key="item.id" >
          <Instructor :name="item.name" :avatar="item.head_img" :description="item.profile" />
        </div>
      </a-carousel>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about-instructor {
  cursor: pointer;

  :deep(.ant-carousel .slick-next svg),
  :deep(.ant-carousel .custom-slick-arrow) {
    width: 20px;
    height: 20px;
  }

  :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: black;
    background-color: rgba(31, 45, 61, 0.11);
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
  }

  :deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
  }

  :deep(.slick-arrow.custom-slick-arrow:hover) {
    color: red;
    opacity: 0.5;
  }
}
</style>

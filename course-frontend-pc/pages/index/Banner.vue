<script lang="ts" setup>
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Navigation, Autoplay, Pagination } from 'swiper'
import { getBanner } from '~/api/banner'

const swiperData = reactive((await getBanner('home_swiper_banner')).data)
const imgSrcArr = computed(() => {
  return swiperData.img_url?.split(',')
})

</script>

<template>
  <!-- <swiper navigation pagination class="banner" :modules="[Navigation, Autoplay, Pagination]"
    :autoplay="{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }" loop>
    <swiper-slide v-for="(item, idx) in imgSrcArr" :key="item">
      <a :href="swiperData.pc_link" target="__blank">
        <img :src="item" />
      </a>
    </swiper-slide>
  </swiper> -->
  <div class="container">
    <a-carousel arrows autoplay>
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
      <div v-for="(item, idx) in imgSrcArr" :key="item" :slidesPerView="6">
        <a :href="swiperData.pc_link" target="__blank">
          <img :src="item" class="bannerImg"/>
        </a>
      </div>
    </a-carousel>
  </div>
</template>
<style lang="less" scoped>
// --swiper-theme-color: #4e4d53;
// --swiper-navigation-size: 30px;
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
  color: black;
  opacity: 0.5;
}
.bannerImg {
  display: block;
  width: 840px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.container {
  width: 840px;
  height: 400px;
  margin-left: 10px;
  margin-right: 10px
}
</style>

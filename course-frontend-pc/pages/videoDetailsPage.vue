<script lang="ts" setup>
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Autoplay } from 'swiper'
import { getVideoDetails, getLatestLearn } from '~/api/product'
import OutLine from './videoDetailsPage/OutLine.vue'
// 课程等级映射
const levelMap = { JUNIOR: '初级', MIDDLE: '中级', SENIOR: '高级' }

const { checkPay, videoInfor } = $(useVideo())

// tab选中状态
const activeKey = $ref(0)

// 课程id
const realVideoId = $computed(() => {
  return Number(useRoute().query.id) || 1
})
// 检查课程是否购买
checkPay(realVideoId)

// 课程详情数据
const detailsData = reactive((await getVideoDetails(realVideoId)).data)
// 将课程的评分数据暂存在pinia
videoInfor.videoPrice = Number(detailsData.amount)
videoInfor.easyPoint = Number(detailsData.easy_point)
videoInfor.logicPoint = Number(detailsData.logic_point)
videoInfor.contentPoint = Number(detailsData.content_point)

// 学员学习动态
const latestLearnData = reactive((await getLatestLearn(1)).data)

// 课程介绍海报
const inlineHtml = (html: string) => {
  if (html.startsWith('http')) {
    return `<img src="${html}" />`
  }
  return html
}
// 当前页的title
useHead({ title: '小滴课堂 - 视频详情页' })
</script>

<template>
  <div wfull flex justify-center>
    <div wfull absolute bg="#4d555d" h-350px></div>
    <div class="video-details-page" z-2>
      <div class="details-head">
        <div class="details-head-right">
          <div color="#d7d7d7" text-16px flex items-center>
            <NuxtLink color="#d7d7d7!" to="/" cursor-pointer>首页</NuxtLink>
            <span>&nbsp;&gt;&nbsp;</span>
            <NuxtLink color="#d7d7d7!" to="/videoListPage" cursor-pointer>课程中心</NuxtLink>
            <span>&nbsp;&gt;&nbsp;</span>
            <NuxtLink color="#d7d7d7!">课程详情</NuxtLink>
          </div>
          <div mt-27px mb-4px text-white text-32px font-600>{{ detailsData?.title }}</div>
          <p class="describe">
            {{ detailsData?.detail }}
          </p>
          <div class="price-message">
            <span text-20px color-white font-500>原价：{{ detailsData?.old_amount }}元</span>
            <span color="#efd3a2" text-24px font-500>优惠价：{{ detailsData?.amount }}元</span>
            <img class="button ml-26px" src="/images/svg/wechat_large.svg" />
          </div>
          <div class="video-message">
            <div>
              <span>难度： {{ levelMap[detailsData?.course_level] }}</span>
              <span>课时：{{ detailsData?.hour }}小时&nbsp;|&nbsp;{{ detailsData?.episode_num }}集</span>
              <span>学习人数：{{ detailsData?.buy_num }}</span>
              <span>综合评分：{{ detailsData?.total_point }}</span>
            </div>
          </div>
        </div>
        <div class="details-head-left relative">
          <div absolute flexc flex-col top-35px pointer-events-none class="shikan">
            <img src="/images/svg/play.svg" w-32px h-32px />
            <span text-18px color-white font-600>点击试看</span>
          </div>
          <img class="try-click" :src="detailsData.cover_img" />
          <span class="btn yellow" v-if="videoInfor.orderState">立即学习</span>
          <span class="btn" v-else>购买</span>
        </div>
      </div>

      <div class="details-main">
        <div class="details-introduce">
          <!-- 课程详情 -->
          <div class="video-introduce">
            <div style="box-shadow: 0px 0px 10px 0px #d5d5d5" p20px rounded-10px w-890px>
              <div flex>
                <img w-100px h-100px class="rounded-50%" :src="detailsData?.teacherDetail?.head_img" />
                <div flex flex-col ml-18px justify-center>
                  <div text-24px color="#222222" font-800>{{ detailsData?.teacherDetail?.name }}</div>
                  <div text-16px color="#404040" mb-12px w-126px>小滴课堂讲师</div>
                </div>
                <div ml-35px color="#404040">个人简介： {{ detailsData?.teacherDetail?.profile }}</div>
              </div>
            </div>
            <ul mt-41px grid grid-cols-6 ml-65px color="#4f555d" text-16px font-600 class="li" h-53px>
              <li :class="[activeKey === 0 ? 'active' : '']" @click="activeKey = 0">课程介绍</li>
              <li :class="[activeKey === 1 ? 'active' : '']" @click="activeKey = 1">课程目录</li>
              <li :class="[activeKey === 2 ? 'active' : '']" @click="activeKey = 2">用户评价</li>
              <li :class="[activeKey === 3 ? 'active' : '']" @click="activeKey = 3">课程资料</li>
            </ul>

            <div>
              <div v-show="activeKey === 0">
                <div v-html="inlineHtml(detailsData?.summary)" class="introduce-content"></div>
              </div>
              <div v-show="activeKey === 1">
                <OutLine :id="realVideoId" />
              </div>
              <div v-show="activeKey === 2">
                <UserComment :id="realVideoId" />
              </div>
              <div v-show="activeKey === 3">
                <Materials :id="realVideoId" />
              </div>
            </div>
          </div>
        </div>

        <!-- 学员学习动态 -->
        <div class="details-main-right">
          <a-card class="video-learn" v-if="latestLearnData.length > 0">
            <template #title>
              <div flex items-center>
                <img w-20px h-20px mr-5px src="/images/student-state.png" alt="" />
                <div>学员动态</div>
              </div>
            </template>
            <div class="container">
              <a-carousel arrows autoplay dotPosition :slidesToScroll="4">
                <div v-for="(item, index) in latestLearnData" :key="index" class="h-400px! mt-20px pl-10px!">
                  <div class="studen-atvatar">
                    <img :src="item.user_head_img" alt="" />
                    <span class="username">{{ item.username }}</span>
                    <span color="#555555">正在学习该课程</span>
                  </div>
                </div>
              </a-carousel>
            </div>
            <!-- <swiper direction="vertical" :autoplay="{ delay: 500, disableOnInteraction: false } as any"
              :modules="[Autoplay]" :slidesPerView="6" loop class="h-350px! mt-20px pl-10px!">
              <swiper-slide v-for="(item, index) in latestLearnData" :key="index">
                <div class="studen-atvatar">
                  <img :src="item.user_head_img" alt="" />
                  <span class="username">{{ item.username }}</span>
                  <span color="#555555">正在学习该课程</span>
                </div>
              </swiper-slide>
            </swiper> -->
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.studen-atvatar {
  display: grid;
  align-items: center;
  grid-template-columns: 46px 100px 1fr;
  padding-left: 10px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 7px;
  }

  .username {
    width: 90px;
    color: #555555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.swiper {
  height: 100%;
}

.video-details-page {
  width: 1200px;

  .details-head {
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    padding: 20px;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    margin-bottom: 55px;

    .details-head-right {
      width: 80%;
      margin-right: 20px;

      .describe {
        color: #f2f2f2;
        height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        width: 758px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 43px;
      }

      .price-message {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &>span {
          margin-right: 20px;
        }

        .button {
          cursor: pointer;
          margin-right: 30px;
          height: 35px;
          width: 100px;
        }
      }

      .video-message {
        display: flex;
        text-align: left;
        align-items: center;
        justify-content: space-between;

        & div>span {
          color: white;
          padding: 4px 18px 4px 18px;
          font-size: 16px;
          text-align: center;
          margin-right: 12px;
          background-color: #575f65;
        }
      }
    }

    .details-head-left {
      height: 200px;
      padding: 14px;
      border-radius: 10px;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;

      .shikan {
        background-color: #000;
        opacity: 0.8;
        padding: 10px;
        border-radius: 10px;
      }

      .btn {
        height: 34px;
        width: 172px;
        padding: 4px 0;
        background: #4d555d;
        color: white;
        margin-top: 15px;
        text-align: center;
        border-radius: 5px;
        font-weight: 500;
        cursor: pointer;

        &.yellow {
          color: #614d28;
          background-color: #eace9d;
          cursor: pointer;
          line-height: 26px;
        }
      }

      .try-click {
        width: 172px;
        height: 117px;
        cursor: pointer;
      }

      .buy-click {
        padding: 5px;
        width: 100px;
        text-align: center;
        margin: 0 auto 20px;
      }

      .add-Cart {
        padding: 5px;
        width: 100px;
        text-align: center;
        margin: 0 auto 20px;
      }
    }
  }

  .details-main {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .details-introduce {
      width: 890px;

      .video-introduce {
        .introduce-content {
          padding: 0 40px 40px;
          overflow: hidden;
          display: flex;
          justify-content: center;
        }

        :deep(.ant-tabs-nav-list) {
          justify-content: space-around;
        }
      }
    }

    .details-main-right {
      width: 284px;

      .video-learn {
        width: 284px;
        margin-bottom: 20px;
        height: 440px;
      }

      :deep(.ant-card-body) {
        padding: 0;
        // padding-left: 20px;
      }

      :deep(.ant-card-head) {
        padding-left: 9px;
      }

      :deep(.ant-card-bordered) {
        border: none;
        border-radius: 10px;

        box-shadow: 0px 0px 10px 0px #d5d5d5;
      }
    }
  }

  .li {
    li {
      cursor: pointer;
      margin-right: 60px;
      position: relative;

      &:hover {
        font-size: 18px;

        &::after {
          content: '';
          width: 32px;
          height: 4px;
          position: absolute;
          background-color: #4d555d;
          bottom: 22px;
          left: calc(50% - 21px);
          border-radius: 10px;
        }
      }
    }

    .active {
      &::after {
        content: '';
        width: 32px;
        height: 3px;
        position: absolute;
        background-color: #4d555d;
        bottom: 22px;
        left: calc(50% - 24px);
        border-radius: 10px;
      }
    }
  }
}
</style>
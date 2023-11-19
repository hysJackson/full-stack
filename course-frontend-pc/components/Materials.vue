<script lang="ts" setup>
import { message } from 'ant-design-vue'

const { center, id } = defineProps<{ center?: boolean, id: number }>()
const visible = ref<boolean>(false)
const { isLogin } = $(useUser())
let { loginModel } = $(useModel())

// 资料状态管理
const { bdZipUrl, noteUrl } = $(useMaterials())

// 资料下载点击
const showModal = async () => {
  if (!isLogin) {
    message.warn('请先登录')
    loginModel = true
    return
  }
  // 请求资料接口获取地址
  const { getVideoMaterialsData } = $(useMaterials())
  await getVideoMaterialsData(id)

  if (bdZipUrl) {
    visible.value = true
  } else {
    message.warn('没有权限')
  }
}
// 关闭下载弹窗
const handleOk = (e: MouseEvent) => {
  visible.value = false
}

// 笔记点击跳转
const noteClick = async () => {
  if (!isLogin) {
    message.warn('请先登录')
    loginModel = true
    return
  }

  const { getVideoMaterialsData } = $(useMaterials())
  await getVideoMaterialsData(id)

  if (noteUrl) {
    process.client && window.open(noteUrl, '_blank')
  } else {
    message.warn('没有权限')
  }
}
</script>

<template>
  <div :class="center ? 'center' : 'materials'">
    <div class="note">
      <img src="/images/note.png" h-83px w-83px />
      <div text-16px color="#666666" mt-7px mb-12px>老师笔记</div>
      <span w-99px h-28px text="#4d555d" class="b b-#4d555d" rounded-5px text-center cursor-pointer leading-26px
        @click="noteClick">
        查看
      </span>
    </div>
    <div class="note">
      <img src="/images/materials.png" h-83px w-83px />
      <div text-16px color="#666666" mt-7px mb-12px>课程资料</div>
      <span @click="showModal" w-99px h-28px text="#4d555d" class="b b-#4d555d" rounded-5px text-center cursor-pointer
        leading-26px>
        下载
      </span>
    </div>
    <a-modal v-model:visible="visible" title="下载" @ok="handleOk" :footer="null">
      <div class="xiazai">
        <div>百度云</div>
        <div class="address">
          <div>
            地址：<a :href="bdZipUrl?.split('||')[0]">{{ bdZipUrl?.split('||')[0] }}</a>
          </div>
          <div>密码：{{ bdZipUrl?.split('||')[1] }}</div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.center {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .note {
    width: 174px;
    height: 200px;
    margin-right: 23px;
    border-radius: 10px;
    border: 1px solid rgba(121, 121, 121, 0);
    background-color: #ffffff;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px #d5d5d5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.materials {
  display: flex;
  justify-content: center;

  .note {
    width: 174px;
    height: 200px;
    margin-right: 23px;
    border-radius: 10px;
    border: 1px solid rgba(121, 121, 121, 0);
    background-color: #ffffff;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px #d5d5d5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
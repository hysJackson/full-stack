/**
 * 视频
 */
import { queryPay } from '../api/order';
import { defineStore } from 'pinia';

export const useVideo = defineStore('video', () => {
  const videoInfor = reactive({
    orderState: true,
    videoPrice: null,
    easyPoint: null,
    logicPoint: null,
    contentPoint: null,
  });
  // 检查课程是否购买
  const checkPay = async (id: number) => {
    if ((await queryPay(id)).code == 0) {
      videoInfor.orderState = true;
    }
  };

  return {
    videoInfor,
    checkPay,
  };
});


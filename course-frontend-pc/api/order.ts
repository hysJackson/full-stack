/**
 * 根据订单ID查询订单是否被购买过
 * @param id 商品订单id
 */
export const queryPay = async function (id: number) {
  return await useApi<null>('/order/v1/query_pay', { params: { id } });
};


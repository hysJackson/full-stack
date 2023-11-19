import type { IComment } from '~/types/api';

/**
 * 获取评价
 * @param params 查询参数
 */
export const getComment = async (params: {
  page: number;
  size: number;
  id: number;
}) => {
  return await useApi<IComment>('/comment/v1/page', {
    method: 'post',
    body: params,
  });
};


import type {
  IPoductQuery,
  IVideoDitails,
  IlatestLearn,
  IChapter,
  IVideoMaterials,
} from '~/types/api';

/**
 * 根据分类ID获取数据
 * @param options page-分页 size-数量 cid-分类ID cpid-方向
 */
export const queryProductByCid = async (options: {
  page: number;
  size: number;
  cid?: number;
  cpid?: number;
}) => {
  return await useApi<IPoductQuery>('/product/v1/query_by_cid', {
    method: 'POST',
    body: options,
  });
};

/**
 * 获取视频详情
 * @param id 视频id
 */
export const getVideoDetails = async (id: number) => {
  return await useApi<IVideoDitails>('/product/v1/detail', {
    params: { id },
  });
};

/**
 * 最近在学
 * @param id 视频ID
 */
export const getLatestLearn = async (id: number) => {
  return await useApi<IlatestLearn[]>('/order/v1/latest', {
    params: { id },
  });
};

/**
 * 获取章集
 * @param id 视频ID
 */
export const getChapter = async (id: number) => {
  return await useApi<IChapter[]>('/product/v1/chapter', {
    params: { id },
  });
};

/**
 * 资料下载权限
 * @param id 视频ID
 */
export const getVideoMaterials = async (id: number) => {
  return await useApi<IVideoMaterials>('product/v1/material_by_id', {
    params: { id },
  });
};


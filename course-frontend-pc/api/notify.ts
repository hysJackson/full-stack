/**
 * 发送手机短信验证码
 * @param options 场景：type 手机号：phone 图形验证码：captcha
 */

export const sendCode = async (options: {
  phone: string,
  captcha: string,
  type: 'register' | 'login' | 'change'
}) => {
  return await useApi<null>('/notify/v1/send_code', {
    method: 'post',
    body: options,
  });
};


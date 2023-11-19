const axios = require('axios')

const appId = 'IAiUQZPe7rErClmLP9'
const appSecret = '3q8XqrLLtFbettGxAcAGX5RlCQJvcTAk'
const accessTokenPC = `https://api-v2.xdclass.net/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
const qrUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode'

// 获取微信access_token
const getAccessToken = () => {
  return axios({
    method: 'get',
    url: accessTokenPC
  })
}

// 获取拼接微信二维码url的ticket
const getTicket = (token) => {
  return axios({
    method: 'post',
    url: `https://api-v2.xdclass.net/cgi-bin/qrcode/create?access_token=${token}`,
    data: {
      expire_seconds: 60 * 2,
      action_name: "QR_SCENE",
      action_info: {
        "scene": { "scene_id": 123 }
       }
    }
  })
}

// 获取微信二维码url
const wechatLogin = {
  getOR: async () => {
    let token = (await getAccessToken()).data.access_token
    console.log(token)
    let ticket = (await getTicket(token)).data.ticket
    console.log((await getTicket(token)).data)
    return { qrcodeUrl: `${qrUrl}?ticket=${ticket}`, ticket: ticket }
  }
}

module.exports = wechatLogin
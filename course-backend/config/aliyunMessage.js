const axios = require('axios')

const sendMsgCode = (phone, randomCode) => {
  return axios({
    method: 'post',
    url: 'https://api-v2.xdclass.net/send_sms',
    data: {
      appid: "IAiUQZPe7rErClmLP9",
      appSecret: "3q8XqrLLtFbettGxAcAGX5RlCQJvcTAk",
      code: randomCode,
      phoneNum: phone,
      templateCode: "SMS_168781429"
    }
  })
}

module.exports = sendMsgCode
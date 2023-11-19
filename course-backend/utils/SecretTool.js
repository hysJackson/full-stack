const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')
const sha1 = require('sha1')
const { jwtSecretKey } = require('../config/jwtSecretKey')

class SecretTool {
  // md5加密密码
  static md5(query) {
    return md5(query)
  }
  // jwt生成token
  static jwtSign(query, time) {
    return jwt.sign(query, jwtSecretKey, { expiresIn: time })
  }
  // jwt解密token
  static jwtVerify(query) {
    return jwt.verify(query, jwtSecretKey)
  }
  // sha1加密
  static sha1(query) {
    return sha1(query)
  }
}

module.exports = SecretTool

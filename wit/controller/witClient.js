const { Wit } = require('node-wit')

class WitClient {
  constructor(token) {
    this.client = new Wit({ accessToken: token })
  }

  witSendMessage(msg) {
    return new Promise((resolve) => {
      resolve(this.client.message(msg))
    })
  }
   
}

module.exports = WitClient
import { app } from 'electron'
const WebSocket = require('ws')
const fs = require('fs')
const wss = new WebSocket.Server({ port: 8089 })
const path = require('path')
const crypto = require('crypto')
const uploadPath = path.join(app.getPath('pictures'), 'oys')

if (!fs.existsSync(uploadPath)) {
  console.log(`mkdir:${uploadPath}`)
  fs.mkdirSync(uploadPath)
}
wss.on('connection', function connection (ws) {
  let data
  ws.on('message', function incoming (message) {
    if (data != null) {
      let md5 = crypto.createHash('md5')
      let result = md5.update(message).digest('hex')
      fs.writeFile(path.join(uploadPath, `${result}.${data.name.split('.')[1]}`), message, (err) => {
        data = null
        if (err) { console.error(err) }
        console.log('upload success')
      })
    } else {
      try {
        data = JSON.parse(message)
        if (typeof data !== 'object') { data = null }
      } catch (e) {
        console.error(e)
      }
    }
  })
})

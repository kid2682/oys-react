import { app } from 'electron'
const staticServer = require('node-static')
const path = require('path')
let pictures = new staticServer.Server(path.join(app.getPath('pictures'), 'oys'))
let staticPath = path.join(__dirname, '..', 'static')
console.log(staticPath)
if (app.isPackaged) {
  staticPath = path.join(app.getAppPath(), 'static')
}
console.log(staticPath)
let html = new staticServer.Server(staticPath)
/*require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    html.serve(request, response)
  }).resume()
}).listen(8088)*/
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    pictures.serve(request, response)
  }).resume()
}).listen(8087)

import { app } from 'electron';

const staticServer = require('node-static');
const path = require('path');

const pictures = new staticServer.Server(
  path.join(app.getPath('pictures'), 'oys')
);
let staticPath = path.join(__dirname, '..', 'static');
console.log(staticPath);
if (app.isPackaged) {
  staticPath = path.join(app.getAppPath(), 'static');
}
const html = new staticServer.Server(staticPath);
require('http')
  .createServer((request, response) => {
    request
      .addListener('end', () => {
        html.serve(request, response);
      })
      .resume();
  })
  .listen(8088);
require('http')
  .createServer((request, response) => {
    request
      .addListener('end', () => {
        pictures.serve(request, response);
      })
      .resume();
  })
  .listen(8087);

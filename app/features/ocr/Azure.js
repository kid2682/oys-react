const request = require('request');

const URL =
  'https://eastasia.api.cognitive.microsoft.com/vision/v1.0/ocr?language=zh-Hans&detectOrientation=true';

class Azure {
  static async getImageText(data) {
    return new Promise((resolve, reject) => {
      try {
        request.post(
          {
            url: URL,
            headers: {
              'content-type': 'application/octet-stream',
              'Ocp-Apim-Subscription-Key': '7491f4b044ce4b6da120bba467256226'
            },
            body: data
          },
          (err, httpResponse, body) => {
            if (err) reject(err);
            resolve(Azure.formatRequest(JSON.parse(body)));
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  static formatRequest(data) {
    const textArray = [];
    data.regions[0].lines.forEach(item => {
      let text = '';
      item.words.forEach(word => {
        text += word.text;
      });
      textArray.push(text);
    });
    return textArray;
  }
}
module.exports = Azure;
// let text = {"language":"zh-Hans","textAngle":-0.020943951023931366,"orientation":"Up","regions":[{"boundingBox":"61,209,184,201","lines":[{"boundingBox":"76,209,148,54","words":[{"boundingBox":"76,211,61,52","text":"南"},{"boundingBox":"158,209,66,52","text":"京"}]},{"boundingBox":"69,346,166,25","words":[{"boundingBox":"69,350,22,21","text":"吸"},{"boundingBox":"98,349,21,22","text":"烟"},{"boundingBox":"127,348,21,22","text":"有"},{"boundingBox":"156,347,20,23","text":"害"},{"boundingBox":"184,347,22,22","text":"健"},{"boundingBox":"214,346,21,22","text":"康"}]},{"boundingBox":"61,385,184,25","words":[{"boundingBox":"61,388,20,22","text":"尽"},{"boundingBox":"84,388,21,22","text":"早"},{"boundingBox":"107,387,21,23","text":"戒"},{"boundingBox":"131,387,21,22","text":"烟"},{"boundingBox":"154,387,21,22","text":"有"},{"boundingBox":"178,386,21,22","text":"益"},{"boundingBox":"200,386,21,21","text":"健"},{"boundingBox":"225,385,20,22","text":"康"}]}]}]};
// console.log(Azure.formatRequest(text));

// 香烟 红双喜 (site:baike.baidu.com OR site:baike.com)
const request = require('request');
const querystring = require('querystring');
const cheerio = require('cheerio');

const Endpoint = `https://api.cognitive.microsoft.com/bing/v7.0/search?`;

// console.log(Endpoint)

class BingSearch {
  static search(key) {
    return new Promise((resolve, reject) => {
      const params = querystring.stringify({
        count: 5,
        q: `香烟 ${key} (site:baike.baidu.com OR site:baike.com)`
      });
      request.get(
        {
          url: Endpoint + params,
          headers: {
            'BingAPIs-Market': 'zh-CN',
            'Ocp-Apim-Subscription-Key': '7e2f8a2fdce3432f96cb88d3dcf9f3e5'
          }
        },
        (err, httpResponse, body) => {
          if (err) {
            reject(err);
          }
          console.log(JSON.parse(body).webPages.value);
        }
      );
    });
  }
}
const baike =
  'https://baike.baidu.com/item/%E7%BA%A2%E5%8F%8C%E5%96%9C%E9%A6%99%E7%83%9F/479211';
class BAIKEParser {
  static parser(url) {
    return new Promise((resolve, reject) => {
      const list = [];
      request.get(
        {
          url
        },
        (err, httpResponse, body) => {
          if (err) {
            reject(err);
          }
          const $ = cheerio.load(body);
          const items = $('.basic-info.cmn-clearfix').find('.basicInfo-item');
          const size = items.length;
          let map;
          for (let i = 0; i < size; i + 1) {
            const text = $(items[i])
              .text()
              .replace(/\s/g, '');
            if (i % 2 === 0) {
              map = {
                key: text
              };
            } else {
              map.v = text;
              list.push(map);
              map = {};
            }
          }
          resolve(list);
        }
      );
    });
  }
}
BingSearch.search('红双喜')
  .then(res => {
    console.log(res);
    return 1;
  })
  .catch(err => {
    console.error(err);
  });
BAIKEParser.parser(baike)
  .then(res => {
    console.log(res);
    return 1;
  })
  .catch(err => {
    console.error(err);
  });

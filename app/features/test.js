const Azure = require('./ocr/Azure');
const Pinyin = require('./pinyin/Pinyin');
const fs = require('fs');

const data = fs.readFileSync('./nj.jpg');
Azure.getImageText(data)
  .then(list => {
    list.forEach(item => {
      console.log(Pinyin.toPinyin(item));
    });
    return 0;
  })
  .catch(e => {
    console.error(e);
    return 0;
  });

const py = require('pinyin');

class Pinyin {
  static toPinyin(str) {
    return py(str, { style: py.STYLE_NORMAL }).join(' ');
  }
}

module.exports = Pinyin;

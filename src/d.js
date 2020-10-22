// export 引用类型

var d = {
  num: 1
};
d.num++;

module.exports = d;
d.num = 8;

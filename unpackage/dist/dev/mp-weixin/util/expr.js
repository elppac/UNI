"use strict";
const common_vendor = require("../common/vendor.js");
const parser = new common_vendor.Parser();
parser.functions.CONCAT = function(...args) {
  return String.prototype.concat(...args);
};
const expression = (str, evaluateData) => {
  let expr = str.trim();
  if (/^`.*?\${(.*?).*?`$/.test(expr)) {
    const vars = expr.match(/\$\{(.*?)\}/g);
    let exprStr = expr.substring(1, expr.length - 1);
    const exprKeys = [];
    (vars ?? []).forEach((i, idx) => {
      const [left, ...right] = exprStr.split(i);
      if (left) {
        exprKeys.push(`'${left}'`);
      }
      const m = i.match(/\$\{(.*?)\}/);
      if (m) {
        exprKeys.push(m && m[1]);
        exprStr = right.join(i);
        if (idx === vars.length - 1) {
          exprKeys.push(`'${right[0]}'`);
        }
      }
    });
    expr = `CONCAT(${exprKeys.join(",")})`;
  }
  let result = void 0;
  try {
    result = parser.parse(expr).evaluate(evaluateData);
  } catch (e) {
  }
  return result;
};
exports.expression = expression;

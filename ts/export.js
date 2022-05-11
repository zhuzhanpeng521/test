"use strict";
exports.__esModule = true;
exports.c = exports.b = exports.a = void 0;
var obj = {
    a: { a: 1 },
    b: { b: 2 },
    c: { c: 3 }
};
Object.keys(obj).forEach(function (index) {
    obj[index].test = "test";
});
exports.a = obj.a, exports.b = obj.b, exports.c = obj.c;

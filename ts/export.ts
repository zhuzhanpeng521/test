let obj = {
  a: { a: 1 },
  b: { b: 2 },
  c: { c: 3 },
};
Object.keys(obj).forEach((index) => {
    obj[index].test = "test";
});
export let { a, b, c } = obj;
interface A {
  a: number;
  b: string;
}

const test1 = {
  a: 10,
  b: "foo",
  c: "bar",
  d: "d",
};

const d: A[] = [
  test1,
  {
    a: 10,
    b: "foo",
    c: "c",
    d: "d",
  },
];


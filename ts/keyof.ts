interface Button {
  type: string;
  text: string;
}
type ButtonKeys = keyof Button;
type ButtonKeys2 = "type" | "text";

let aButtton: ButtonKeys = "type";

let bButton: ButtonKeys2 = "type";

let demoA = {
    name: 'zhu',
    age: 8
}

function prop<T, K extends keyof T>(obj: T, index: K) {
  return obj[index];
}

prop(demoA,'age')


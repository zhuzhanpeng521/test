function toStringFunc(param) {
  if (param > 9) {
    return param + "";
  } else {
    return "0" + param;
  }
}

var audioDemoVm = new Vue({
  el: "#app",
  data() {
    return {

    };
  },
  methods: {

  }
});

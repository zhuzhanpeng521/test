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
      value: 0,
      min: 0,
      max: 100,
      audioStart: "00:00:00",
      duration: "00:00:00",
      audioIcon: "el-icon-video-play",
      audioSrc: "",
      currentSlidervalue: "",
      sliderIsDraging: false,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    //获取audiourl
    fetch() {
      let that = this;
      setTimeout(() => {
        // that.audioSrc =
        //   "https://openapi.youdao.com/ttsapi?voice=0&q=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E8%BF%99%E9%87%8C%E6%98%AF%E6%B5%8B%E8%AF%95%E8%87%AA%E5%AE%9A%E4%B9%89audio%E7%9A%84%E5%A3%B0%E9%9F%B3%E3%80%82&salt=1652336655427&sign=9D18B27D19442D1D889804465DE22458&appKey=2423360539ba5632&langType=auto&speed=1&.mp3";
        that.audioSrc = "http://ting6.yymp3.net:82/new27/suhan/3.mp3";
        that.initListener();
      }, 1000);
    },
    //音频事件监听
    initListener() {
      console.log("start initListener");
      let that = this;
      let myVideo = this.$refs.audio;
      myVideo.loop = false;

      //监听音频播放完毕

      myVideo.addEventListener(
        "ended",
        function () {
          that.audioIcon = "el-icon-video-play"; //显示播放icon
          that.value = 0;
        },
        false
      );
      console.log("myVideo", myVideo);
      if (myVideo != null) {
        // if (!that.duration) {
        myVideo.oncanplay = function () {
          that.duration = that.transTime(myVideo.duration); // 计算音频时长
          console.log("........");
          console.log(" that.duration", that.duration);
        };
        // }
        // myVideo.volume = 0.5; // 设置音量50%
      }
    },
    //播放暂停
    playAudio() {
      let recordAudio = this.$refs.audio; // 获取audio元素
      if (recordAudio.paused) {
        recordAudio.play();
        this.audioIcon = "el-icon-video-pause"; //暂停icon
      } else {
        recordAudio.pause();
        this.audioIcon = "el-icon-video-play"; //播放icon
      }
    },
    //播放时候 更新进度条
    updateProgress(e) {
      // console.log('currentTime', e.target.currentTime);
      // console.log('duration',e.target.duration);
      console.log("--------");
      if (!this.sliderIsDraging) {
        let value = (e.target.currentTime / e.target.duration) * 100;
        this.value = value;
        if (e.target.currentTime) {
          this.audioStart = this.transTime(e.target.currentTime);
        }
      }
    },
    //点击拖动滑动时候
    sliderValChange(newVal) {
      console.log("newVal", newVal);
      let myVideo = this.$refs.audio;
      let duration = myVideo.duration;
      let percentage = newVal / 100;
      let currentTime = percentage * duration;
      console.log("myVideo.currentTime", myVideo.currentTime);
      myVideo.currentTime = currentTime + "";
      console.log("myVideo.currentTime", myVideo.currentTime);
    },
    /**
     * 音频播放时间换算
     * @param {number} value - 音频当前播放时间，单位秒
     */
    transTime(time) {
      var duration = parseInt(time);
      var minute = parseInt(duration / 60);
      var sec = (duration % 60) + "";
      var isM0 = ":";
      if (minute === 0) {
        minute = "00";
      } else if (minute < 10) {
        minute = "0" + minute;
      }
      if (sec.length === 1) {
        sec = "0" + sec;
      }
      return minute + isM0 + sec;
    },
  },
});

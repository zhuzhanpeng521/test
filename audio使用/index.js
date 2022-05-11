var audioDemoVm = new Vue({
  el: "#app",
  data() {
    return {
      audioStatus: "play",
      audioStart: "0:00",
      duration: "0:00",
      audioVolume: 0.5,
      audioHuds: false,
      fileurl: "",
    };
  },
  directives: {
    dragto: {
      inserted: function (el, binding, vnode) {
        el.addEventListener(
          "click",
          (e) => {
            let wdiv = document.getElementById("progressBarBg").clientWidth;
            let audio = vnode.context.$refs.audioRef;
            // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
            let ratemin = e.offsetX / wdiv;
            let rate = ratemin * 100;
            document.getElementById("progressBar").style.width = rate + "%";
            audio.currentTime = audio.duration * Math.floor(ratemin);
            audio.play();
            binding.value();
          },
          false
        );
      },
    },
    adjuster: {
      inserted: function (el, binding, vnode) {
        el.addEventListener(
          "click",
          (e) => {
            let hdiv = document.getElementById("volumeBarBg").clientHeight;
            let audio = vnode.context.$refs.audioRef;
            // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
            let ratemin = e.offsetY / hdiv;
            let rate = ratemin * 100;
            document.getElementById("volumeBar").style.height = rate + "%";
            audio.volume = ratemin;
            binding.value(rate / 100);
          },
          false
        );
      },
    },
  },
  computed: {
    audioIcon() {
      if (this.audioHuds) {
        return this.audioVolume < 0.01
          ? "checked icon-jingyin"
          : "checked icon-shengyin";
      } else {
        return "icon-shengyin";
      }
    },
  },
  created() {},
  mounted() {
    let that = this;
    setTimeout(() => {
      that.fileurl = "./ttsapi.mp3";
      that.fetch();
    }, 1000);
  },
  methods: {
    fetch() {
      let that = this;
      var myVid = this.$refs.audioRef;
      myVid.loop = false;
      // 监听音频播放完毕
      myVid.addEventListener(
        "ended",
        function () {
          that.audioStatus = "play"; // 显示播放icon
          document.getElementById("progressBar").style.width = "0%"; // 进度条初始化
        },
        false
      );
      if (myVid != null) {
        myVid.oncanplay = function () {
          that.duration = that.transTime(myVid.duration); // 计算音频时长
        };
        myVid.volume = 0.5; // 设置音量50%
      }
    },
    // 播放暂停控制
    playAudio() {
      let recordAudio = this.$refs.audioRef; // 获取audio元素
      if (recordAudio.paused) {
        recordAudio.play();
        this.audioStatus = "pause";
      } else {
        recordAudio.pause();
        this.audioStatus = "play";
      }
    },
    // 更新进度条与当前播放时间
    updateProgress(e) {
      var value = e.target.currentTime / e.target.duration;
      if (document.getElementById("progressBar")) {
        document.getElementById("progressBar").style.width = value * 100 + "%";
        if (e.target.currentTime === e.target.duration) {
          this.audioStatus = "pause";
        }
      } else {
        this.audioStatus = "pause";
      }

      this.audioStart = this.transTime(this.$refs.audioRef.currentTime);
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
    setAudioIcon() {
      this.audioStatus = "pause";
    },
    handleShowMuteIcon(val) {
      this.audioVolume = val;
    },
  },
});

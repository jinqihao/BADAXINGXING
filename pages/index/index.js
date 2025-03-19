// index.js
Page({
  data: {
    minutes: 0,
    seconds: 0,
    isRunning: false,
    timerInterval: null
  },

  // 设置分钟
  setMinutes(e) {
    this.setData({
      minutes: parseInt(e.detail.value) || 0
    });
  },

  // 设置秒数
  setSeconds(e) {
    let seconds = parseInt(e.detail.value) || 0;
    if (seconds >= 60) {
      seconds = 59;
    }
    this.setData({
      seconds: seconds
    });
  },

  // 开始/暂停计时器
  toggleTimer() {
    if (this.data.isRunning) {
      // 暂停计时器
      clearInterval(this.data.timerInterval);
      this.setData({
        isRunning: false,
        timerInterval: null
      });
    } else {
      // 如果时间为0，不开始计时
      if (this.data.minutes === 0 && this.data.seconds === 0) {
        wx.showToast({
          title: '请设置时间',
          icon: 'none'
        });
        return;
      }
      
      // 开始计时器
      let totalSeconds = this.data.minutes * 60 + this.data.seconds;
      const interval = setInterval(() => {
        if (totalSeconds <= 0) {
          clearInterval(interval);
          this.setData({
            minutes: 0,
            seconds: 0,
            isRunning: false,
            timerInterval: null
          });
          wx.vibrateLong(); // 震动提醒
          wx.showToast({
            title: '时间到！',
            icon: 'success'
          });
          return;
        }
        
        totalSeconds--;
        this.setData({
          minutes: Math.floor(totalSeconds / 60),
          seconds: totalSeconds % 60
        });
      }, 1000);
      
      this.setData({
        isRunning: true,
        timerInterval: interval
      });
    }
  },

  // 重置计时器
  resetTimer() {
    if (this.data.timerInterval) {
      clearInterval(this.data.timerInterval);
    }
    this.setData({
      minutes: 0,
      seconds: 0,
      isRunning: false,
      timerInterval: null
    });
  }
})

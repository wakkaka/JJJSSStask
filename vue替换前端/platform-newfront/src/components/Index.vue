<template>
  <div>
    <div class="scroll-top">
      <div class="src-container">
        <div class="banner-1">
          <div class="banner-container">
            <div class="banner-content">
              <h3 class="banner-title">1111数据1111</h3>
              <p class="banner-intro">??????</p>
              <div class="banner-btn" @click="login">免费试用</div>
            </div>
            <div class="banner-img">
              <img src="../img/banner1.png" alt>
            </div>
          </div>
        </div>
        <div class="banner-2" style="display: none;opacity: 0">
          <div class="banner-container">
            <div class="banner-content">
              <h3 class="banner-title">2222数据2222</h3>
              <p class="banner-intro">??????</p>
              <div class="banner-btn" @click="login">免费试用</div>
            </div>
            <div class="banner-img">
              <img src="../img/banner2.png" alt>
            </div>
          </div>
        </div>
        <div class="banner-3" style="display: none;opacity: 0">
          <div class="banner-container">
            <div class="banner-content">
              <h3 class="banner-title">3333数据33333</h3>
              <p class="banner-intro">??????</p>
              <div class="banner-btn" @click="login">免费试用</div>
            </div>
            <div class="banner-img">
              <img src="../img/banner3.png" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="src-container-index">
      <li><a class="src-container-index-select" href="#"></a></li>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>
    </ul>

    <div class="intro">
      <div id="intro-container">
        <section id="sec1">
          这是介绍字段
        </section>
      </div>
    </div>

    <div class="para1"></div>
    <div class="footer"></div>

  </div>
</template>

<script>
export default {
  mounted () {
    var that = this
    this.oUl = document.querySelector('.src-container-index')
    this.oLi = document.querySelector('.src-container-index').getElementsByTagName('li')
    this.oA = document.querySelector('.src-container-index').getElementsByTagName('a')
    this.listLen = this.oLi.length
    this.addHandle()
    this.autoTimer = setInterval(function () {
      that.next()
    }, 5000)
  },
  destroyed () {
    clearInterval(this.timmer1)
    clearInterval(this.timmer2)
    clearInterval(this.autoTimer)
  },
  name: 'hello',
  data () {
    return {
      timmer1: '',
      timmer2: '',
      autoTimer: '',
      currentList: 1,
      oUl: '',
      oLi: '',
      oA: '',
      listLen: ''
    }
  },
  methods: {
    login () {
      this.$router.push('main')
    },
    // 返回dom指定样式
    getStyleVal (target, attr) {
      return getComputedStyle(document.querySelector(target), false)[attr]
    },
    // 设置dom透明度
    setStyleDis (target, val) {
      document.querySelector(target).style.display = val
    },
    setStyleOp (target, val) {
      document.querySelector(target).style.opacity = val
    },
    // 走马灯运动
    doMove (target1, target2) {
      var that = this
      clearInterval(this.timmer1)
      clearInterval(this.timmer2)

      this.timmer1 = setInterval(function () {
        var speed, val
        speed = -(that.getStyleVal(target1, 'opacity')) * 100 / 7
        speed = (speed > 0 ? Math.ceil(target1) : Math.floor(speed)) / 100
        val = parseFloat(that.getStyleVal(target1, 'opacity')) + speed
        that.getStyleVal(target1, 'opacity') === 0 ? (clearInterval(that.timmer1), that.setStyleDis(target1, 'none')) : that.setStyleOp(target1, val)
      }, 40)
      this.setStyleDis(target2, 'block')
      this.timmer2 = setInterval(function () {
        var speed, val
        speed = (1 - parseInt(that.getStyleVal(target2, 'opacity'))) * 100 / 34
        speed = (speed > 0 ? Math.ceil(speed) : Math.floor(speed)) / 100
        val = parseFloat(that.getStyleVal(target2, 'opacity')) + speed
        that.getStyleVal(target2, 'opacity') === 1 ? clearInterval(that.timmer2) : that.setStyleOp(target2, val)
      }, 30)
    },
    // 自动播放，调用doMove
    next () {
      var target1 = '.banner-' + this.currentList

      this.currentList = (this.currentList === this.listLen) ? (this.currentList = 1) : (++this.currentList)
      this.toggle(target1)
    },
    toggle (target1) {
      var target2
      // 下方index的变化
      for (var i = 0; i < this.listLen; i++) {
        this.oLi[i].querySelector('a').className = ''
      }
      this.oLi[this.currentList - 1].querySelector('a').className = 'src-container-index-select'
      target2 = '.banner-' + this.currentList
      // 轮播
      this.doMove(target1, target2)
    },
    addHandle () {
      var that = this
      var target1
      // 进入index则停止轮播，移出继续
      this.oUl.onmouseover = function () {
        clearInterval(that.autoTimer)
      }
      this.oUl.onmouseout = function () {
        that.autoTimer = setInterval(function () {
          that.next()
        }, 5000)
      }
      // 点击index进行切换
      for (var i = 0, len = this.oA.length; i < len; i++) {
        this.oA[i].index = i
        this.oA[i].onclick = function () {
          target1 = that.currentList
          that.currentList = this.index + 1
          target1 = '.banner-' + target1
          that.toggle(target1)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll-top {
  position: relative;
  width: 100%;
  height: 740px;
}
.src-container {
  width: 100%;
  height: 100%;
  color: #fff;
}
.src-container-index {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 211px;
  z-index: 300;
  margin-left: -12px;
  text-align: center;
  color: #fff;
}
.src-container-index a {
  display: block;
    background: #fff;
    width: 8px;
    height: 8px;
    margin-left: 12px;
    border-radius: 100%;
    opacity: .3;
    transition: all .2s ease-in-out;
}
.src-container-index a:hover {
    background: transparent;
    opacity: 1;
    box-shadow: 0 0 0 2px #fff;
}
.src-container-index-select {
  background: transparent !important;
    opacity: 1 !important;
    box-shadow: 0 0 0 2px #fff !important;
}
.intro {
  position: relative;
}
#intro-container {
  margin: 0 auto;
  position: relative;
  z-index: 100;
  max-width: 1466px;
  padding: 0 80px;
  background: transparent;
}
#sec1 {
  width: 100%;
  margin:0 auto;
  margin-top: -100px;
  height: 500px;
  padding: 64px;
  background: #fff;
  box-shadow: 0 8px 24px 0 rgba(63,74,105,.16);
}
.banner-1, .banner-2, .banner-3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.banner-1 {
  background: linear-gradient(to top,#6895FA 0,#645CF3 100%);
}
.banner-2 {
  background: linear-gradient(135deg,#4481EB 0,#04BEFE 100%);
}
.banner-3 {
  background: linear-gradient(314.45deg,#FF9A44 0,#FC6076 100%);
}
.banner-container {
  height: 100%;
  margin:0 auto;
  position: relative;
  max-width: 1346px;
}
.banner-img {
  position: absolute;
    left: 510px;
    bottom: 130px;
    height: 520px;
    z-index: -1;
    text-align: center;
}
.banner-img img {
  height: 100%;
}
.banner-content {
  padding: 0 0 0 80px;
}
.banner-title {
  padding-top: 220px;
    line-height: 56px;
    font-size: 40px;
    font-weight: 200;
    color: #fff;
    margin:0;
}
.banner-intro {
  font-size: 18px;
    letter-spacing: 10px;
    max-width: 450px;
    margin: 16px 0 32px;
    line-height: 28px;
    font-size: 14px;
    color: #fff;
    opacity: .7;
}
.banner-btn {
  cursor: pointer;
  display: inline-block;
  color: #4F60BF;
  padding: 0 40px;
    line-height: 48px;
    border-radius: 40px;
    font-size: 15px;
    font-weight: bold;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(30,62,124,.15);

}
.banner-btn:hover {
    background: #FFF;
    box-shadow: 0 16px 24px 0 rgba(23,57,126,.15), 0 4px 8px 0 rgba(30,62,124,.15);
}
</style>

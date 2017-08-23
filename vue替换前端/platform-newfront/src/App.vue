<template>
  <div id="app">
    <div class="header">
      <div id="title-name"><span>{{title}}</span></div>
      <div id="title-nav">
        <ul>
          <li class="list-item list-item-select" @click="logout">{{nav1}}</li>
          <li class="list-item">{{nav2}}</li>
        </ul>
      </div>
      <div id="title-register" v-if="!usrname" @click="login">
        <span>{{butt1}}</span>
      </div>
      <div id="title-login" v-if="!usrname"  @click="login">
        <span>{{butt2}}</span>
      </div>

      <div class="user-info" v-if="usrname">
        <h3>欢迎您， <span>{{usrname}}</span></h3>
        <div class="user-info-menu">
          <mu-icon-menu icon="keyboard_arrow_down" :anchorOrigin="{horizontal: 'left', vertical: 'top'}" :targetOrigin="{horizontal: 'left', vertical: 'bottom'}">
            <mu-menu-item title="修改密码" />
            <mu-menu-item title="退出登录" @click="logout"/>
          </mu-icon-menu>         
        </div>
      </div>
    </div>
    <router-view v-on:usrlogin="getUsrname"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: '数据处理平台',
      nav1: '首页',
      nav2: '简介',
      butt1: '注 册',
      butt2: '登 陆',
      usrname: ''
    }
  },
  methods: {
    getUsrname (usr) {
      this.usrname = usr.usrname
    },
    login () {
      this.$router.push('main')
    },
    logout () {
      this.$router.push('/')
      this.usrname = ''
    }
  }
}
</script>

<style>
body,html {
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
ul {
  list-style: none;
}
li {
  display: inline-block;
}
a {
  text-decoration: none;
  display: block;
}
a:link, a:visited, a:active, a:hover {
  color: inherit;
}
.header {
  position: absolute;
  width: 100%;
  height: 70px;
  z-index: 50;
  background-color: transparent;
  padding: 13px 0 0 0;
  color: #fff;
  top: 0;
  left: 0;
  right: 0;
}
.header ul li {
  margin: 0 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
}
.header div {
  display: inline-block;
  margin: 0;
  padding: 0;
}
.list-item {
    margin-left: 32px;
    height: 32px;
    line-height: 32px;
    color: rgba(255,255,255,.42);
    transition: all .15s ease-in-out;
}
.list-item:hover {
  color: #fff;
  border-bottom: 2px solid #fff;
}
.list-item a:hover {
    transition: initial;
}
.list-item-select {
  color:#fff;
  border-bottom: 2px solid #fff;
}
#title-name {
  text-align: center;
  position: relative;
  margin-left: 150px;
  font-size: 22px;
  top: 6px;
}
#title-nav {
  position: relative;
  top: 6px;
  margin-left: -20px;
}
#title-register {
  margin:0;
  padding: 5px 14px;
  background-color: transparent;
  border: 1px solid #fff;
  font-size: 16px;
  position: relative;
  text-align: center;
  top: 15px;
  right: 150px;
  cursor: pointer;
  overflow: hidden;
  font-weight: bold;
  float: right;
}
#title-register::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  height: 100%;
  z-index: 0;
  opacity: 0;
  -webkit-transform: rotate3d(0,0,1,-45deg) translate3d(0,-3em,0);
  transform: rotate3d(0,0,1,-45deg) translate3d(0,-3em,0);
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transition: -webkit-transform .3s,opacity .3s,background .3s;
  transition: transform .3s,opacity .3s,background .3s;
  background: #fff;
}
#title-register:hover::before {
  opacity: 1;
  z-index: 0;
  -webkit-transform: rotate3d(0,0,1,0deg);
  transform: rotate3d(0,0,1,0deg);
  -webkit-transition-timing-function: cubic-bezier(0.2,1,.3,1);
  transition-timing-function: cubic-bezier(0.2,1,.3,1);
}
#title-register span {
  position: relative;
  z-index: 3;
}
#title-register:hover {
  color:#5182e4;
}
#title-login {
  margin:0;
  padding: 5px 14px;
  background-color: transparent;
  border: 1px solid #fff;
  font-size: 16px;
  position: relative;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  font-weight: bold;
  float: right;
  top: 15px;
  right: 180px;
}
#title-login::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  height: 100%;
  z-index: 0;
  opacity: 0;
  -webkit-transform: rotate3d(0,0,1,-45deg) translate3d(0,-3em,0);
  transform: rotate3d(0,0,1,-45deg) translate3d(0,-3em,0);
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transition: -webkit-transform .3s,opacity .3s,background .3s;
  transition: transform .3s,opacity .3s,background .3s;
  background: #fff;
}
#title-login:hover::before {
  opacity: 1;
  z-index: 0;
  -webkit-transform: rotate3d(0,0,1,0deg);
  transform: rotate3d(0,0,1,0deg);
  -webkit-transition-timing-function: cubic-bezier(0.2,1,.3,1);
  transition-timing-function: cubic-bezier(0.2,1,.3,1);
}
#title-login span {
  position: relative;
  z-index: 3;
}
#title-login:hover {
  color:#5182e4;
}
.user-info {
  position: absolute;
  right: 150px;
}
.user-info h3 {
  top: 0;
  display: inline-block;
}
.user-info span {
  font-style: italic;
}
div.user-info-menu {
  position: absolute;
  right: -50px;
  top:4px;
}
</style>

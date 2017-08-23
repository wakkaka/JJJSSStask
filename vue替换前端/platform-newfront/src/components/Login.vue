<template>
  <div>
    <div class="login-container">
      <mu-paper class="login" :zDepth="2">
	    <div class="form-banner">
		  <div class="form-banner-img"></div>
		</div>
		<div class="form-main">
		  <mu-tabs :value="activeTab" v-on:change="handleTabChange">
		    <mu-tab value="tab1" :title="title1"></mu-tab>
		    <mu-tab value="tab2" :title="title2"></mu-tab>
		  </mu-tabs>
		  <div class="form-main-login" v-if="activeTab === 'tab1'">
		    <mu-text-field label="用户名" id="login-usrname" v-model="usrname" labelFloat/>
		    <mu-text-field label="密码" type="password" id="login-passwd" v-model="passwd" labelFloat/>
		    <mu-raised-button label="登陆" class="form-main-submit-button" v-on:click="Login(usrname, passwd)" primary/>
		  </div>
		  <div class="form-main-signup" v-if="activeTab === 'tab2'">
		  	<h2>注册</h2>
		  </div>	
		</div>

      </mu-paper>    	
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      title1: '登陆',
      title2: '注册',
      activeTab: 'tab1',
      usrname: '',
      passwd: ''
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    Login (usrname, passwd) {
      var data = {}
      var that = this
      data.userName = usrname
      data.password = passwd
      // this.$router.push('user/' + usrname)
      $.ajax({
        url: this.addr + '/login',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (result) {
          var jsondata = JSON.parse(result)
          data.role = jsondata.result.role
          if (data.role == null) {
            alert('用户名或密码错误!请重新输入！')
            that.usrname = ''
            that.passwd = ''
          } else {
            console.log(that.usrname)
            that.$router.push('user/' + usrname)
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest.status)
          console.log(XMLHttpRequest.readyState)
          console.log(textStatus)
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #474a4f;
  padding-bottom: 80px;
  text-align: center;
}
.login {
  position: absolute;
  height: 384px;
  width: 646px;
  top: 50%;
  left:50%;
  margin-top: -192px;
  margin-left: -323px;
}
.form-banner {
	position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    background-image: linear-gradient(#4562E9 0,#56B5FE 100%),radial-gradient(18% 84%,#5888F5 2%,#586EF5 60%,#7558F4 100%);
}
.form-banner-img {
	position: relative;
    left: 50%;
    top: 50%;
    width: 233px;
    height: 233px;
    margin-top: -96.5px;
    margin-left: -116.5px;
	background: url(../img/form-banner.png) center center no-repeat;
	background-size: cover;
}
.form-main {
	position: absolute;
	top: 20px;
	right: 53px;
	width: 240px;
}
.mu-tabs {
	background-color: transparent;
	color: #5182E4;
	font-weight: bold;
}
.mu-tab-link {
	color:#5182E4;
}
.form-main-login {
	padding-top: 20px;
}
.form-main-submit-button {
	top: 35px;
}
</style>
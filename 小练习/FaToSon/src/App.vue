<template>
  <div id="app">
    <p>son tells me: {{sonWords}}</p>
    <componentA msgfromfather="you die!" v-on:son-tell-me-something='listenToMySon'></componentA>
  </div>
</template>

<script>
import ComponentA from './components/componentA'

export default {
  name: 'app',
  data:function(){
    return{
      sonWords:''
    }
  },
  components: {
    ComponentA
  },
  methods:{
    listenToMySon: function(msg){
      this.sonWords = msg;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

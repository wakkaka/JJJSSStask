<template>
  <div class="User">
  	<div class="user-container">
  	  <div class="user-drawer">
  	    <mu-raised-button label="处理工具" class="user-drawer-button" @click="toggle()" primary/>
        <mu-drawer :open="open" :docked="docked" @close="toggle()" class="user-drawer-main">
          <mu-list class="user-drawer-content" @itemClick="docked ? '' : toggle()">
            <div class="user-drawer-stepper">
                <mu-stepper  class="stepper-main" :activeStep="activeStep" orientation="vertical">
				    <mu-step>
				      <mu-step-label>
				        选择要绘制的图表类型
				      </mu-step-label>
				      <mu-step-content>
						<div class="step-chart-selector">
						  <mu-radio :label="label1" name="group" :nativeValue="label1" v-model="chartType" class="select-radio"/><br/>
						  <mu-radio :label="label2" name="group" :nativeValue="label2" v-model="chartType"  class="select-radio"/><br/>
						  <mu-radio :label="label3" name="group" :nativeValue="label3" v-model="chartType" class="select-radio"/><br/>
						  <mu-radio :label="label4" name="group" :nativeValue="label4" v-model="chartType"  class="select-radio"/><br/>
						</div>
				        <mu-raised-button label="下一步" class="step-button" @click="handleNext" primary/>
				      </mu-step-content>
				    </mu-step>
				    <mu-step>
				      <mu-step-label>
				        选择数据筛选器
				      </mu-step-label>
				      <mu-step-content>
						<mu-switch label="时间筛选器" class="filter-date-switch" v-model="isSeletedDate"/><br/>
						<div class="filter-date" v-if="isSeletedDate">
						  <label>起始：</label>
						  <mu-date-picker v-model="startDate" hintText="选择年份与日期"/><br/>
						  <mu-time-picker v-model="startTime" hintText="选择时间" format="24hr"/><br/>
						  <label>终止：</label>
						  <mu-date-picker v-model="endDate" hintText="选择年份与日期"/><br/>
						  <mu-time-picker v-model="endTime" hintText="选择时间" format="24hr"/><br/>
						</div>
						<mu-switch label="车辆筛选器" class="filter-car-switch" v-model="isSeletedCar"/><br/>
						<div class="filter-car" v-if="isSeletedCar">
						  <mu-text-field v-model="carNum" hintText="请输入要指定车辆"/><br/>
						</div>
				        <mu-flat-button label="上一步" class="step-button" @click="handlePrev"/>
				        <mu-raised-button label="下一步" class="step-button" @click="handleNext" primary/>
				      </mu-step-content>
				    </mu-step>
				    <mu-step>
				      <mu-step-label>
				        确认绘图
				      </mu-step-label>
				      <mu-step-content>
						<div class="stepper-confirm-info">
							<h2>{{chartType}}</h2>
							<p v-if="isSeletedDate">起始：{{Start}}</p>
							<p v-if="isSeletedDate">结束：{{End}}</p>
							<p v-if="isSeletedCar">指定车辆：{{carNum}}</p>
						</div>
				        <mu-flat-button label="上一步" class="step-button" @click="handlePrev"/>
				        <mu-raised-button label="绘图" class="step-button" @click="handleNext();startDraw()" primary/>
				      </mu-step-content>
				    </mu-step>
				  </mu-stepper>
				  <div class="stepper-reset" v-if="finished">
				    <mu-raised-button label="重置选项" class="step-button-reset" @click="reset" primary/>
				  </div>
            </div>
            <mu-list-item class="user-drawer-close-btn" v-if="docked" @click.native="open = false" title="关闭工具栏"/>
          </mu-list>
        </mu-drawer>
  	  </div>
      <mu-dialog :open="errorDialog" title="Dialog">
         {{errorMsg}}
        <mu-raised-button slot="actions" primary @click="closeDialog();reset()" label="确定" primary/>
      </mu-dialog>
  	  <mu-paper class="user-map" id="allmap" :zDepth="3"/>
<!--       <div class="user-map" id="allmap" :zDepth="3"/> -->
  	</div>
  </div>
</template>

<script>
// import {MP} from '../tools/maps'
import $ from 'jquery'
export default {
  mounted () {
    // 地图初始化
    // MP().then(BMap => {
    //   this.map = new BMap.Map('allmap')
    //   this.map.centerAndZoom(new BMap.Point(104.071791, 30.663795), 14)
    //   this.map.setMapStyle({
    //     style: 'midnight'
    //   })
    //   this.map.enableScrollWheelZoom(true)
    // })

    // 地图初始化    
    var map = new BMap.Map("allmap")
    var point = new BMap.Point(104.071791,30.663795)
    map.centerAndZoom(point, 14)
    map.setMapStyle({
        style: 'midnight'
    })
    map.enableScrollWheelZoom(true)

    // 使用自定义事件向app.vue传入用户名，以便在头部显示
    this.$emit('usrlogin', this.meg)
    this.changeStyle()
    // 欢迎
    this.toastr.success('登陆成功，欢迎您！')
  },
  updated () {
    this.changeStyle()
  },
  data () {
    return {
      meg: this.$route.params,
      open: false,
      docked: true,
      activeStep: 0,
      chartType: '',
      map: '',
      isSeletedDate: false,
      isSeletedCar: false,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      label1: '上车点',
      label2: '聚类结果气泡图',
      label3: '上车地点热力图',
      label4: '车辆轨迹图',
      carNum: '',
      errorDialog: false,
      errorMsg: ''
    }
  },
  computed: {
    finished () {
      return this.activeStep > 2
    },
    Start: function () {
      return this.startDate + ' ' + this.startTime + ':00'
    },
    End: function () {
      return this.endDate + ' ' + this.endTime + ':00'
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    handleNext () {
      this.activeStep++
    },
    handlePrev () {
      this.activeStep--
    },
    reset () {
      this.activeStep = 0
    },
    closeDialog () {
      this.errorDialog = false
    },
    startDraw () {
      if (!this.chartType) {
        this.errorMsg = '请选择一种要绘制的图表类型!'
        this.errorDialog = true
      }

      switch (this.chartType) {
        case '上车点':
          this.getinspot()
          break
        case '聚类结果气泡图':
          this.clustervisual()
          break
        case '上车地点热力图':
          this.getinspotheatmap()
          break
        case '车辆轨迹图':
          this.traceplot()
          break
      }
    },
    getinspot () {
      var resultDataSet = []
      var data = {}
      data.token = 'platform'
      data.starttime = ''
      data.endtime = ''
      data.taxiid = ''

      if (this.isSeletedDate) {
        data.starttime = this.Start
        data.endtime = this.End
      }
      if (this.isSeletedCar) {
        data.taxiid = this.carNum
      }

      $.ajax({
        url: this.addr + '/GetInSpot',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (result) {
          var jsondata = JSON.parse(result)
          var datalength = jsondata.result.length
          for (var i = 0; i < datalength; i++) {
            resultDataSet.push({
              geometry: {
                type: 'Point',
                coordinates: [jsondata.result[i].longitude, jsondata.result[i].latitude]
              },
              fillStyle: 'red',
              size: 1
            })
          }

          var map = new BMap.Map("allmap")
          var point = new BMap.Point(104.071791,30.663795)
          map.centerAndZoom(point, 14)
          map.setMapStyle({
              style: 'midnight'
          })
          map.enableScrollWheelZoom(true)

          var dataSet = new mapv.DataSet(resultDataSet)
          var options = {
            fillStyle: 'rgba(255, 50, 50, 0.6)',
            shadowColor: 'rgba(255, 50, 50, 1)',
            shadowBlur: 30,
            globalCompositeOperation: 'lighter',
            methods: {
              click: function (item) {
                console.log(item)
              }
            },
            size: 5,
            draw: 'simple'
          }
          var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log('getinspot error:' + JSON.stringify(data))
          console.log(XMLHttpRequest.status)
          console.log(XMLHttpRequest.readyState)
          console.log(textStatus)
        }
      })
    },
    clustervisual () {
      var clusterDataSet = []
      var min = 99999999999
      var max = 0
      var data = {}
      data.token = 'platform'
      data.starttime = ''
      data.endtime = ''
      console.log(data)
      if (this.isSeletedDate) {
        data.starttime = this.startDate
        data.endtime = this.endDate
      }

      $.ajax({
        url: this.addr + "/ClusterVisual",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (result) {
          var jsondata = JSON.parse(result)
          console.log('result.longitude：' + jsondata.result[0].longitude)
          var datalength = jsondata.result.length
          console.log("数据集大小： " + datalength)
	            
          for(var i = 0; i < datalength; i++) {
            var numSpot = jsondata.result[i].counts

            if (numSpot > max) {
              max = numSpot
            }

            if (numSpot < min) {
              min = numSpot
            }
            clusterDataSet.push({
              geometry: {
                type: 'Point',
                coordinates: [jsondata.result[i].longitude, jsondata.result[i].latitude]
              },
              count: numSpot
            })
          }
          console.log("=== " + clusterDataSet[2].count)

          var map = new BMap.Map("allmap")
          var point = new BMap.Point(104.071791,30.663795)
          map.centerAndZoom(point, 14)
          map.setMapStyle({
              style: 'midnight'
          })
          map.enableScrollWheelZoom(true)

          var dataSet = new mapv.DataSet(clusterDataSet)
          var options = {
            fillStyle: 'rgba(255, 50, 50, 0.6)',
            maxSize: 92,
            max: 18286,
            draw: 'bubble'
          }
          console.log(map, dataSet, options)
          var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("getinspot error:" + JSON.stringify(data))
          console.log(XMLHttpRequest.status)
          console.log(XMLHttpRequest.readyState)
          console.log(textStatus)
        },
      })
    },
    getinspotheatmap () {
      var heatmapdataset = []
      var data = {}
      data.token = 'platform'
      data.starttime = ''
      data.endtime = ''
      data.taxiid = ''
      console.log(data)
      if (this.isSeletedDate) {
        data.starttime = this.Start
        data.endtime = this.End
      }
      if (this.isSeletedCar) {
        data.taxiid = this.carNum
      }
      $.ajax({
        url: this.addr + "/GetInHeatMap",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (result) {
          var jsondata = JSON.parse(result)
          var datalength = jsondata.result.length
          for(var i = 0; i < datalength; i++) {
            heatmapdataset.push({
            geometry: {
              type: 'Point',
              coordinates: [jsondata.result[i].longitude, jsondata.result[i].latitude]
            },
            count: 1
            })
          }

          var map = new BMap.Map("allmap")
          var point = new BMap.Point(104.071791,30.663795)
          map.centerAndZoom(point, 14)
          map.setMapStyle({
              style: 'midnight'
          })
          map.enableScrollWheelZoom(true)

          var dataSet = new mapv.DataSet(heatmapdataset)
          var options = {
            size: 13,
            gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)'},
            max: 1,
            draw: 'heatmap'
          }
          var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("getinspot error:" + JSON.stringify(data));
          console.log(XMLHttpRequest.status);
          console.log(XMLHttpRequest.readyState);
          console.log(textStatus);
	    }
	  })
    },
    traceplot () {
      var cartrajdataset = []
      var data = {}
      data.token = 'platform'
      data.starttime = ''
      data.endtime = ''
      data.taxiid = ''
      console.log(data)
      if (this.isSeletedDate) {
        data.starttime = this.Start
        data.endtime = this.End
      }
      if (this.isSeletedCar) {
        data.taxiid = this.carNum
      }
      $.ajax({
        url: this.addr + "/CarTrajectory",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(result) {
          var jsondata = JSON.parse(result)
          var map = new BMap.Map("allmap")
          var point = new BMap.Point(104.071791,30.663795)
          map.centerAndZoom(point, 14)
          map.setMapStyle({
              style: 'midnight'
          })
          map.enableScrollWheelZoom(true)

          var datalength = jsondata.result.length
          var coordinates = []
          var points = []
          for(var i = 0; i < datalength; i++) {
           coordinates.push([jsondata.result[i].longitude,jsondata.result[i].latitude])
         }
         cartrajdataset.push({
           geometry: {
             type: 'LineString',
             coordinates: coordinates
           }
         })
         var dataSet = new mapv.DataSet(cartrajdataset)
         var options = {
           strokeStyle: 'rgba(50, 50, 255, 0.8)',
           lineWidth: 1,
           shadowColor: 'rgba(53,57,255,0.2)',
           shadowBlur: 1,
           globalCompositeOperation: 'lighter',
           draw: 'simple'
         }
         var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)           
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log('getinspot error:' + JSON.stringify(data))
          console.log(XMLHttpRequest.status)
          console.log(XMLHttpRequest.readyState)
          console.log(textStatus)
        }
      })
    },
    changeStyle () {
      $('.mu-radio-label').css('color', '#fff')
      $('.mu-flat-button-label').css('color', '#ccc')
      $('.mu-switch-label').css('color', '#ccc')
      $('.mu-text-field-input').css('color', '#ccc')
      $('.mu-text-field-hint').css('color', 'rgba(169, 169, 169, 0.38)')
      $('.mu-item').css('margin-top', '35px')
      $('.mu-item-title').css({
        'font-size': '15px',
        'color':'#fff',
        'text-align': 'center'
      })
    }
  }
}
</script>

<style scoped>
.User {
  height: 100%;
}
.user-test {
	color: #fff;
}
.user-container {
  width: 100%;
  height: 100%;
  background-color: #202238;
  padding: 65px 40px 40px 40px;
}
.user-drawer-button {
  position: absolute;
  top: 100px;
  left: -12px;
  font-weight: bold;
  z-index: 2;
}
.user-drawer-main {
  padding-top: 100px;
  background-color: #273152;
  z-index: 51;
}
.user-map {
	margin-top: 18px;
	height: 100%;
	width: 100%;
	background-color: #ccc;
}
.user-drawer-stepper {
	height: 100%;
}
.step-chart-selector {
	margin-left: 10px;
}
.select-radio {
	margin: 15px 0;
}
.step-button {
	margin-top: 20px;
}
.step-button-reset {
	margin: 20px 0;
}
.stepper-reset {
	text-align: center;
}
.filter-date label {
	display: block;
	color: #fff;
	margin-top: 15px;
}
.stepper-confirm-info {
	color: #ccc;
}
.mu-item-title {
	font-size: 15px;
	color:#fff;
	text-align: center;
}
.mu-radio-label {
	color: rgba(255, 255, 255, 0.95) !important;
}
.mu-step-label {
	color: #fff;
}
.mu-switch-label {
	color: #fff;
}
.mu-text-field-hint {
	color: rgba(169, 169, 169, 0.38);
}
.mu-text-field-input {
	color: #ccc;
}
.mu-flat-button-label {
	color: #ccc;
}
</style>
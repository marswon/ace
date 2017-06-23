var app = getApp();
var util = require("../../util/util.js");
var cfg = require("../../config.js");

Page({
  data: {
    hasLocation: false,
    showModalStatus: false,
    view: {
      height: '100vh'
    },
    list: [
    ],

    latitude: 29.031673,
    longitude: 111.698497,
    markers: [{
      iconPath: "../../image/location.png",
      id: '久久鸭脖中心店',
      latitude: 29.031673,
      longitude: 111.698497,
      width: 35,
      height: 45,
      callout: { content: "久久鸭脖中心店", color:"#000000", fontSize: 14, borderRadius: 5, bgColor: "", padding: 10, display:'ALWAYS'}
      //label: { color: "#000000", fontSize: 20, content:"久久鸭脖中心店", x:2, y:3}
    }],
    polyline: [{
      points: [{
        longitude: '116.481451',
        latitude: '40.006822'
      }, {
        longitude: '116.487847',
        latitude: '40.002607'
      }, {
        longitude: '116.496507',
        latitude: '40.006103'
      }],
      color: "#FF0000DD",
      width: 3,
      dottedLine: true
    }],
    circles: [{
      latitude: '40.007153',
      longitude: '116.491081',
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 400,
      strokeWidth: 2
    }],
    controls: [/*{
      id: 1,
      iconPath: '../../image/record.png',
      position: {
        top: 250,
        left: 320,
        width: 50,
        height: 50
      },
      clickable: true
    }*/]
  },
  controltap: function (e) {
    console.log(e.controlId);
    var that = this;
    that.showModal();
  },
  bindtap: function (e) {
    console.debug("bindtap click");
    var that = this;
    that.hideModal();
  },
  markertap: function (e) {
    var that = this;
    var data = that.data.markers;
    for (var i = 0; i < data.length; i++) {
      var o = data[i];
      if (o.id == e.markerId){
        that.setData({
          o: o
        });
      }
    }
    
    that.showModal();
    console.log(e)
  },
  //获取经纬度  
  getLocation: function (e) {
    console.log(e)
    var that = this
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  //根据经纬度在地图上显示  
  openLocation: function (e) {
    console.log("openLocation" + e)
    var value = e.detail.value
    wx.openLocation({
      longitude: Number(value.longitude),
      latitude: Number(value.latitude)
    })
  },
  //选择位置位置  
  chooseLocation: function (e) {
    console.log(e)
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success  
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
  },
  getUserInfo: function () {
    var that = this
    if (app.globalData.hasLogin === false) {
   
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          //that.update()
        }
      })
    }
  },
  clear: function () {
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
  },
  onLoad: function () {
    console.log('onLoad');
    this.getLocation();
    this.getUserInfo();
    var that = this;
    util.request(cfg.selectOrganizationListMap, {},
      function (data) {
        var markers=[];
        for(var i=0;i<data.length;i++){
         var o=data[i];
         o.iconPath = "../../image/general_house_help_96px_1167237_easyicon.net.png",
          o.width= 45,
          o.height= 45,
            o.callout = { content: o.name, color: "#FFFFFF", fontSize: 14, borderRadius: 5, bgColor: "#0000FF", padding:5, display: 'ALWAYS' }
          markers.push(o);
          console.log(o);
        }
        that.setData({
          markers: markers
        });
      }
    );
  },
  showModal: function () {
    // 显示遮罩层
    this.setData({
      showModalStatus: true,
      view: {
        height: '80vh'
      }
    })
  },
  hideModal: function () {
    // 隐藏遮罩层
    this.setData({
      showModalStatus: false,
      view: {
        height: '100vh'
      }
    });
  },
  navigator: function () {
    var that=this;
    console.log('../organization/index?id=' + that.data.o.id);
    wx.navigateTo({
      url: '../organization/index?id=' + that.data.o.id
    });
     this.hideModal();
  }
})



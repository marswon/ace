var util = require("../../util/util.js");
var cfg = require("../../config.js");
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我发现了掌上统战小程序，一起看看吧',
      path: '/page/reg/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  data: {
    loading: false,
    disabled: false,
    disabledReg: true,
    hasUserInfo:false,
    tabActiveLeft:"tab-active",
    tabActiveRight:"",
    id: util.uuid(),
    formData:{}
  },
  onReady: function (res) {
    wx.setNavigationBarColor({
      frontColor: cfg.frontColor,
      backgroundColor: cfg.backgroundColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
  },
  tableft:function(e){
    this.setData({
      tabActiveLeft: "tab-active",
      tabActiveRight: "",
    })
  },
  tabright: function (e) {
    this.setData({
      tabActiveLeft: "",
      tabActiveRight: "tab-active",
    })
  },
  getUserInfo:function(e){
    console.log(e);
    var that=this;
    that.setData({
      loading: true,
      disabled: true
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (data) {
        console.log(data);
        wx.login({
          success: function (o) {
            wx.getUserInfo({
              success: function (res) {
                
                wx.request({
                  url: cfg.loginUrl,
                  data: {
                    appid: cfg.appid,
                    appsecret: cfg.appsecret,
                    code: o.code,
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    latitude: data.latitude,
                    longitude: data.longitude
                  },
                  success: function (r) {
                    wx.setStorageSync('WX-SESSION-ID', r.data.value['3rd_session']);
                  
                   
                    that.setData({
                      loading: false,
                      disabled: false,
                      userInfo: res.userInfo,
                      hasUserInfo: true,
                      disabledReg: false,
                      WXSESSIONID: r.data.value['3rd_session']
                    });
                    
                    console.log(res);
                    console.log(r.data.value['3rd_session']);
                  },
                  fail: function ({ errMsg }) {
                    console.log('request fail', errMsg)
                  }
                })
              }
            })
          }
        })
      }
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countryIndex: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e);
    var that = this;
    this.setData({
      loading: true,
      disabled: true
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var data = e.detail.value;
    data.formId = e.detail.formId;
    util.request(cfg.regUrl, data,
      function (data) {
        that.setData({
          loading: false,
          disabled: false
        })
        if (data.status == '0') {
          wx.setStorage({
            key: "userInfo",
            data: data.value
          })
          wx.showModal({
            title: '提示',
            content: '绑定成功',
            success: function (res) {
                that.navigator(that.data.redirectTo);
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: data.errorMessage,
            success: function (res) {
              that.navigator("/page/reg/index?redirectTo=" + that.data.redirectTo);
            }
          })
        }
      }
    );
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  onLoad: function (options) {
    this.setData({
      checkImageUrl: cfg.checkImageUrl,
      formData: options,
      redirectTo: options.redirectTo
    });
  },
  navigator: function (url) {
    console.log(url)
    wx.reLaunch({
      url: url
    });
  },
  formReset: function (e) {
    console.log("clear");
    fileList = [];
    this.setData({
      files: fileList,
      id: util.uuid()
    });
  }
});
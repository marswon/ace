var orderByStr = '';
var sliceImgIds = [];
$(function () {
    initWeb();
    /*修改直播状态*/
   // $('.sceneList').on('click', '.changeLiveStatus', changeLiveStatusDo);
    $('.sceneList').on('click', '.reportNum', viewReportListByIdDo);
    /*根据直播名查找*/
    $('.search').click(searchByNameDo);
    /*按照状态分类*/
    $('.topToolBtn').on('change', '.jxbStatus', searchByStatusDo);
    /*点击修改直播内容*/
    $('.sceneList').on('click', '.picbar', viewLive);
    /*按时间排序*/
    $('.topToolBtn').on('click', '.sortLive', sortLiveByTimeDo);
    /*进入直播页面*/
    $('.sceneList').on('click', '.changeLiveStatus', viewLive);
});

/*进入直播页面*/
function viewLive(){
    var id = $(this).parents('li').data('Liveid');
    location.href = "../../../www/view/jxb.jsp?companyId=0010007" + "&id=" + id;
}

/*查看报道列表*/
function viewReportListByIdDo() {
    var rid = $(this).parents('li').data('Liveid');
    if (!rid) {
        return;
    }
    $('#htmlLoad').data('rid', rid);
    $('#htmlLoad').load('./../jsp/managementReportInLive.jsp', function () {
        $('#JSLoad').load('./../jsp/managementReportInLiveJS.jsp', function () {

        });
    });
    return false;
}

/*按开始时间排序*/
function sortLiveByTimeDo() {
    var flag = $(this).data('flag');
    if (flag) {
        orderByStr = null;
        $(this).data('flag', false);
    } else {
        orderByStr = 'startTime';
        $(this).data('flag', true);
    }
    searchByNameDo();
}


/*初始化页面*/
function initWeb() {
    $.get(userUrl, function () {
        loadLiveList();
    });
}
function loadLiveList(type) {
    var url = '/jxb/www/jxb/getListByCompany.do';
    var data = {
        // 'name': name,
        'start': start,
        'limit': limit,
        'orderBy': orderByStr,
        // 'status': jxbStatus,
        //'deptId': userProp.corpId,
        'type' : type,
        'page' : 1,
        'companyId':'0010007',
        'sord': 'asc'
    }
    $.getJSON(url, data, function (result) {
        if (result.status == 0) {
            viewSliceList(result.data);
            viewLiveList(result.data);
        }
    })
}
/*下载直播数据*/
function loadLiveListByType(type) {
    var url = '/jxb/www/jxb/getListByCompany.do';
    var data = {
        // 'name': name,
        'start': start,
        'limit': limit,
        'orderBy': orderByStr,
        // 'status': jxbStatus,
        //'deptId': userProp.corpId,
        'type' : type,
        'page' : 1,
        'companyId':'0010007',
        'sord': 'asc'
    }
    $.getJSON(url, data, function (result) {
        if (result.status == 0) {
            viewLiveList(result.data);
        }
    })
}

/*渲染直播列表*/
function viewLiveList(data) {
    $('.sceneList').empty();
    var dataType = {
        "01" : "亲子关系",
        "02" : "婚姻家庭",
        "03" : "情绪调控",
        "04" : "职场压力"
    };
    for (var i = 0; i < data.length; i++) {
            if(sliceImgIds.indexOf(data[i].id) < 0){
                var liLive = jxbTemplate;
                liLive = liLive.replace('[imageSrc]', imgHost + data[i].imageSrc);
                liLive = liLive.replace('[name]', data[i].name);
                liLive = liLive.replace('[type]', dataType[data[i].type]);
                liLive = liLive.replace('[startTime]', getMyDate(new Date(data[i].startTime))
                );
                //liLive = liLive.replace('[reportNum]', data[i].reportCount);
                var status = data[i].status == 1 ? '进入' : (data[i].status == 2 ? '结束直播' : (data[i].status == 3 ? '恢复直播' : ''));
                liLive = liLive.replace('[status]', status);
                var $li = $(liLive).data("Liveid", data[i].id);
                $('.sceneList').append($li);
            }
    }
}

/*渲染图片轮播页面*/
function viewSliceList(data){
    //渲染图片轮播页面
    var slideData = ["First slide", "Second slide", "Third slide"];
    for(var j=0; j < 3; j++){
        sliceImgIds[j] = data[j].id;
        var sliceImg = sliceTextTemplate;
        //初始化时默认显示第一张图片
        if(j <1) {
            sliceImg = sliceImg.replace('[activity]', "item active");
        }else{
            sliceImg = sliceImg.replace('[activity]', "item");
        }
        sliceImg = sliceImg.replace('[sliceImg]', imgHost + data[j].imageSrc);
        sliceImg = sliceImg.replace('[slide]', slideData[j]);
        sliceImg = sliceImg.replace('[sliceName]', data[j].name);
        var $li = $(sliceImg).data("Liveid", data[j].id);
        $('#sliceImgContainer').append($li);
    }
}

/*切换直播状态*/
/*function changeLiveStatusDo() {
    console.log('切换直播');
    var id = $(this).parents('li').data('Liveid');
    var url = '/jxb/jxb/selectLiveByPrimaryKey.do';
    var data = {
        'id': id
    }
    $.getJSON(url, data, function (result) {
        if (result.status == 0) {
            modifyStatus(result.value);
        }
    });
}*/

/*更改状态*/
function modifyStatus(dataLive) {
    for (var item in dataLive) {
        if (item == 'status') {
            var status = dataLive[item];
            if ("1" == status) {
                dataLive[item] = "2";
            } else if ("2" == status) {
                dataLive[item] = "3";

            } else if ("3" == status) {
                dataLive[item] = "1";
            }
        }
        dataLive['endTime'] = new Date();
    }
    var url = "/jxb/jxb/updateLive.do";
    var data = {
        'jsons': JSON.stringify(dataLive)
    };
    $.post(url, data, function (result) {
        if (result.status == 0) {
            searchByNameDo();
        } else {
            alert("操作失败，请重试。");
            searchByNameDo();
        }
    });
}

/*按名字搜索直播*/
function searchByNameDo() {
    var jxbStatus = $('.jxbStatus').val();
    var inputName = $('.searchByName').val();
    loadLiveList(inputName, jxbStatus);
}

/*根据状态查找*/
function searchByStatusDo() {
    searchByNameDo();
}

/*修改直播信息*/
function modifyLiveDo(event) {
    var id = $(this).parents('li').data('Liveid');
    if (!id) {
        return;
    }
    var url = '/jxb/jxb/selectLiveByPrimaryKey.do';
    var data = {
        'id': id
    }
    $('#htmlLoad').data('jxbId', id);
    $.getJSON(url, data, function (result) {
        if (result.status == 0) {
            $('#htmlLoad').load('./../jsp/floatTable.jsp', function () {
                $('#floatTable').load('./../jsp/liveForm.jsp', function () {
                    $('#JSLoad').load('./../jsp/modifyLiveJS.jsp', function () {
                        showModifyWeb(result.value);
                    })
                });
            });
        }
    });
}

/*进入修改页*/
function showModifyWeb(data) {
    $('.modify').show();
    for (var item in data) {
        if (item == 'imageSrc') {
            viewCover(data[item]);
        } else if (item == 'category') {
            $(":radio[name='category'][value='" + data[item] + "']").prop("checked", "checked");
        } else if (item == 'status') {
            status = data[item];
        } else {
            $('.' + item).val(data[item]);
        }
    }
}

/*图片上传成功后*/
function viewCover(img) {
    $('.pictureContainer').data('imgSrc', img);
    var imagePath = imgHost + img;
    $('.viewPicture img').prop('src', imagePath);
    $('.uploadText').hide();
}

/*课程类别切换*/
function changeCourseTab(type){
    console.log(type);
    if(type != null && type != undefined){
        loadLiveListByType(type);
    }
}

/* format 日期*/
function getMyDate(str){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
    return oTime;
};
//补0操作
function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}


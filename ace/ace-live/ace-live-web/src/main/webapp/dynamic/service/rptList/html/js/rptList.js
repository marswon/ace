var host='http://192.168.2.153/live';
var start;
var limit=25;
var orderByStr=null;
var id;
var mediaType=2;

$(function () {
    initweb();
    $(":radio").click(chooseTypeDo);
    $('.cancel').click(hideSelectReportDo);
    $('.search').click(searchByNameDo);
    $('.release').click(releaseDo);
    $('.reportList').on('click','.picbar',actionModifyDo);
    $('.previewPage').click(hidePreviewPageDo);
    $('.msgbar').on('click','a',startPreviewDo);
});
/*点击预览按键*/
function startPreviewDo() {
       console.log('33333333');
       var  id=$(this).parent().parent().data('Liveid');
       var data= findCover(id);
       console.log(data);
}

/*取消预览*/
function hidePreviewPageDo(event) {
    if(event.eventPhase=='2'){
        $('.previewWeb-content').empty();
        $(this).hide();
    }
    return false;
}
/*点击修改报道*/
function  actionModifyDo() {
    console.log('修改报道');
    id = $(this).parent().data('Liveid');
    console.log(id);
    var url = host + '/liveRpt/selectLiveRptByPrimaryKey.do';
    var data = {
        'id': id
    };
    $.getJSON(url, data, function (result) {
        console.log(result);
        if (result.status == 0) {
            showModifyWeb(result.value);
        }
    });
}

/*显示修改报道页*/
function showModifyWeb(data){
    $('.select_report').show();
    for (var item in data) {
        if (item == 'id') {
            findCover(data[item]);
        } else if (item == 'rid'){
            viewLiveName(data[item]);
        } else {
            $('.' + item).val(data[item]);
        }
    }
}

/*根据id查找直播*/
function viewLiveName(id) {
    var url = host + '/live/selectLiveByPrimaryKey.do';
    var data = {
        'id': id
    }
    $.getJSON(url, data, function (result) {
        if (result.status == 0) {
            var data=result.value;
            for (var item in data){
                    $('.' + item).val(data[item]);
            }
        }
    });
}
/*根据id查找图片*/
function findCover(id){
    var url = host + '/liveImg/findLiveImgList.do';
    var data = {
        'rptId': id
    };
    $.getJSON(url, data, function (result) {
        if (result.status == 0) {
           return result.value;
        }
    });
}


/*确认发布报道*/
function releaseDo() {

}

/*按名字搜索报道*/
function searchByNameDo(){
    var inputName=$('.searchByName').val();
    console.log(inputName);
    loadLiveList(inputName);
}



/*点击隐藏发布直播页*/
function  hideSelectReportDo() {
    $('.select_report').hide();
}
/*选择报道类型*/
function chooseTypeDo() {
    mediaType=$(this).val();
    switch (parseInt(mediaType)) {
        case 1: chooseVideoDo(); break;
        case 2: chooseImageDo(); break;
        case 3:	chooseAudioDo();
    }
}
function chooseVideoDo(){
    $('#file-3').fileinput('clear');
    $('#file-3').fileinput('refresh',{maxFileCount: 1,allowedPreviewTypes: ['video'],allowedFileTypes: ['video']});
}
function chooseImageDo(){
    $('#file-3').fileinput('clear');
    $('#file-3').fileinput('refresh',{maxFileCount: 4,allowedPreviewTypes: ['image'],allowedFileTypes: ['image']});
}
function chooseAudioDo(){
    $('#file-3').fileinput('clear');
    $('#file-3').fileinput('refresh',{maxFileCount: 1,allowedPreviewTypes: ['audio'],allowedFileTypes: ['audio']});
}
/*网页初始化*/
function initweb() {
    /*下载组件*/
    initFileUpload();
    /*初始化选择图片上传*/
    chooseImageDo();
    /*下载报道列表*/
    loadReportList();
    $('.previewPage').hide();
}
/*下载直播数据*/
function loadReportList(name) {
    console.log('loadReportList');
    var url=host+'/liveRpt/findLiveRptList.do';
    var data={
        'name':name,
        'start':start,
        'limit':limit,
        'orderBy':orderByStr,
        'mediaType':'2'
    }
    $.getJSON(url, data,function (result) {
        if(result.status==0){
            viewReportList(result.rows);
        }
    })
}

/*渲染直播列表*/
function viewReportList(data) {
    console.log('viewList');
    console.log(data);
    $('#liveReportTable').empty();
    for(var i=0;i<data.length;i++){
        var liReport=reportTextTemplate;
        if(data[i].mediaContent){
            liReport=reportImgTemplate;
            liReport=liReport.replace('[imgUrl]',data[i].mediaContent);
        }
        liReport=liReport.replace('[content]',data[i].content);
        liReport=liReport.replace('[createTime]',data[i].createTime.substring(0,16));
        var $li=$(liReport).data("Liveid",data[i].id);
        $('#liveReportTable').append($li);
    }
}

/*直播列表模板*/
var reportTextTemplate='<li>'+
    '            <div class="picbar">'+
    '                <div class="textContent">[content]</div>'+
    '            </div>'+
    '            <div class="msgbar">'+
    '            	<span class="omission msgbar-common creater"> '+
    '            		<i class=""></i>[名字]'+
    '            	</span>'+
    '                <span class="msgbar-common msgbar-time">'+
    '            		<i class="icon-clock"></i>[createTime]'+
    '            	</span><a class="">预览</a>'+
    '            </div>'+
    '        </li>';

var reportImgTemplate='<li>'+
    '            <div class="picbar">'+
    '                <div class="title omission">[content]</div>'+
    '                <div class="pic">'+
    '                    <img src="[imgUrl]">'+
    '                </div>'+
    '            </div>'+
    '            <div class="msgbar"> '+
    '            	<span class="omission msgbar-common creater"> '+
    '            		<i class=""></i> [名字] '+
    '            	</span>'+
    '                <span class="msgbar-common msgbar-time">'+
    '            		<i class="icon-clock"></i> [createTime] '+
    '            	</span> <a>预览</a>'+
    '            </div>'+
    '        </li>';

/*文件上传组件初始化*/
function initFileUpload() {
    $("#file-3").fileinput({
        theme: 'fa',
        language: 'zh',
        uploadUrl: 'http://192.168.2.153/portal/files/uploadFile.do',
        uploadAsync: false,
        showUpload: false,
        maxFileCount: 4,
        showCaption: false,
        browseClass: "btn btn-primary btn-lg",
        fileType: "any",
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        overwriteInitial: false,
        initialPreviewAsData: true,
    });
}

$("#createTime").datetimepicker({
    format: "yyyy-mm-dd hh:ii",
    language: 'zh-CN',
    autoclose: true,
    todayBtn: true,
});

/*取消提示*/
var imgHost = 'http://zx.huacainfo.com/';
var userUrl = '/portal/system/getUserProp.do';
var limit = 1000;
var userProp;
var start = 0;
var uploaderI=null;
var uploaderV=null;
/*直播模板*/
var jxbTemplate = ' <li>' +
    '             <div class="picbar">' +
    '                <div class="pic">' +
    '                    <img src="[imageSrc]">' +
    '                </div>' +
    '                <span class="reportNum">[reportNum]条报道' +
    '                </span>' +
    '                <div class="jxbtitle omission">[name]</div>' +
    '            </div>' +
    '            <div class="msgbar fn-clear"> ' +
                    '<span class="omission msgbar-common creater">' +
'            		  <i>#</i>[type]<i>#</i>' +
'            	</span>' +
    '                <span class="msgbar-common msgbar-time">' +
    '            		<i class="iconfont">&#xe651;</i>[startTime]' +
    '            	</span>' +
    '                <a class="changeLiveStatus">[status]</a>' +
    '            </div>' +
    '        </li>';

function promptDo(text) {
    $('.prompt').text(text);
}

/**/
$(function () {
    $('#htmlLoad').on('click', '.html-blackCancel', hideTableDo);
    $('#htmlLoad').on('click', '.blackBtn', hideTableDo);
    $('#htmlLoad').on('focus', '.form-control', actionPromptDo);
});

function actionPromptDo() {
    promptDo('');
}


/*隐藏修改页面*/
function hideTableDo() {
    $('#htmlLoad').empty();
    $('#JSLoad').empty();
}

/*选择报道类型*/
function chooseTypeDo() {
    mediaType = $(this).val();
    console.log(mediaType);
    switch (parseInt(mediaType)) {
        case 1:
            chooseVideoDo();
            break;
        case 2:
            chooseImageDo();
            break;
    }
}

/*直播列表模板*/
var reportTextTemplate = '<li id="[id]">' +
    '            <div class="picbar">' +
    '                <div class="textContent">[content]</div>' +
    '                [checkbox]' +
    '            </div>' +
    '            <div class="msgbar">' +
    '            	<span class="omission msgbar-common creater"> ' +
    '            		<i class="iconfont">&#xe61a;</i>[name]' +
    '            	</span>' +
    '                <span class="msgbar-common msgbar-time">' +
    '            		<i class="iconfont">&#xe651;</i>[createTime]' +
    '            	</span>[btnSpace]' +
    '            </div>' +
    '        </li>';

var reportImgTemplate = '<li id="[id]">' +
    '            <div class="picbar">' +
    '                <div class="title omission">[content]</div>' +
    '                <div class="pic">' +
    '                    <img src="[mediaContent]">' +
    '                </div>' +
    '                [checkbox]' +
    '            </div>' +
    '            <div class="msgbar"> ' +
    '            	<span class="omission msgbar-common creater"> ' +
    '            		<i class="iconfont">&#xe61a;</i>[name] ' +
    '            	</span>' +
    '                <span class="msgbar-common msgbar-time">' +
    '            		<i class="iconfont">&#xe651;</i> [createTime] ' +
    '            	</span>[btnSpace]' +
    '            </div>' +
    '        </li>';

var reportVideoTemplate = '<li id="[id]">' +
    '            <div class="picbar">' +
    '                <div class="title omission">[content]</div>' +
    '                <div class="pic">' +
    '                    <video src="[mediaContent]"></video>' +
    '                </div>' +
    '                [checkbox]' +
    '            </div>' +
    '            <div class="msgbar">' +
    '                <span class="omission msgbar-common creater">' +
    '                    <i class="iconfont">&#xe61a;</i>[name]' +
    '                </span>' +
    '                <span class="msgbar-common msgbar-time">' +
    '                    <i class="iconfont">&#xe651;</i>[createTime]' +
    '                </span>[btnSpace]' +
    '            </div>' +
    '        </li>';


var reportAudioTemplate = '<li id="[id]">' +
    '            <div class="picbar">' +
    '                <div class="title omission">[content]</div>' +
    '                <div class="pic">' +
    '                 <audio controls="controls">' +
    '                           <source src="[mediaContent]" type="audio/mpeg">' +
    '                 </audio>' +
    '                </div>' +
    '                [checkbox]' +
    '            </div>' +
    '            <div class="msgbar">' +
    '                <span class="omission msgbar-common creater">' +
    '                    <i class="iconfont">&#xe61a;</i>[name]' +
    '                </span>' +
    '                <span class="msgbar-common msgbar-time">' +
    '                    <i class="iconfont">&#xe651;</i>[createTime]' +
    '                </span>[btnSpace]' +
    '            </div>' +
    '        </li>';

var sliceTextTemplate = '<div class="[activity]">'+
                                '<img src="[sliceImg]" alt="[slide]" style="height: 4rem; width: 100%; object-fit: cover;"/>'+
                                '<div class="carousel-caption">'+
                                    '<h4>[sliceName]</h4>'+
                                '</div>'+
    '</div>';


var courseTemplate = '<div style="width: 50%;float: left;" id="course">'+
                            '<div style="width: 94%;  margin: 0 auto">'+
                                '<div class="audio">'+
                                    '<div class="audioContainer">'+
                                        '<img src="[audioCover]" style="height: 100%;width: 100%; object-fit: cover;"/>'+
                                    '</div>'+
                                    '<span class="playTime"><img src="img/playTime@2x.png"/>[duration]</span>'+
                                    '<span class="audioType">[audioType]</span>'+
                                '</div>'+
                                '<div class="remark">'+
                                    '<div class="audioTitle">'+
                                        '<p>[name]</p>'+
                                    '</div>'+
                                    '<div class="audioPrice">'+
                                        '<div class="[costType]">'+
                                            '<span>[cost]</span>'+
                                        '</div>'+
                                        '<div class="playsNum">'+
                                            '<span>[demandNum]</span>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'


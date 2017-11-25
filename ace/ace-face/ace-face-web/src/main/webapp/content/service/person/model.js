var _colNames =['主键','姓名','性别','出生日期','单位','形象照片','人脸的标识','人脸检测结果','状态','创建人编号','创建人姓名','入库日期','最后更新人编号','最后更新人姓名','最后更新时间','操作'];
var _colModel = function() {
	return [
	{name : 'id',editable : true,width : 100,editoptions : {size : "20",maxlength : "50"},formoptions : {elmprefix : "",elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"},editrules : {required : true}},{name : 'name',editable : true,width : 100,editoptions : {size : "20",maxlength : "50"},formoptions : {elmprefix : "",elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"},editrules : {required : true}},{name : 'sex',editable : true,width : 100,editoptions : {size : "20",maxlength : "50"},formoptions : {elmprefix : "",elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"},editrules : {required : true}},{name : 'birthday',editable : true,width : 100,edittype : "datebox",dataoptions : {    formatter : function(date) {var y = date.getFullYear();var m = date.getMonth() + 1;var d = date.getDate();return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);},parser : function(s) {if (!s)return new Date();var ss = (s.split('-'));var y = parseInt(ss[0], 10);var m = parseInt(ss[1], 10);var d = parseInt(ss[2], 10);if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {return new Date(y, m - 1, d);} else {return new Date();}}},editoptions : {size : "20",maxlength : "50"},formoptions : {elmprefix : "",elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"},editrules : {required : true}},{name : 'dept',editable : true,width : 100,editoptions : {size : "20",maxlength : "50"},},{name : 'photo',editable : true,width : 100,editoptions : {size : "20",maxlength : "50"},},{name : 'faceFoken',editable : true,width : 100,editoptions : {size : "20",maxlength : "50"},},{name : 'attributes',editable : true,width : 100,editoptions : {size : "20",maxlength : "50"},},{name : 'status',editable : true,width : 100,edittype : "checkbox",editoptions : {value : "1:0"},unformat : aceSwitch,renderer : function(value) {var rst = "";switch (value) {case '1' :rst = "ON";break;case '0' :rst = "OFF";break;default :rst = "N/A";}return rst;},formoptions : {elmprefix : "",elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"},editrules : {required : true}},{name : 'createUserId',hidden : true,editable : false,width : 100},{name : 'createUserName',hidden : true,editable : false,width : 100},{name : 'createDate',hidden : true,editable : false,width : 100},{name : 'lastModifyUserId',hidden : true,editable : false,width : 100},{name : 'lastModifyUserName',hidden : true,editable : false,width : 100},{name : 'lastModifyDate',hidden : true,editable : false,width : 100},
	 {
                name: 'opt',
                width: 100,
                hidden:false,
                editable: false,
                sortable:false,
                renderer:function(value, cur){
                    return renderBtn(cur);
                }
            }
	];
}
function aceSwitch(cellvalue, options, cell) {
	console.log('aceSwitch');
	setTimeout(function() {
		$(cell).find('input[type=checkbox]').addClass(
				'ace ace-switch ace-switch-5').after(
				'<span class="lbl"></span>');
	}, 0);
}
// enable datepicker
function pickDate(cellvalue, options, cell) {
	setTimeout(function() {
		$(cell).find('input[type=text]').datepicker({
			format : 'yyyy-mm-dd',
			autoclose : true
		});
	}, 0);
}
function renderBtn(cur) {
	var id = $.jgrid.getAccessor(cur, 'id');
	var title = $.jgrid.getAccessor(cur, 'name');
	var html = [];
	html.push('<a target="_blank" href="');
	html.push('javascript:preview(\'' + id + '\',\'' + title + '\')');
	html.push('"');
	html.push('><span class="badge badge-info">查看</span></a>');
	return html.join(' ');
}
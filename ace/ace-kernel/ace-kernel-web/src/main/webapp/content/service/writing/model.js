var _colNames = ['主键', '作品名称', '作者', '分类', '封面', '发表日期', '曾发表所在', '状态', '简介',		'正文', '操作'];var _colModel = function() {	return [			{				name : 'id',				editable : false,				hidden : true,				width : 100			},			{				name : 'name',				editable : true,				width : 200,				editoptions : {					size : "20",					maxlength : "50",					style : 'width:250px;'				},				formoptions : {					elmprefix : "",					elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"				},				editrules : {					required : true				}			},			{				name : 'author',				editable : true,				width : 100,				edittype : "combogrid",				dataoptions : {					panelWidth : 400,					idField : 'id',					textField : 'name',					url : contextPath + '/writer/selectAuthor.do',					mode : 'remote',					fitColumns : true,					method : 'get',					columns : [[{						field : 'id',						title : '用户编号',						width : 100					}, {						field : 'name',						title : '姓名',						width : 100					}]]				},				editoptions : {					style : 'height:25px'				},				renderer : function(value, cur) {					return $.jgrid.getAccessor(cur, 'authorName');				},				formoptions : {					elmprefix : "",					elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"				},				editrules : {					required : true				}			},			{				name : 'category',				editable : true,				hidden : true,				width : 100,				edittype : "select",				renderer : function(value) {					return rsd(value, "84");				},				editoptions : {					value : odparse("84")				}			},			{				name : 'image',				editable : true,				hidden : true,				width : 100,				editoptions : {					style : 'width:200px;',					maxlength : "200",					colspan : false				},				formoptions : {					elmprefix : "",					elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'></span>"				},				editrules : {					required : false				}			},			{				name : 'dateOfPublication',				editable : true,				width : 100,				formoptions : {					elmprefix : "",					elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"				},				editrules : {					required : true				},				edittype : "datebox",				dataoptions : {					formatter : function(date) {						var y = date.getFullYear();						var m = date.getMonth() + 1;						var d = date.getDate();						return y + '-' + (m < 10 ? ('0' + m) : m) + '-'								+ (d < 10 ? ('0' + d) : d);					},					parser : function(s) {						if (!s)							return new Date();						var ss = (s.split('-'));						var y = parseInt(ss[0], 10);						var m = parseInt(ss[1], 10);						var d = parseInt(ss[2], 10);						if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {							return new Date(y, m - 1, d);						} else {							return new Date();						}					}				},				renderer : function(value) {					return value == null ? "" : value.substring(0, 10);				}			},			{				name : 'everPublished',				editable : true,				hidden : true,				width : 100,				editoptions : {					size : "20",					maxlength : "50",					style : 'width:250px;'				},				formoptions : {					elmprefix : "",					elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'></span>"				},				editrules : {					required : false				}			},			{				name : 'status',				editable : true,				hidden : true,				width : 100,				edittype : "checkbox",				editoptions : {					value : "1:0"				},				unformat : aceSwitch,				renderer : function(value) {					var rst = "";					switch (value) {						case '1' :							rst = "YES";							break;						case '0' :							rst = "NO";							break;						default :							rst = "N/A";					}					return rst;				}			},			{				name : 'intro',				editable : true,				width : 100,				hidden : true,				editoptions : {					colspan : true,					style : 'width:100%;line-height: 25px;height: 100px;'				},				formoptions : {					elmprefix : "",					elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'></span>"				},				editrules : {					required : false				},				edittype : "textarea"			},			{				name : 'docText',				hidden : true,				width : 100,				editable : true,				editoptions : {					colspan : true,					style : 'width:750px;line-height: 25px;height: 400px;'				},				formoptions : {					elmprefix : "",					elmsuffix : "<span style='color:red;font-size:16px;font-weight:800'>*</span>"				},				editrules : {					required : true				},				edittype : "textarea"			}, {				name : 'opt',				width : 100,				sortable : false,				hidden : false,				editable : false,				renderer : function(value, cur) {					return renderBtn(cur);				}			}];}function aceSwitch(cellvalue, options, cell) {	console.log('aceSwitch');	setTimeout(function() {		$(cell).find('input[type=checkbox]').addClass(				'ace ace-switch ace-switch-5').after(				'<span class="lbl"></span>');	}, 0);}// enable datepickerfunction pickDate(cellvalue, options, cell) {	setTimeout(function() {		$(cell).find('input[type=text]').datepicker({			format : 'yyyy-mm-dd',			autoclose : true		});	}, 0);}function renderBtn(cur) {	var id = $.jgrid.getAccessor(cur, 'id');	var title = $.jgrid.getAccessor(cur, 'name');	var html = [];	html.push('<a target="_blank" href="');	html.push('javascript:preview(\'' + id + '\',\'' + title + '\')');	html.push('"');	html.push('><span class="badge badge-info">查看</span></a>');	return html.join(' ');}
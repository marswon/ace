var _colNames = ['主键', '姓名', '性别', '出生日期',  '形象照片','分类','状态','简介','详情', '阅读量', '状态', '创建人编号', '创建人姓名', '入库日期', '最后更新人编号', '最后更新人姓名', '最后更新时间','操作'];var _colModel = function() {    return [{        name: 'id',        width: 100,        hidden:true,        editable: false,        editoptions: {            readOnly:true        }    }    ,    {        name: 'name',        width: 100,        editable: true,        editoptions: {            size: "20",            maxlength: "50"        },        formoptions: {            elmprefix: "",            elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"        },        editrules: {            required: true        }    },    {        name: 'sex',        width: 100,        editable: true,        editoptions: {            size: "20",            maxlength: "50"        },        formoptions: {            elmprefix: "",            elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"        },        editrules: {            required: true        },        edittype : "select",        renderer : function(value) {            return rsd(value, "01");        },        editoptions : {            value : odparse("01")        }    },    {        name: 'birthday',        width: 100,        editable: true,        editoptions: {            size: "20",            maxlength: "50"        },        formoptions: {            elmprefix: "",            elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'></span>"        },        editrules: {            required: false        },        edittype : "datebox",        				editoptions : {        					style : 'height:25px'        				},        				dataoptions : {        					formatter : function(date) {        						var y = date.getFullYear();        						var m = date.getMonth() + 1;        						var d = date.getDate();        						return y + '-' + (m < 10 ? ('0' + m) : m) + '-'        								+ (d < 10 ? ('0' + d) : d);        					},        					parser : function(s) {        						if (!s)        							return new Date();        						var ss = (s.split('-'));        						var y = parseInt(ss[0], 10);        						var m = parseInt(ss[1], 10);        						var d = parseInt(ss[2], 10);        						if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {        							return new Date(y, m - 1, d);        						} else {        							return new Date();        						}        					}        				},        				renderer : function(value) {        					return value == null ? "" : value.substring(0, 10);        				}    },    {             name: 'photo',             width: 100,             hidden:true,             editable: true,             editoptions: {                 size: "20",                 maxlength: "50",                 style:'width:400px;'             },             formoptions: {                 elmprefix: "",                 elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"             },             editrules: {                 required: true             }         },             {                 name: 'category',                 width: 100,                 editable: true,                 editoptions: {                     size: "20",                     maxlength: "50"                 },                 formoptions: {                     elmprefix: "",                     elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"                 },                 editrules: {                     required: true                 },                 edittype : "select",                 renderer : function(value) {                      return rsd(value, "83");                 },                 editoptions : {                      value : odparse("83")                 }             },                  {                      name: 'status',                      width: 100,                      editable: true,                      formoptions: {                          elmprefix: "",                          elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"                      },                      editrules: {                          required: true                      }                      ,                      edittype : "checkbox",                      				editoptions : {                      					value : "1:0"                      				},                      				unformat : aceSwitch,                      				renderer : function(value) {                      					var rst = "";                      					switch (value) {                      					case '1':                      						rst = "YES";                      						break;                      					case '0':                      						rst = "NO";                      						break;                      					default:                      						rst = "N/A";                      					}                      					return rst;                      				}                  },    {        name: 'intro',        width: 100,        hidden:true,        editable: true,        editoptions: {            colspan:true,           style:'width:100%;line-height: 25px;height: 200px;'        },        formoptions: {            elmprefix: "",            elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"        },        editrules: {            required: true        },        edittype : "textarea"    },    {        name: 'descri',        width: 100,        hidden:true,        editable: true,        editoptions: {             colspan:true,             style:'width:100%;line-height: 25px;height: 100px;'        },        formoptions: {            elmprefix: "",            elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"        },        editrules: {            required: true        },         edittype : "textarea"    },    {        name: 'pcode',        width: 100,        hidden:true,        editable: false,        editoptions: {            size: "20",            maxlength: "50"        },        formoptions: {            elmprefix: "",            elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"        },        editrules: {            required: true        }    },    {        name: 'reading',        width: 100,        editable: false,        hidden:true,        editoptions: {            size: "20",            maxlength: "50"        },        formoptions: {            elmprefix: "",            elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"        },        editrules: {            required: true        }    },    {        name: 'createUserId',        width: 100,        hidden:true,        editable: false,        editoptions: {            size: "20",            maxlength: "50"        }    },    {        name: 'createUserName',        width: 100,        editable: false,        editoptions: {            size: "20",            maxlength: "50"        }    },    {        name: 'createDate',        width: 100,        editable: false,        editoptions: {            size: "20",            maxlength: "50"        }    },    {        name: 'lastModifyUserId',        width: 100,        hidden:true,        editable: false,        editoptions: {            size: "20",            maxlength: "50"        }    },    {        name: 'lastModifyUserName',        width: 100,        hidden:true,        editable: false,        editoptions: {            size: "20",            maxlength: "50"        }    },    {        name: 'lastModifyDate',        width: 100,        hidden:true,        editable: false,        editoptions: {            size: "20",            maxlength: "50"        },        formoptions: {            elmprefix: "",            elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"        },        editrules: {            required: true        }    },     {            name: 'opt',            width: 100,            hidden:false,            sortable:false,            editable: false,            renderer:function(value, cur){                return renderBtn(cur);            }        }    ];}function aceSwitch(cellvalue, options, cell) {    console.log('aceSwitch');    setTimeout(function() {        $(cell).find('input[type=checkbox]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');    },    0);}// enable datepickerfunction pickDate(cellvalue, options, cell) {    setTimeout(function() {        $(cell).find('input[type=text]').datepicker({            format: 'yyyy-mm-dd',            autoclose: true        });    },    0);}function renderBtn(cur) {	var id = $.jgrid.getAccessor(cur, 'id');	var title = $.jgrid.getAccessor(cur, 'name');	var html = [];	html.push('<a target="_blank" href="');	html.push('javascript:preview(\'' + id + '\',\'' + title + '\')');	html.push('"');	html.push('><span class="badge badge-info">查看</span></a>');	return html.join(' ');}
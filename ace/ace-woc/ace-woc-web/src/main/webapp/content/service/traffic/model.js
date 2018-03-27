var _colNames = ['主键', '记录卡点', '记录监控点', '检查时间', '地点', '车牌号', '方向', '轴数', '总重量', '超限', '超限率', '速度', '备注', '状态', '创建人编号', '创建人姓名', '入库日期', '最后更新人编号', '最后更新人姓名', '最后更新时间', '操作'];var _colModel = function () {    return [        {            name: 'id',            editable: false,            hidden: true,            width: 100        }        , {            name: 'siteId',            editable: true,            hidden: true,            width: 100,            edittype: "combogrid",            dataoptions: {                panelWidth: '300',                idField: 'id',                textField: 'siteName',                url: contextPath + '/site/selectSite',                mode: 'remote',                fitColumns: true,                onChange: function (newValue, oldValue) {                },                method: 'get',                columns: [[{                    field: 'siteCode',                    title: '卡点编码',                    width: 50                }, {                    field: 'siteName',                    title: '卡点名称',                    width: 100                }]]            },            editoptions: {                style: 'width:200px;height:25px;',            },            renderer: function (value, cur) {                return $.jgrid.getAccessor(cur, 'siteName');            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            },            editrules: {                required: true            }        }        , {            name: 'monitorSiteId',            editable: true,            width: 50,            edittype: "combobox",            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            dataoptions: {                idField: 'id',                textField: 'name',            }        }        , {            name: 'inspectTime',            editable: true,            width: 40,            edittype: "datebox",            dataoptions: {                formatter: function (date) {                    var y = date.getFullYear();                    var m = date.getMonth() + 1;                    var d = date.getDate();                    return y + '-' + (m < 10 ? ('0' + m) : m) + '-'                        + (d < 10 ? ('0' + d) : d);                },                parser: function (s) {                    if (!s)                        return new Date();                    var ss = (s.split('-'));                    var y = parseInt(ss[0], 10);                    var m = parseInt(ss[1], 10);                    var d = parseInt(ss[2], 10);                    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {                        return new Date(y, m - 1, d);                    } else {                        return new Date();                    }                }            },            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'locale',            editable: true,            width: 50,            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'plateNo',            editable: true,            width: 30,            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'direction',            editable: true,            width: 50,            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'axleCount',            editable: true,            width: 20,            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'totalMass',            editable: true,            width: 20,            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'overMass',            editable: true,            width: 20,            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'overRate',            editable: true,            width: 20,            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'speed',            editable: true,            width: 20,            editoptions: {                style: 'width:200px;height:25px',                maxlength: "50"            },        }        , {            name: 'remark',            editable: true,            hidden: true,            width: 100,            editoptions: {                style: 'width:600px;height:25px',                maxlength: "50",                colspan: true            },        }        , {            name: 'status',            hidden: true,            editable: false,            width: 100,            edittype: "checkbox",            editoptions: {                value: "1:0"            },            cellattr: function (rowId, val, rawObject, cm, rdata) {                if (rawObject.status == '0') {                    return "style='background:red;color:#fff'";                }                if (rawObject.status == '1') {                    return "style='background:#FF9224;color:#000000'";                }                if (rawObject.status == '2') {                    return "style='background:green;color:#fff'";                }                if (rawObject.status == '3') {                    return "style='background:#F9F900;color:#000000'";                }                if (rawObject.status == '4') {                    return "style='background:#FF9224;color:#000000'";                }            },            unformat: aceSwitch,            renderer: function (value) {                var rst = "";                switch (value) {                    case '1' :                        rst = "ON";                        break;                    case '0' :                        rst = "OFF";                        break;                    default :                        rst = "N/A";                }                return rst;            },            formoptions: {                elmprefix: "",                elmsuffix: "<span style='color:red;font-size:16px;font-weight:800'>*</span>"            }, editrules: {                required: true            }        }        , {            name: 'createUserId',            hidden: true,            editable: false,            width: 100        }        , {            name: 'createUserName',            hidden: true,            editable: false,            width: 100        }        , {            name: 'createDate',            hidden: true,            editable: false,            width: 100        }        , {            name: 'lastModifyUserId',            hidden: true,            editable: false,            width: 100        }        , {            name: 'lastModifyUserName',            hidden: true,            editable: false,            width: 100        }        , {            name: 'lastModifyDate',            hidden: true,            editable: false,            width: 100        }        ,        {            name: 'opt',            width: 20,            hidden: false,            editable: false,            sortable: false,            renderer: function (value, cur) {                return renderBtn(cur);            }        }    ];}function aceSwitch(cellvalue, options, cell) {    console.log('aceSwitch');    setTimeout(function () {        $(cell).find('input[type=checkbox]').addClass(            'ace ace-switch ace-switch-5').after(            '<span class="lbl"></span>');    }, 0);}// enable datepickerfunction pickDate(cellvalue, options, cell) {    setTimeout(function () {        $(cell).find('input[type=text]').datepicker({            format: 'yyyy-mm-dd',            autoclose: true        });    }, 0);}function renderBtn(cur) {    var id = $.jgrid.getAccessor(cur, 'id');    var title = $.jgrid.getAccessor(cur, 'name');    var html = [];    html.push('<a target="_blank" href="');    html.push('javascript:preview(\'' + id + '\',\'' + title + '\')');    html.push('"');    html.push('><span class="badge badge-info">查看</span></a>');    return html.join(' ');}
var cfg = {};
cfg.grid_load_data_url = portalPath + "/users/findDeIdByUsersList.do?seat=3";
cfg.grid_add_data_url = portalPath + "/users/insertUsers.do";
cfg.grid_edit_data_url = portalPath + "/users/updateUsers.do";
cfg.grid_delete_data_url = portalPath + "/users/deleteUsers.do";
cfg.grid_selector= "#grid-table";
cfg.pager_selector= "#grid-pager";
//cfg.caption= "参数";
cfg.rowNum= default_page_list[0];
cfg.dataId= 'id';
cfg.gridHeight=$(window).height()-layoutTopHeight;
cfg.jgridEditWinWidth=550;
cfg.jgridAlertWidth=400;
cfg.jgrdInfoDialogWidth=500;
if(cfg.gridHeight<100){
	cfg.gridHeight=250;
}
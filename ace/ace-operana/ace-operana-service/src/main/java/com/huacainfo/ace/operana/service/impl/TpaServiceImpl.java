package com.huacainfo.ace.operana.service.impl;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huacainfo.ace.common.model.UserProp;
import com.huacainfo.ace.common.result.MessageResponse;
import com.huacainfo.ace.common.result.PageResult;
import com.huacainfo.ace.common.result.SingleResult;
import com.huacainfo.ace.common.tools.CommonUtils;
import com.huacainfo.ace.operana.dao.MeetingDao;
import com.huacainfo.ace.operana.dao.TpaDao;
import com.huacainfo.ace.operana.model.Meeting;
import com.huacainfo.ace.operana.model.Tpa;
import com.huacainfo.ace.operana.service.TpaService;
import com.huacainfo.ace.operana.vo.TpaQVo;
import com.huacainfo.ace.operana.vo.TpaVo;
import com.huacainfo.ace.portal.service.DataBaseLogService;
@Service("tpaService")
public class TpaServiceImpl implements TpaService {
	Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private TpaDao tpaDao;
	@Autowired
	private MeetingDao meetingDao;
	@Autowired
	private DataBaseLogService dataBaseLogService;

	public PageResult<TpaVo> findTpaList(TpaQVo condition, int start, int limit, String orderBy) throws Exception {
		Meeting meeting = this.meetingDao.selectByPrimaryKey(condition.getMeetingId());
		int cwk = meeting.getCvalue();

		PageResult<TpaVo> rst = new PageResult<TpaVo>();
		List<TpaVo> list = this.tpaDao.findList(condition, start, start + limit, "wk" + cwk);
		rst.setRows(list);
		if (start <= 1) {
			int allRows = this.tpaDao.findCount(condition, "wk" + cwk);
			rst.setTotal(allRows);
		}
		return rst;
	}

	public MessageResponse insertTpa(Tpa o, UserProp userProp) throws Exception {
		// o.setId(UUID.randomUUID().toString());
		o.setId(String.valueOf(new Date().getTime()));
		if (CommonUtils.isBlank(o.getId())) {
			return new MessageResponse(1, "编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getMeetingId())) {
			return new MessageResponse(1, "会议编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getTopicId())) {
			return new MessageResponse(1, "议题编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getNormId())) {
			return new MessageResponse(1, "指标编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getProductId())) {
			return new MessageResponse(1, "产品编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getProbDiscri())) {
			return new MessageResponse(1, "问题描述不能为空！");
		}
		if (CommonUtils.isBlank(o.getProbAnsys())) {
			return new MessageResponse(1, "原因分析不能为空！");
		}
		if (CommonUtils.isBlank(o.getActions())) {
			return new MessageResponse(1, "改善措施不能为空！");
		}
		if (CommonUtils.isBlank(o.getLiable())) {
			return new MessageResponse(1, "责任人不能为空！");
		}
		if (CommonUtils.isBlank(o.getStatus())) {
			return new MessageResponse(1, "任务状态不能为空！");
		}
		int temp = this.tpaDao.isExit(o);
		if (temp > 0) {
			return new MessageResponse(1, "TOP问题分析名称重复！");
		}
		o.setStatus("1");
		o.setCreateUserName(userProp.getName());
		o.setCreateUserId(userProp.getUserId());
		this.tpaDao.insert(o);
		this.dataBaseLogService.log("添加TOP问题分析", "TOP问题分析", "", o.getNormId(), o.getNormId(), userProp);
		return new MessageResponse(0, "添加TOP问题分析完成！");
	}

	public MessageResponse updateTpa(Tpa o, UserProp userProp) throws Exception {
		int temp = this.tpaDao.isExit(o);
		if (temp <= 0) {
			return this.insertTpa(o, userProp);
		}
		if (CommonUtils.isBlank(o.getId())) {
			return new MessageResponse(1, "编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getMeetingId())) {
			return new MessageResponse(1, "会议编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getTopicId())) {
			return new MessageResponse(1, "议题编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getNormId())) {
			return new MessageResponse(1, "指标编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getProductId())) {
			return new MessageResponse(1, "产品编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getProbDiscri())) {
			return new MessageResponse(1, "问题描述不能为空！");
		}
		if (CommonUtils.isBlank(o.getProbAnsys())) {
			return new MessageResponse(1, "原因分析不能为空！");
		}
		if (CommonUtils.isBlank(o.getActions())) {
			return new MessageResponse(1, "改善措施不能为空！");
		}
		if (CommonUtils.isBlank(o.getLiable())) {
			return new MessageResponse(1, "责任人不能为空！");
		}
		if (CommonUtils.isBlank(o.getStatus())) {
			return new MessageResponse(1, "任务状态不能为空！");
		}

		o.setLastModifyUserName(userProp.getName());
		o.setLastModifyUserId(userProp.getUserId());
		this.tpaDao.updateByPrimaryKey(o);
		this.dataBaseLogService.log("变更TOP问题分析", "TOP问题分析", "", o.getNormId(), o.getNormId(), userProp);
		return new MessageResponse(0, "变更TOP问题分析完成！");
	}

	public SingleResult<Tpa> selectTpaByPrimaryKey(String id) throws Exception {
		SingleResult<Tpa> rst = new SingleResult<Tpa>();
		rst.setValue(this.tpaDao.selectByPrimaryKey(id));
		return rst;
	}

	public MessageResponse deleteTpaByTpaId(String id, UserProp userProp) throws Exception {
		this.tpaDao.deleteByPrimaryKey(id);
		this.dataBaseLogService.log("删除TOP问题分析", "TOP问题分析", String.valueOf(id), String.valueOf(id), "TOP问题分析",
				userProp);
		return new MessageResponse(0, "TOP问题分析删除完成！");
	}

	public PageResult<TpaVo> findTpaUserTaskList(TpaQVo condition, int start, int limit, String orderBy)
			throws Exception {
		PageResult<TpaVo> rst = new PageResult<TpaVo>();
		List<TpaVo> list = this.tpaDao.findListUserTask(condition, start, start + limit, orderBy);
		rst.setRows(list);
		if (start <= 1) {
			int allRows = this.tpaDao.findCountUserTask(condition, orderBy);
			rst.setTotal(allRows);
		}
		return rst;
	}

	public MessageResponse updateTpaById(Tpa o, UserProp userProp) throws Exception {

		if (CommonUtils.isBlank(o.getId())) {
			return new MessageResponse(1, "编码不能为空！");
		}

		if (CommonUtils.isBlank(o.getProductId())) {
			return new MessageResponse(1, "产品编码不能为空！");
		}
		if (CommonUtils.isBlank(o.getProbDiscri())) {
			return new MessageResponse(1, "问题描述不能为空！");
		}
		if (CommonUtils.isBlank(o.getProbAnsys())) {
			return new MessageResponse(1, "原因分析不能为空！");
		}
		if (CommonUtils.isBlank(o.getActions())) {
			return new MessageResponse(1, "改善措施不能为空！");
		}
		if (CommonUtils.isBlank(o.getStatus())) {
			return new MessageResponse(1, "任务状态不能为空！");
		}
		if (CommonUtils.isBlank(o.getCreateDate())) {
			return new MessageResponse(1, "实际完成时间不能为空！");
		}
		this.tpaDao.updateById(o);
		this.dataBaseLogService.log("执行任务", "任务执行", "", o.getNormId(), o.getNormId(), userProp);
		return new MessageResponse(0, "变更TOP问题分析完成！");
	}

}

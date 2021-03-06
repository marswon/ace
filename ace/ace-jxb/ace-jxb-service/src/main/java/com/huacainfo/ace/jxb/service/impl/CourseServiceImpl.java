package com.huacainfo.ace.jxb.service.impl;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.huacainfo.ace.common.tools.GUIDUtil;
import com.huacainfo.ace.common.tools.StringUtils;
import com.huacainfo.ace.jxb.dao.LiveDao;
import com.huacainfo.ace.portal.model.Users;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huacainfo.ace.common.model.UserProp;
import com.huacainfo.ace.common.result.MessageResponse;
import com.huacainfo.ace.common.result.PageResult;
import com.huacainfo.ace.common.result.SingleResult;
import com.huacainfo.ace.common.tools.CommonUtils;
import com.huacainfo.ace.jxb.dao.CourseDao;
import com.huacainfo.ace.jxb.model.Course;
import com.huacainfo.ace.portal.service.DataBaseLogService;
import com.huacainfo.ace.jxb.service.CourseService;
import com.huacainfo.ace.jxb.vo.CourseVo;
import com.huacainfo.ace.jxb.vo.CourseQVo;

@Service("courseService")
/**
 * @author: lcan
 * @version: 2018-04-08
 * @Description: TODO(课程)
 */
public class CourseServiceImpl implements CourseService {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private DataBaseLogService dataBaseLogService;

    @Autowired
    private LiveDao jxbDao;

    /**
     * @throws
     * @Title:find!{bean.name}List
     * @Description: TODO(课程分页查询)
     * @param: @param condition
     * @param: @param start
     * @param: @param limit
     * @param: @param orderBy
     * @param: @throws Exception
     * @return: PageResult<CourseVo>
     * @author: lcan
     * @version: 2018-04-08
     */
    @Override
    public PageResult<CourseVo> findCourseList(CourseQVo condition, int start,
                                               int limit, String orderBy) throws Exception {
        PageResult<CourseVo> rst = new PageResult<CourseVo>();
        List<CourseVo> list = this.courseDao.findList(condition,
                start, start + limit, orderBy);
        rst.setRows(list);
        if (start <= 1) {
            int allRows = this.courseDao.findCount(condition);
            rst.setTotal(allRows);
        }
        return rst;
    }

    /**
     * @throws
     * @Title:insertCourse
     * @Description: TODO(添加课程)
     * @param: @param o
     * @param: @param userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: lcan
     * @version: 2018-04-08
     */
    @Override
    public MessageResponse insertCourse(Course o, UserProp userProp)
            throws Exception {
        o.setId(GUIDUtil.getGUID());
        //o.setId(String.valueOf(new Date().getTime()));
        if (CommonUtils.isBlank(o.getId())) {
            return new MessageResponse(1, "主键不能为空！");
        }
        if (CommonUtils.isBlank(o.getCategory())) {
            return new MessageResponse(1, "课程类别不能为空！");
        }
        if (CommonUtils.isBlank(o.getMediType())) {
            return new MessageResponse(1, "媒体类别不能为空！");
        }
        if (CommonUtils.isBlank(o.getName())) {
            return new MessageResponse(1, "课程名称不能为空！");
        }
        if (CommonUtils.isBlank(o.getIntroduce())) {
            return new MessageResponse(1, "课程介绍不能为空！");
        }
        if (CommonUtils.isBlank(o.getCover())) {
            return new MessageResponse(1, "课程封面不能为空！");
        }
        if (CommonUtils.isBlank(o.getMediUrl())) {
            return new MessageResponse(1, "播放地址不能为空！");
        }
        if (CommonUtils.isBlank(o.getCostType())) {
            return new MessageResponse(1, "费用类型不能为空！");
        }
        if (CommonUtils.isBlank(o.getDemandNum())) {
            return new MessageResponse(1, "点播次数不能为空！");
        }
        if (CommonUtils.isBlank(o.getLikeNum())) {
            return new MessageResponse(1, "点赞次数不能为空！");
        }
        int temp = this.courseDao.isExit(o);
        if (temp > 0) {
            return new MessageResponse(1, "课程名称重复！");
        }
        o.setCreateDate(new Date());
        o.setStatus("1");
        //o.setCreateUserName(userProp.getName());
        o.setCreateUserId(userProp.getUserId());
        this.courseDao.insert(o);
        this.dataBaseLogService.log("添加课程", "课程", "", o.getName(),
                o.getName(), userProp);
        return new MessageResponse(0, "添加课程完成！");
    }

    /**
     * @throws
     * @Title:updateCourse
     * @Description: TODO(更新课程)
     * @param: @param o
     * @param: @param userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: lcan
     * @version: 2018-04-08
     */
    @Override
    public MessageResponse updateCourse(Course o, UserProp userProp)
            throws Exception {
        if (CommonUtils.isBlank(o.getId())) {
            return new MessageResponse(1, "主键不能为空！");
        }
        if (CommonUtils.isBlank(o.getCategory())) {
            return new MessageResponse(1, "课程类别不能为空！");
        }
        if (CommonUtils.isBlank(o.getMediType())) {
            return new MessageResponse(1, "媒体类别不能为空！");
        }
        if (CommonUtils.isBlank(o.getName())) {
            return new MessageResponse(1, "课程名称不能为空！");
        }
        if (CommonUtils.isBlank(o.getIntroduce())) {
            return new MessageResponse(1, "课程介绍不能为空！");
        }
        if (CommonUtils.isBlank(o.getCover())) {
            return new MessageResponse(1, "课程封面不能为空！");
        }
        if (CommonUtils.isBlank(o.getMediUrl())) {
            return new MessageResponse(1, "播放地址不能为空！");
        }
        if (CommonUtils.isBlank(o.getCostType())) {
            return new MessageResponse(1, "费用类型不能为空！");
        }
        if (CommonUtils.isBlank(o.getDemandNum())) {
            return new MessageResponse(1, "点播次数不能为空！");
        }
        if (CommonUtils.isBlank(o.getLikeNum())) {
            return new MessageResponse(1, "点赞次数不能为空！");
        }

        o.setCreateDate(new Date());
        //	o.setLastModifyUserName(userProp.getName());
        o.setCreateUserId(userProp.getUserId());
        this.courseDao.updateByPrimaryKey(o);
        this.dataBaseLogService.log("变更课程", "课程", "", o.getName(),
                o.getName(), userProp);
        return new MessageResponse(0, "变更课程完成！");
    }

    /**
     * @throws
     * @Title:selectCourseByPrimaryKey
     * @Description: TODO(获取课程)
     * @param: @param id
     * @param: @throws Exception
     * @return: SingleResult<Course>
     * @author: lcan
     * @version: 2018-04-08
     */
    @Override
    public SingleResult<CourseVo> selectCourseByPrimaryKey(String id) throws Exception {
        SingleResult<CourseVo> rst = new SingleResult<CourseVo>();
        rst.setValue(this.courseDao.selectByPrimaryKey(id));
        return rst;
    }

    /**
     * @throws
     * @Title:deleteCourseByCourseId
     * @Description: TODO(删除课程)
     * @param: @param id
     * @param: @param userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: lcan
     * @version: 2018-04-08
     */
    @Override
    public MessageResponse deleteCourseByCourseId(String id,
                                                  UserProp userProp) throws Exception {
        this.courseDao.deleteByPrimaryKey(id);
        this.dataBaseLogService.log("删除课程", "课程", String.valueOf(id),
                String.valueOf(id), "课程", userProp);
        return new MessageResponse(0, "课程删除完成！");
    }


    /**
     * @throws
     * @Title:getLiveList
     * @Description: TODO(微网页获取直播列表)
     * @param: @param p
     * @param: @throws Exception
     * @return: List<Map<String,Object>>
     * @author: 陈晓克
     * @version: 2018-01-01
     */
    @Override
    public Map<String, Object> getCourseList(String userId, int page, Map<String, Object> p) {
        Map<String, Object> rst = this.courseDao.getCourseTotalNum(userId);
        Long totalNum = (Long) rst.get("totalNum");
        Long totalpage = this.calPage(totalNum, 10);
        rst.put("data", this.courseDao.getCourseList(p));
        rst.put("currentpage", page);
        rst.put("pagecount", totalNum);
        rst.put("status", 0);
        rst.put("totalcount", totalNum);
        rst.put("totalpage", totalpage);
        return rst;
    }



    private Long calPage(Long totalNum, int defaultPageSize) {
        Long totalpage = new Long(1);
        if (totalNum % defaultPageSize == 0) {
            totalpage = totalNum / defaultPageSize;
        } else {
            totalpage = (totalNum / defaultPageSize) + 1;
        }
        return totalpage;
    }

}

package com.huacainfo.ace.jxb.service;
import com.huacainfo.ace.common.model.UserProp;
import com.huacainfo.ace.common.result.MessageResponse;
import com.huacainfo.ace.common.result.PageResult;
import com.huacainfo.ace.common.result.SingleResult;
import com.huacainfo.ace.jxb.model.Course;
import com.huacainfo.ace.jxb.vo.CourseVo;
import com.huacainfo.ace.jxb.vo.CourseQVo;

import java.util.Map;

/**
 * @author: lcan
 * @version: 2018-04-08
 * @Description:  TODO(课程)
 */
public interface CourseService {
    /**
	 *
	    * @Title:find!{bean.name}List
	    * @Description:  TODO(课程分页查询)
	 		* @param:        @param condition
	 		* @param:        @param start
	 		* @param:        @param limit
	 		* @param:        @param orderBy
	 		* @param:        @throws Exception
	 		* @return:       PageResult<CourseVo>
	 		* @throws
	    * @author: lcan
	    * @version: 2018-04-08
	 */
	public abstract PageResult<CourseVo> findCourseList(CourseQVo condition, int start, int limit, String orderBy) throws Exception;

    /**
	 *
	    * @Title:insertCourse
	    * @Description:  TODO(添加课程)
	 		* @param:        @param obj
	 		* @param:        @param userProp
	 		* @param:        @throws Exception
	 		* @return:       MessageResponse
	 		* @throws
	    * @author: lcan
	    * @version: 2018-04-08
	 */
	public abstract MessageResponse insertCourse(Course obj,UserProp userProp) throws Exception;

    /**
	 *
	    * @Title:updateCourse
	    * @Description:  TODO(更新课程)
	 		* @param:        @param obj
	 		* @param:        @param userProp
	 		* @param:        @throws Exception
	 		* @return:       MessageResponse
	 		* @throws
	    * @author: lcan
	    * @version: 2018-04-08
	 */
	public abstract MessageResponse updateCourse(Course obj,UserProp userProp) throws Exception;
    /**
	 *
	    * @Title:selectCourseByPrimaryKey
	    * @Description:  TODO(获取课程)
	 		* @param:        @param id
	 		* @param:        @throws Exception
	 		* @return:       SingleResult<Course>
	 		* @throws
	    * @author: lcan
	    * @version: 2018-04-08
	 */
	public abstract SingleResult<CourseVo> selectCourseByPrimaryKey(String id) throws Exception;
    /**
	 *
	    * @Title:deleteCourseByCourseId
	    * @Description:  TODO(删除课程)
	 		* @param:        @param id
	 		* @param:        @param  userProp
	 		* @param:        @throws Exception
	 		* @return:       MessageResponse
	 		* @throws
	    * @author: lcan
	    * @version: 2018-04-08
	 */
	public abstract MessageResponse deleteCourseByCourseId(String id,UserProp userProp) throws Exception;

	/*

	  * @throws
			  * @Title:getCourseList
     * @Description: TODO(微网页获取课程列表)
     * @param: @param p
     * @param: @throws Exception
     * @return: List<Map<String,Object>>
     * @author: 陈晓克
     * @version: 2018-04-15
	*/
	Map<String, Object> getCourseList(String userId, int page, Map<String, Object> p) throws Exception;


}

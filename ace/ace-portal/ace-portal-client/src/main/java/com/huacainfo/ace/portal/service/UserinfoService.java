package com.huacainfo.ace.portal.service;

import com.huacainfo.ace.common.model.UserProp;
import com.huacainfo.ace.common.result.MessageResponse;
import com.huacainfo.ace.common.result.PageResult;
import com.huacainfo.ace.common.result.SingleResult;
import com.huacainfo.ace.common.model.Userinfo;
import com.huacainfo.ace.portal.vo.UserinfoVo;
import com.huacainfo.ace.portal.vo.UserinfoQVo;

/**
 * @author: 陈晓克
 * @version: 2017-12-29
 * @Description: TODO(微信用户)
 */
public interface UserinfoService {
    /**
     * @throws
     * @Title:find!{bean.name}List
     * @Description: TODO(微信用户分页查询)
     * @param: @param condition
     * @param: @param start
     * @param: @param limit
     * @param: @param orderBy
     * @param: @throws Exception
     * @return: PageResult<UserinfoVo>
     * @author: 陈晓克
     * @version: 2017-12-29
     */
    public abstract PageResult<UserinfoVo> findUserinfoList(UserinfoQVo condition, int start, int limit, String orderBy) throws Exception;

    /**
     * @throws
     * @Title:insertUserinfo
     * @Description: TODO(添加微信用户)
     * @param: @param obj
     * @param: @param userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: 陈晓克
     * @version: 2017-12-29
     */
    public abstract MessageResponse insertUserinfo(Userinfo obj, UserProp userProp) throws Exception;

    /**
     * @throws
     * @Title:updateUserinfo
     * @Description: TODO(更新微信用户)
     * @param: @param obj
     * @param: @param userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: 陈晓克
     * @version: 2017-12-29
     */
    public abstract MessageResponse updateUserinfo(Userinfo obj, UserProp userProp) throws Exception;

    /**
     * @throws
     * @Title:selectUserinfoByPrimaryKey
     * @Description: TODO(获取微信用户)
     * @param: @param id
     * @param: @throws Exception
     * @return: SingleResult<Userinfo>
     * @author: 陈晓克
     * @version: 2017-12-29
     */
    public abstract SingleResult<UserinfoVo> selectUserinfoByPrimaryKey(String id) throws Exception;

    /**
     * @throws
     * @Title:deleteUserinfoByUserinfoId
     * @Description: TODO(删除微信用户)
     * @param: @param id
     * @param: @param  userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: 陈晓克
     * @version: 2017-12-29
     */
    public abstract MessageResponse deleteUserinfoByUserinfoId(String id, UserProp userProp) throws Exception;


}

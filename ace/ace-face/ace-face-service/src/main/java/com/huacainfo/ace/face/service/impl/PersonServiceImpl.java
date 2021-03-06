package com.huacainfo.ace.face.service.impl;


import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huacainfo.ace.common.model.UserProp;
import com.huacainfo.ace.common.result.MessageResponse;
import com.huacainfo.ace.common.result.PageResult;
import com.huacainfo.ace.common.result.SingleResult;
import com.huacainfo.ace.common.tools.CommonUtils;
import com.huacainfo.ace.face.dao.PersonDao;
import com.huacainfo.ace.face.model.Person;
import com.huacainfo.ace.portal.service.DataBaseLogService;
import com.huacainfo.ace.face.service.PersonService;
import com.huacainfo.ace.face.vo.PersonVo;
import com.huacainfo.ace.face.vo.PersonQVo;

@Service("personService")
/**
 * @author: 陈晓克
 * @version: 2017-11-25
 * @Description: TODO(人脸建档)
 */
public class PersonServiceImpl implements PersonService {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private PersonDao personDao;
    @Autowired
    private DataBaseLogService dataBaseLogService;

    /**
     * @throws
     * @Title:find!{bean.name}List
     * @Description: TODO(人脸建档分页查询)
     * @param: @param condition
     * @param: @param start
     * @param: @param limit
     * @param: @param orderBy
     * @param: @throws Exception
     * @return: PageResult<PersonVo>
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public PageResult<PersonVo> findPersonList(PersonQVo condition, int start,
                                               int limit, String orderBy) throws Exception {
        PageResult<PersonVo> rst = new PageResult<PersonVo>();
        List<PersonVo> list = this.personDao.findList(condition,
                start, start + limit, orderBy);
        rst.setRows(list);
        if (start <= 1) {
            int allRows = this.personDao.findCount(condition);
            rst.setTotal(allRows);
        }
        return rst;
    }

    /**
     * @throws
     * @Title:insertPerson
     * @Description: TODO(添加人脸建档)
     * @param: @param o
     * @param: @param userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public MessageResponse insertPerson(Person o, UserProp userProp)
            throws Exception {
        o.setId(UUID.randomUUID().toString());
        //o.setId(String.valueOf(new Date().getTime()));
        if (CommonUtils.isBlank(o.getId())) {
            return new MessageResponse(1, "主键不能为空！");
        }
        if (CommonUtils.isBlank(o.getName())) {
            return new MessageResponse(1, "姓名不能为空！");
        }

        int temp = this.personDao.isExit(o);
        if (temp > 0) {
            return new MessageResponse(1, "人脸建档名称重复！");
        }
        o.setCreateDate(new Date());
        o.setStatus("1");
        o.setCreateUserName(userProp.getName());
        o.setCreateUserId(userProp.getUserId());
        this.personDao.insert(o);
        this.dataBaseLogService.log("添加人脸建档", "人脸建档", "", o.getName(),
                o.getName(), userProp);
        return new MessageResponse(0, "添加人脸建档完成！");
    }

    /**
     * @throws
     * @Title:updatePerson
     * @Description: TODO(更新人脸建档)
     * @param: @param o
     * @param: @param userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public MessageResponse updatePerson(Person o, UserProp userProp)
            throws Exception {
        if (CommonUtils.isBlank(o.getId())) {
            return new MessageResponse(1, "主键不能为空！");
        }
        if (CommonUtils.isBlank(o.getName())) {
            return new MessageResponse(1, "姓名不能为空！");
        }

        o.setLastModifyDate(new Date());
        o.setLastModifyUserName(userProp.getName());
        o.setLastModifyUserId(userProp.getUserId());
        o.setStatus("1");
        this.personDao.updateByPrimaryKey(o);
        this.dataBaseLogService.log("变更人脸建档", "人脸建档", "", o.getName(),
                o.getName(), userProp);
        return new MessageResponse(0, "变更人脸建档完成！");
    }

    /**
     * @throws
     * @Title:selectPersonByPrimaryKey
     * @Description: TODO(获取人脸建档)
     * @param: @param id
     * @param: @throws Exception
     * @return: SingleResult<Person>
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public SingleResult<PersonVo> selectPersonByPrimaryKey(String id) throws Exception {
        SingleResult<PersonVo> rst = new SingleResult<PersonVo>();
        rst.setValue(this.personDao.selectByPrimaryKey(id));
        return rst;
    }

    /**
     * @throws
     * @Title:deletePersonByPersonId
     * @Description: TODO(删除人脸建档)
     * @param: @param id
     * @param: @param userProp
     * @param: @throws Exception
     * @return: MessageResponse
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public MessageResponse deletePersonByPersonId(String id,
                                                  UserProp userProp) throws Exception {
        this.personDao.deleteByPrimaryKey(id);
        this.dataBaseLogService.log("删除人脸建档", "人脸建档", String.valueOf(id),
                String.valueOf(id), "人脸建档", userProp);
        return new MessageResponse(0, "人脸建档删除完成！");
    }
    /**
     *
     * @Title:updatePersonFaceToken
     * @Description:  TODO(更新faceToken)
     * @param:        @param id
     * @param:        @param faceFoken
     * @param:        @param  userProp
     * @param:        @throws Exception
     * @return:       MessageResponse
     * @throws
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public  MessageResponse updatePersonFaceToken(String id,String faceFoken,UserProp userProp) throws Exception{
        this.personDao.updatePersonFaceToken(id,faceFoken);
        this.dataBaseLogService.log("更新faceToken", "人脸建档", String.valueOf(id),
                String.valueOf(id), "人脸建档", userProp);
        return new MessageResponse(0, "更新faceToken成功！");
    }
    /**
     *
     * @Title:updatePersonAttributes
     * @Description:  TODO(跟新检测结果)
     * @param:        @param id
     * @param:        @param attributes
     * @param:        @param  userProp
     * @param:        @throws Exception
     * @return:       MessageResponse
     * @throws
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public  MessageResponse updatePersonAttributes(String id,String attributes,UserProp userProp) throws Exception{
        this.personDao.updatePersonAttributes(id,attributes);
        this.dataBaseLogService.log("更新检测结果", "人脸建档", String.valueOf(id),
                String.valueOf(id), "人脸建档", userProp);
        return new MessageResponse(0, "更新检测结果成功！");
    }

    /**
     *
     * @Title:updatePersonAttributes
     * @Description:  TODO(跟新检测结果)
     * @param:        @param id
     * @param:        @param attributes
     * @param:        @param  userProp
     * @param:        @throws Exception
     * @return:       MessageResponse
     * @throws
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public  MessageResponse updatePersonFaceTokenAttributes(String id,String faceFoken,String attributes,UserProp userProp) throws Exception{
        this.personDao.updatePersonFaceTokenAttributes(id,faceFoken,attributes);
        this.dataBaseLogService.log("更新检测结果", "人脸建档", String.valueOf(id),
                String.valueOf(id), "人脸建档", userProp);
        return new MessageResponse(0, "更新检测结果成功！");
    }

    /**
     *
     * @Title:updatePersonStatus
     * @Description:  TODO(更新状态)
     * @param:        @param id
     * @param:        @param status
     * @param:        @param  userProp
     * @param:        @throws Exception
     * @return:       MessageResponse
     * @throws
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public  MessageResponse updatePersonStatus(String id,String status,UserProp userProp) throws Exception{
        this.personDao.updatePersonStatus(id,status);
        this.dataBaseLogService.log("更新状态", "人脸建档", String.valueOf(id),
                String.valueOf(id), "人脸建档", userProp);
        return new MessageResponse(0, "更新状态成功！");
    }

    /**
     *
     * @Title:selectListByFaceTokens
     * @Description:  TODO(根据faceToken搜索人员信息)
     * @param:        @param faceTokens
     * @param:        @throws Exception
     * @return:       MessageResponse
     * @throws
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public  List<Map<String,Object>> selectListByFaceTokens(String[] faceTokens) throws Exception{
        return this.personDao.selectListByFaceTokens(faceTokens);
    }

    /**
     *
     * @Title:updatePersonAllStatus
     * @Description:  TODO(更新状态)
     * @param:        @param status
     * @param:        @param  userProp
     * @param:        @throws Exception
     * @return:       MessageResponse
     * @throws
     * @author: 陈晓克
     * @version: 2017-11-25
     */
    @Override
    public  MessageResponse updatePersonAllStatus(String status,UserProp userProp) throws Exception{
        this.personDao.updatePersonAllStatus(status);
        this.dataBaseLogService.log("更新状态", "人脸建档", "all",
                "all", "人脸建档", userProp);
        return new MessageResponse(0, "移除成功！");
    }
}

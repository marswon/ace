package com.huacainfo.ace.jxb.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import com.huacainfo.ace.jxb.model.LiveMsg;
import com.huacainfo.ace.jxb.vo.LiveMsgQVo;
import com.huacainfo.ace.jxb.vo.LiveMsgVo;

public interface LiveMsgDao {
    int deleteByPrimaryKey(String LiveMsgId);

    int insert(LiveMsg record);


    LiveMsgVo selectByPrimaryKey(String LiveMsgId);


    int updateByPrimaryKey(@Param("id") String id, @Param("status") String status);

    List<LiveMsgVo> findList(@Param("condition") LiveMsgQVo condition,
                             @Param("start") int start, @Param("limit") int limit,
                             @Param("orderBy") String orderBy);

    int findCount(@Param("condition") LiveMsgQVo condition);

    int isExit(LiveMsg record);

}
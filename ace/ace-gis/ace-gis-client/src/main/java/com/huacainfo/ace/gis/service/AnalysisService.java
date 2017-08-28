package com.huacainfo.ace.gis.service;

import java.util.Map;

import com.huacainfo.ace.common.result.ListResult;
import com.huacainfo.ace.common.result.MessageResponse;

public interface AnalysisService {
	public abstract ListResult<Map<String,Object>> query(
			Map<String,Object> condition,String reportId,int start,int limit)
			throws Exception;
}

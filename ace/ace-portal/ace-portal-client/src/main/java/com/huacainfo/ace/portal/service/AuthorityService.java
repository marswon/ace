package com.huacainfo.ace.portal.service;

import com.huacainfo.ace.common.model.WxUser;
import com.huacainfo.ace.common.result.MessageResponse;
import com.huacainfo.ace.common.result.SingleResult;
import java.util.Map;

public interface AuthorityService {

	public abstract SingleResult<Map<String,String>> authority(String appid,String appsecret,String code,String encryptedData,String iv,String latitude,String longitude) throws Exception;
	public abstract MessageResponse reg(WxUser wxUser) throws Exception;
	
}

package com.huacainfo.ace.rvc.kedapi.vrs;

import com.huacainfo.ace.common.tools.JsonUtil;
import com.huacainfo.ace.common.tools.StringUtils;
import com.huacainfo.ace.rvc.kedapi.authorize.AuthorizeApi;
import com.huacainfo.ace.rvc.kedapi.common.base.BaseApi;
import com.huacainfo.ace.rvc.kedapi.common.kits.CommonKit;
import com.huacainfo.ace.rvc.kedapi.common.kits.HttpKit;
import com.huacainfo.ace.rvc.kedapi.common.kits.UrlKit;
import com.huacainfo.ace.rvc.kedapi.vrs.model.LiveBroadcast;
import com.huacainfo.ace.rvc.kedapi.vrs.model.LiveRoomResp;
import com.huacainfo.ace.rvc.kedapi.vrs.model.LocalLoginResp;
import com.huacainfo.ace.rvc.kedapi.vrs.model.program.FolderResp;
import com.huacainfo.ace.rvc.kedapi.vrs.model.program.ProgramDetail;
import com.huacainfo.ace.rvc.kedapi.vrs.model.program.ProgramListResp;
import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;

/**
 * 科达录播系统
 * Created by Arvin on 2017/11/29.
 */
public class VRSApi extends BaseApi {
    private static Logger logger = Logger.getLogger(VRSApi.class);


    /**
     * 名称	获取节目列表
     * URI	/api/v1/vrs/program
     * 方法	GET
     * 说明	获取节目列表
     */
    public static ProgramListResp getProgramList(String keyWords, String token, String cookies) {
        Map<String, Object> params = new HashMap<>();
        params.put("account_token", token);
        params.put("folderid", 1);
        params.put("prgs1page", 10);
        params.put("pageid", 1);
        params.put("includename", keyWords);
//        params.put("prgtypemask",0);
        String response = HttpKit.doGet(AuthorizeApi.VRS_URI + "/api/v1/vrs/program"
                , UrlKit.getUrlParamsByMap(params),
                cookies);
        logger.debug("VRSApi.getProgramList:" + response);
        if (JsonUtil.toMap(response).get("success") == 1) {
            ProgramListResp resp = JsonUtil.toObject(response, ProgramListResp.class);
            ProgramDetail detail = resp.getPrginfo().get(0).getPrgdetail().get(0);
            //ip/relativepath/prgname
            resp.setFileUrl(AuthorizeApi.VRS_URI + detail.getRelativepath() + detail.getPrgname());

            return resp;
        } else
            return null;

    }

    /**
     * 名称	获取文件夹列表
     * URI	/api/v1/vrs/program_folder
     * 方法	GET
     * 说明	获取文件夹列表
     */
    public static FolderResp getProgramFolder(String token, String cookies) {
        String response = HttpKit.doGet(AuthorizeApi.VRS_URI + "/api/v1/vrs/program_folder"
                , "account_token=" + token,
                cookies);

        logger.debug("VRSApi.getProgramFolder:" + response);

        return JsonUtil.toObject(response, FolderResp.class);
    }

    /**
     * 名称	本地用户登录
     * URI	/api/v1/vrs/login
     * 方法	POST
     * 说明	本地用户登录
     *
     * @param token    登陆token -- 平台那边获取的token
     *                 **请求内容，以JSON形式发送，需进行UrlEncode
     * @param userName 账号
     * @param password 密码
     * @return cookies
     */
    public static LocalLoginResp localLogin(String token, String userName, String password) {
//        {
//            "username": "admin",
//                "psd": "admin"
//        }
        Map<String, String> params = new HashMap<>();
        params.put("username", userName);
        params.put("psd", password);
        String encode = CommonKit.encode(JsonUtil.toJson(params));
        Map<String, String> rtnMap = HttpKit.doPost(AuthorizeApi.VRS_URI + "/api/v1/vrs/login"
                , "account_token=" + token + "&params=" + encode
                , "");
        logger.debug("params=" + params + ", VRSApi.login:{}" + rtnMap.toString());

        return JsonUtil.toObject(rtnMap.get("resp"), LocalLoginResp.class);
    }

    /**
     * 名称	获取直播室列表
     * URI	/api/v1/vrs/liveroom
     * 方法	GET
     * 说明	获取直播室列表
     *
     * @param token    授权token
     * @param keyWords 搜索关键字
     * @param cookies  携带cookies信息
     * @return
     */
    public static LiveRoomResp getLiveRoomList(String token, String keyWords, String cookies) {
        Map<String, Object> params = new HashMap<>();
        params.put("account_token", token);//登陆token
        params.put("prgs1page", 5);//每个页面显示节目数 默认显示20个节目
        params.put("pageid", 1);//请求的页码 默认显示第1页
        params.put("includename", keyWords);//搜索字符
        /**
         * 排序引索 默认为按创建时间升序
         1-名称；
         2-创建时间；
         7-热度（节目点播次数）；
         */
        params.put("orderindex", 2);
        /**
         * 	升降序 默认为0，无orderindex则不生效
         0-升；
         1-降；
         */
        params.put("desc", 1);

        String response = HttpKit.doGet(AuthorizeApi.VRS_URI + "/api/v1/vrs/liveroom"
                , UrlKit.getUrlParamsByMap(params)
                , cookies);
        logger.debug("keyWords<" + keyWords + "> ,VRSApi.getLiveRoomList:" + response);

        if (StringUtils.isEmpty(response)) {
            return null;
        }
        return JsonUtil.toObject(response, LiveRoomResp.class);
    }

    /**
     * 获取直播地址 m3u8文件
     *
     * @param liveRoom ‘获取直播室列表’接口返回数据
     * @return 可直播的m3u8文件URL地址
     */
    public static String getLiveURL(LiveRoomResp liveRoom) {
        if (null == liveRoom || CollectionUtils.isEmpty(liveRoom.getRoomstate())
                || null == liveRoom.getRoomstate().get(0)) {
            return "";
        }

        String jsonPath = liveRoom.getRoomstate().get(0).getLivestreampath();
        jsonPath = AuthorizeApi.VRS_URI + jsonPath;

        String jsonData = HttpKit.loadJson(jsonPath, StringUtils.CHARSET_NAME);
        LiveBroadcast liveBroadcast = JsonUtil.toObject(jsonData, LiveBroadcast.class);

        return AuthorizeApi.VRS_URI + liveBroadcast.getProList().get(0).getIndexList().get(0).getHlsIndex();
    }
}

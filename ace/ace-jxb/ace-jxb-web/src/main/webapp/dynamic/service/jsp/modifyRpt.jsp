<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container_model">
    <div class="formRow">
        <div class="titles">报道内容<span class="font-right">0/300</span></div>
        <div class="formRow-content">
            <textarea rows="6" class="content form-control"></textarea>
        </div>
    </div>
    <div class="formRow">
        <div class="titles">所属现场</div>
        <div class="formRow-content">
            <input type="text" onlyread class="jxbname form-control" disabled="">
        </div>
    </div>
    <div class="formRow">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-left: 0px">
            <div class="titles">记者</div>
            <div class="formRow-content">
                <input type="text" onlyread class="nickName form-control" disabled="">
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-right: 0px;">
            <div class="titles">发布时间</div>
            <div class="formRow-content">
                <input type="text" id="createTime" class="createTime form-control ">
            </div>
        </div>
    </div>
    <div class="container-fluid btn-container">
        <button type="button" class="release btn btn-success">发布报道</button>
        <span class="prompt"></span></div>
</div>
<div class="container_model container_right">
    <div class="formRow">
        <div class="titles">报道类型</div>
        <div class="formRow-content">
            <div>
                <label class="label3">
                    <input name="category" type="radio" value="2" checked>
                    图文报道 </label>
                <label class="label3">
                    <input name="category" type="radio" value="1">
                    视频报道 </label>
                <label class="label3">
                    <input name="category" type="radio" value="3">
                    音频报道 </label>
            </div>
        </div>
    </div>

    <div class="formRow formRowImg">
        <ul class="reportImageUploadList">
            <li class="Iupbtn">
                <div class="uploadText" id="Iupbtn">
                    <p class="imgiocn"><i class="iconfont">&#xe648;</i></p>
                    <p class="uploadImagePloadprogress">点击上传图片</p>
                </div>
            </li>
        </ul>
    </div>

    <div class="formRow formRowVdo">
        <div class="reportVideoUploadList" id="Vupbtn">
            <div class="viewPicture">
                <video src=''></video>
            </div>
            <div class="uploadText">
                <p class="imgiocn"><i class="iconfont">&#xe64a;</i></p>
                <p class="uploadVideoPloadprogress">点击上传视频</p>
            </div>
            <span class="removeIcon removeVideo"><i class="iconfont">&#xe628;</i></span>
        </div>
    </div>
</div>
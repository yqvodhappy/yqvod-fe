/*
* @Author: Dtvikey
* @Date:   2019-11-11 20:38:27
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-12 17:32:52
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
var _vv             = require('util/vv.js');
var _film           = require('service/film-service.js');
var templateIndex   = require('./index.string');


var page = {
    data : {
        filmId : _vv.getUrlParam('filmId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //如果没有传filmId,自动跳回首页
        if (!this.data.filmId) {
            _vv.goHome();
        }
        this.loadDetail();    
    },
    bindEvent : function(){
        var _this = this;
    },
    // 加载影片详细数据
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _film.getFilmDetail(this.data.filmId, function(res){
                _this.filter(res);
                // 缓存住detail的数据
                _this.data.detailInfo = res;
                // render
               html = _vv.renderHtml(templateIndex, res);
               $pageWrap.html(html);

            }, function(errMsg){
               $pageWrap.html('<p class="err-tip">此影片太淘气，找不到了</p>');
        });
    },
    //数据匹配
    filter : function(data){
        data.filmUrl = 'http://www.yqrb.com.cn/Video/'+data.filmUrl;
    }
};
$(function(){
    page.init();
})
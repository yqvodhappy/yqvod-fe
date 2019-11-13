/*
* @Author: Dtvikey
* @Date:   2019-10-29 11:33:19
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-13 21:02:13
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('util/slider/index.js');
var _vv             = require('util/vv.js');
var _film           = require('service/film-service.js');
var templateBanner  = require('./banner.string');


var page = {
    data : {
        listParam : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '1',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        
        this.loadBannerPhbList();
    },
    bindEvent : function(){
        var _this = this;
    },
    
    // 加载排行榜list数据
    loadBannerPhbList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.banner-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
            
            listHtml = _vv.renderHtml(templateBanner, {
                list :  res.list
            });
            $pListCon.html(listHtml);

            _this.dotsBanner();

        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },

    //dots和上下页功能
    dotsBanner : function(){
     // 渲染banner的html
       // var bannerHtml  = _vv.renderHtml(templateBanner);
       // $('.banner-con').html(bannerHtml);
        // 初始化banner
        var $slider     = $('.banner').unslider({
            dots: true
        });
        // 前一张和后一张操作的事件绑定
        $('.banner-con .banner-arrow').click(function(){
            var forward = $(this).hasClass('prev') ? 'prev' : 'next';
            $slider.data('unslider')[forward]();
        });
    }

};
$(function(){
    page.init();

    
})

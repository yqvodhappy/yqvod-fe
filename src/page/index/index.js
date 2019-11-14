/*
* @Author: Dtvikey
* @Date:   2019-10-29 11:33:19
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-14 15:14:36
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('util/slider/index.js');
var _vv             = require('util/vv.js');
var _film           = require('service/film-service.js');
var templateBanner  = require('./banner.string');
var templateFloor   = require('./floor-list.string');


var page = {
    data : {
        listParam : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '1',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        },
        listParam2 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '10',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        },
        listParam3 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '6',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        },
        listParam4 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '2',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
        ,
        listParam5 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '3',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
        ,
        listParam6 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '5',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
        ,
        listParam7 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '12',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
        ,
        listParam8 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '13',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
        ,
        listParam9 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '14',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
        ,
        listParam10 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '11',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
        ,
        listParam11 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '4',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        }
        ,
        listParam12 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '7',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 5
        },
        listParam13 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '15',
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
        this.loadF1List();
        this.loadF2List();
        this.loadF3List();
        this.loadF4List();
        this.loadF5List();
        this.loadF6List();
        this.loadF7List();
        this.loadF8List();
        this.loadF9List();
        this.loadF10List();
        this.loadF11List();
        this.loadF12List();
        this.loadF13List();
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

    //dots和上下页切换功能
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
    },
    // 加载F1 list数据
    loadF1List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.floor-list1');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F2 list数据
    loadF2List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam2,
            $pListCon   = $('.floor-list2');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F3 list数据
    loadF3List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam3,
            $pListCon   = $('.floor-list3');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F4 list数据
    loadF4List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam4,
            $pListCon   = $('.floor-list4');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F5 list数据
    loadF5List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam5,
            $pListCon   = $('.floor-list5');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F6 list数据
    loadF6List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam6,
            $pListCon   = $('.floor-list6');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F7 list数据
    loadF7List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam7,
            $pListCon   = $('.floor-list7');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F8 list数据
    loadF8List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam8,
            $pListCon   = $('.floor-list8');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F9 list数据
    loadF9List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam9,
            $pListCon   = $('.floor-list9');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F10 list数据
    loadF10List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam10,
            $pListCon   = $('.floor-list10');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F11 list数据
    loadF11List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam11,
            $pListCon   = $('.floor-list11');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F12 list数据
    loadF12List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam12,
            $pListCon   = $('.floor-list12');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
     // 加载F13 list数据
    loadF13List : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam13,
            $pListCon   = $('.floor-list13');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.FloorFilter(res);
            listHtml = _vv.renderHtml(templateFloor, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },

    // 排行榜控制字数
    FloorFilter : function(data){
        
            for (var i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].name.length > 10){
                   data.list[i].name = data.list[i].name.substring(0,10)+'...';
                }
            }
            
    },


};
$(function(){
    page.init();

    
})

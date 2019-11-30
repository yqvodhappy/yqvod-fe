/*
* @Author: Dtvikey
* @Date:   2019-11-11 20:38:27
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-30 16:53:33
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
var _vv             = require('util/vv.js');
var _film           = require('service/film-service.js');
var templateIndex   = require('./index.string');
var templatePhb   = require('./phb-list.string');
var templateNew   = require('./new-list.string');
var templateDetail   = require('./detail.string');

var page = {
    data : {
        filmId : _vv.getUrlParam('filmId') || '',
        listParam : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '3',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_desc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 8
        },
        listParam2 : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '2',
            orderBy         : _vv.getUrlParam('orderBy')    || 'count_asc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 9
        }
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
        this.loadDetailPart();  
        this.loadPhbList();  
        this.loadNewList();
    },
    bindEvent : function(){
        var _this = this;
    },
    // 加载影片详情介绍
    loadDetailPart : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.detail-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _film.getFilmDetail(this.data.filmId, function(res){
                _this.filter(res);
                // 缓存住detail的数据
                _this.data.detailInfo = res;
                // render
               html = _vv.renderHtml(templateDetail, res);
               $pageWrap.html(html);

            }, function(errMsg){
               $pageWrap.html('<p class="err-tip">此影片太淘气，找不到了</p>');
        });
    },
    // 加载影片详细数据(播放部分)
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.p-memo-con');
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
        data.filmUrl = 'http://img.yqrb.com.cn/Video/'+data.filmUrl;
    },
    // 加载排行榜list数据
    loadPhbList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-phb-list');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.wordFilter(res);
            listHtml = _vv.renderHtml(templatePhb, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
    // 加载最新视频榜list数据
    loadNewList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam2,
            $pListCon   = $('.p-new-list');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
             _this.wordFilter(res);
            listHtml = _vv.renderHtml(templateNew, {
                list :  res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
    // 控制字数
    wordFilter : function(data){
        
            for (var i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].name.length > 20){
                   data.list[i].name = data.list[i].name.substring(0,20)+'...';
                }
            }
            
    }

};
$(function(){
    page.init();
})
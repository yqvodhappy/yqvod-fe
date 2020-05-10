/*
* @Author: Dtvikey
* @Date:   2019-11-09 09:21:25
* @Last Modified by:   Dtvikey
* @Last Modified time: 2020-05-10 09:52:46
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
var _vv             = require('util/vv.js');
var _film           = require('service/film-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        listParam : {
            keyword         : _vv.getUrlParam('keyword')    || '',
            categoryId      : _vv.getUrlParam('categoryId') || '',
            orderBy         : _vv.getUrlParam('orderBy')    || 'create_time-desc',
            pageNum         : _vv.getUrlParam('pageNum')    || 1,
            pageSize        : _vv.getUrlParam('pageSize')   || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.count-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.count-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击次数排序
            else if($this.data('type') === 'count'){
                // active class 的处理
                $this.addClass('active').siblings('.count-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'count_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'count_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _film.getFilmList(listParam, function(res){
            listHtml = _vv.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);
            // _this.loadPagination({
            //     hasPreviousPage : res.hasPreviousPage,
            //     prePage         : res.prePage,
            //     hasNextPage     : res.hasNextPage,
            //     nextPage        : res.nextPage,
            //     pageNum         : res.pageNum,
            //     pages           : res.pages
            // });
        }, function(errMsg){
            _vv.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
$(function(){
    page.init();
})
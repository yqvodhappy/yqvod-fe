/*
* @Author: Dtvikey
* @Date:   2019-10-29 11:33:19
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-11-09 15:00:49
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('util/slider/index.js');
var templateBanner  = require('./banner.string');
var _vv             = require('util/vv.js');

$(function() {
    // 渲染banner的html
    var bannerHtml  = _vv.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
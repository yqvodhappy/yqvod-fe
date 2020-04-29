/*
* @Author: Dtvikey
* @Date:   2019-11-09 09:32:43
* @Last Modified by:   Dtvikey
* @Last Modified time: 2020-04-28 20:09:50
*/

'use strict';

var _vv = require('util/vv.js');

var _film = {
    // 获取影片列表
    getFilmList : function(listParam, resolve, reject){
        _vv.request({
            url     : _vv.getServerUrl('/index/flist'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取影片详细信息
    getFilmDetail : function(filmId, resolve, reject){
        _vv.request({
            url     : _vv.getServerUrl('/index/getFilmDetailById'),
            data    : {
                filmId : filmId
            },
            success : resolve,
            error   : reject
        });
    },
    // 增加点击次数
    addCount : function(filmId, resolve, reject){
        _vv.request({
            url     : _vv.getServerUrl('/index/take_count'),
            data    : {
                filmId : filmId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _film;
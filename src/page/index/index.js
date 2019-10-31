/*
* @Author: Dtvikey
* @Date:   2019-10-29 11:33:19
* @Last Modified by:   Dtvikey
* @Last Modified time: 2019-10-31 21:18:43
*/

'use strict';
var _vv = require('util/vv.js');

var html = '<div>{{data}}</div>'
var data = {

    data:'test'
}
console.log(_vv.renderHtml(html,data));
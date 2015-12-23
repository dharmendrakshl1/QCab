/**
 * @Title logconfig.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var Log = require('log');
var fs = require('fs');
var path = require('path');

exports.getLogger = function(){

	//console.log(__dirname+', Base Name = '+path.basename(__dirname));
	
	//Initial Log Configuration
	var qcabNodeLogStream = fs.createWriteStream(path.join(__dirname, '../logs/qcabLog.log'), {flags: 'a'});
	var log = new Log('debug'); //Log('debug', qcabNodeLogStream);
	
	return log;
}

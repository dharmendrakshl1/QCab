/**
 * @Title emailactivitydetailModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */
var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "ActivityId");
	db.define('emailactivitydetail', {
		ActivitySubject: String,
		employee: Number,
		manager: Number,
		admin: Number,
		csr: Number
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("EmailActivityDetailModel got Synched With Database");
		logger.debug("EmailActivityDetailModel got Synched With Database");
		return cb();
	});
}
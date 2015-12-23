/**
 * @Title managerModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */
var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "ManagerId");
	db.define('manager', {
		ManagerName: String,
		ContactNumber: String,
		ProjectId:  Number
	},
	{
		autoFetch: true
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("ManagerModel got Synched With Database");
		logger.debug("ManagerModel got Synched With Database");
		return cb();
	});
}
/**
 * @Title roleModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 22/12/2015
 */
var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "RoleId");
	db.define('role', {
		RoleName: String
	},
	{
		autoFetch: true
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("RoleModel got Synched With Database");
		logger.debug("RoleModel got Synched With Database");
		return cb();
	});
}
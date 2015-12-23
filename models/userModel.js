/**
 * @Title userModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 22/12/2015
 */
var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "UserId");
	db.define('user', {
		UserName: String,
		Password: String,
		RoleId: Number,
		EmployeeId: Number
	},
	{
		autoFetch: true
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("UserModel got Synched With Database");
		logger.debug("UserModel got Synched With Database");
		return cb();
	});
}
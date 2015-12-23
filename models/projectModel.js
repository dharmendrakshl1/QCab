/**
 * @Title projectModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */
var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "ProjectId");
	db.define('project', {
		ProjectName: String
	},
	{
		autoFetch: true
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("ProjectModel got Synched With Database");
		logger.debug("ProjectModel got Synched With Database");
		return cb();
	});
}
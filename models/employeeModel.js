/**
 * @Title employeeModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */
var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "EmployeeId");
	//db.settings.set("properties.association_key","ManagerId");
	//db.settings.set("properties.association_key","ProjectId");
	db.define('employee', {
		EmployeeName: String,
		Gender: String,
		ProjectId: Number,
		ManagerId: Number,
		ResidentialAddress: String,
		OfficeAddress: String,
		ContactNumber: String
	},
	{
		autoFetch: true
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("EmployeeModel got Synched With Database");
		logger.debug("EmployeeModel got Synched With Database");
		return cb();
	});
}
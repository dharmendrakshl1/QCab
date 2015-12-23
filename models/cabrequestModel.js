/**
 * @Title cabrequestModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "RequestId");
	//db.settings.set("properties.association_key", "EmployeeId");
	db.define('cabrequest', {
		EmployeeId: Number,
		PickUpDate: Date,
		PickUpTime: Date,
		PickUpPoint: String,
		DropPoint: String,
		AvailStatus: String,
		TripId: Number
	},
	{
		autoFetch: true
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("CabRequestModel got Synched With Database");
		logger.debug("CabRequestModel got Synched With Database");
		return cb();
	});
}
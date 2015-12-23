/**
 * @Title cabdetailsModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */
var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "CabId");
	db.define('cabdetails', {
		CabNumber: Number,
		DriverName: String,
		Availabilty: String,
		VendorType: String,
		DriverContactNumber: String
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("CabDetailsModel got Synched With Database");
		logger.debug("CabDetailsModel got Synched With Database");
		return cb();
	});
}
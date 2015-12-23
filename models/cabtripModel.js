/**
 * @Title cabtripModel.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */
var logconfig = require('../config/logconfig.js');

module.exports = function(db, cb){
	var logger = logconfig.getLogger();
	
	db.settings.set("properties.primary_key", "TripId");
	db.define('cabtrip', {
		CabId: Number,
		NOE: Number,
		Escorts: String
	});
	
	//Synchronizing Model
	db.sync(function(err){
		!err && console.log("CabTripModel got Synched With Database");
		logger.debug("CabTripModel got Synched With Database");
		return cb();
	});
}
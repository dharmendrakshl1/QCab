/**
 * @Title qcabControllers.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var logconfig = require('../config/logconfig.js');
var qcabServices = require('../libs/cabRequestedServices.js');

exports.getCabRequestedDetailsForManager = function(req, res){
	var logger = logconfig.getLogger();
	logger.debug('Entered QCabControllers->getCabRequestedDetails');
	
	var managerId = req.params.managerId;
	console.log("Requested Cab Details for Manager ID = "+managerId);
	
	qcabServices.getCabRequestedDetailsForManager(managerId, function(retValue){
		console.log("Returned value = "+JSON.stringify(retValue, null, " "));
		logger.debug("Returned value = "+JSON.stringify(retValue, null, " "));
		logger.debug('Exited QCabControllers->getCabRequestedDetails');
		
		res.send(retValue);
	});
}
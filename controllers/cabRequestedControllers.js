/**
 * @Title qcabControllers.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var logconfig = require('../config/logconfig.js');
var qcabServices = require('../libs/cabRequestedServices.js');

//Module to response all cab request details made by an employee
exports.getCabRequestedDetailsForEmployee = function(req, res){
	var logger = logconfig.getLogger();
	logger.debug('Entered QCabControllers->getCabRequestedDetailsForEmployee');
	
	var employeeId = req.params.employeeId;
	console.log("Requested Cab Details of Employee ID = "+employeeId);
	
	qcabServices.getCabRequestedDetailsForEmployee(employeeId, function(retValue){
		console.log("Returned value = "+JSON.stringify(retValue, null, " "));
		logger.debug("Returned value = "+JSON.stringify(retValue, null, " "));
		logger.debug('Exited QCabControllers->getCabRequestedDetailsForEmployee');
		
		res.send(retValue);
	});
}

//Module to response to manager to display all cab request made employee working under that manager
exports.getCabRequestedDetailsForManager = function(req, res){
	var logger = logconfig.getLogger();
	logger.debug('Entered QCabControllers->getCabRequestedDetailsForManager');
	
	var managerId = req.params.managerId;
	console.log("Requested All Cab Details under Manager for Manager ID = "+managerId);
	
	qcabServices.getCabRequestedDetailsForManager(managerId, function(retValue){
		console.log("Returned value = "+JSON.stringify(retValue, null, " "));
		logger.debug("Returned value = "+JSON.stringify(retValue, null, " "));
		logger.debug('Exited QCabControllers->getCabRequestedDetailsForManager');
		
		res.send(retValue);
	});
}

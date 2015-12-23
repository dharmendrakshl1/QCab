/**
 * @Title loginController.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var logconfig = require('../config/logconfig.js');
var loginServices = require('../libs/loginServices.js');

exports.validateCredential = function(req, res){
	var logger = logconfig.getLogger();
	logger.debug('Entered LoginController->validateCredential');
	
	var reqBody = req.body;
	var UserName = reqBody.UserName;
	var Password = reqBody.Password;
	
	logger.debug('UserName = '+UserName);
	logger.debug('Password = '+Password);
	
	loginServices.validateCredential(UserName, Password, function(retValue){
		console.log("Returned value = "+JSON.stringify(retValue, null, " "));
		logger.debug("Returned value = "+JSON.stringify(retValue, null, " "));
		logger.debug('Exited LoginController->validateCredential');
		
		res.send(retValue);
	});
}
/**
 * @Title noderoutes.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var logconfig = require('../config/logconfig.js');
var qcabControllers = require('../controllers/cabRequestedControllers.js');
var loginController = require('../controllers/loginController.js');

module.exports = function(app){
	
	//routes for landing page
	app.get('/', function(req, res){
		var logger = logconfig.getLogger();
		logger.debug('Entered in Landing Page');
		res.send("Welcome to My Node Apps");
		logger.debug('Exited from Landing Page');
	});
	
	//routes for all services provided by apps
	app.post('/api/qcab/authentication/validatecredential', loginController.validateCredential);
	app.get('/api/qcab/cabrequesteddetails/managerId/:managerId', qcabControllers.getCabRequestedDetailsForManager);
}
/**
 * @Title loginServices.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 22/12/2015
 */

var logconfig = require('../config/logconfig.js');
var configDB = require('../config/database.js');

exports.validateCredential = function(UserName, Password, validateCredentialCallBack){
	var logger = logconfig.getLogger();
	logger.debug('Entered LoginServices->validateCredential');
	
	console.log('UserName = '+UserName);
	console.log('Password = '+Password);
	
	configDB.connectDB(function(db){
		if(db != null || db != undefined){
			db.load('../models/userModel', function(err){
				if(!err){
					console.log("UserModel got loaded successfully");
					logger.debug("UserModel got loaded successfully");
					
					var userdetailsresponse = {};
					
					var UserModel = db.models.user;
					
					/*UserModel.all(function(err, users){
						if(!err){
							validateCredentialCallBack(users);
						}
						else{
							validateCredentialCallBack(err);
						}
					});*/
					
					UserModel.find({UserName: UserName, Password: Password}, function(err, user){
						if(!err){
							if(user.length > 0){
								userdetailsresponse["UserName"] = user[0].UserName;
								userdetailsresponse["RoleId"] = user[0].RoleId;
								userdetailsresponse["EmployeeId"] = user[0].EmployeeId;
								
								configDB.closeDB(db);
								
								console.log('Exited LoginSerivces->validateCredential');
								logger.debug('Exited LoginSerivces->validateCredential');
								
								validateCredentialCallBack(userdetailsresponse);
							}
							else{
								userdetailsresponse["responseCode"] = 5001;
								userdetailsresponse["responseMsg"] = "Either UserName or Password is Invalid";
								
								configDB.closeDB(db);
								
								console.log('Exited LoginSerivces->validateCredential');
								logger.debug('Exited LoginSerivces->validateCredential');
								
								validateCredentialCallBack(userdetailsresponse);
							}
						}
						else{
							console.log('Error in Reading UserModel Value');
							logger.debug('Error in Reading UserModel Value');
							
							configDB.closeDB(db);
							
							console.log('Exited LoginSerivces->validateCredential');
							logger.debug('Exited LoginSerivces->validateCredential');
							
							validateCredentialCallBack(err);
						}
					});
				}
				else{
					console.log('Error in Loading UserModel '+err);
					logger.debug('Error in Loading UserModel '+err);
					
					configDB.closeDB(db);
					
					console.log('Exited LoginSerivces->validateCredential');
					logger.debug('Exited LoginSerivces->validateCredential');
					
					validateCredentialCallBack(err);
				}
			});
		}
	});
}
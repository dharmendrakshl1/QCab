/**
 * @Title qcabServices.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var logconfig = require('../config/logconfig.js');
var configDB = require('../config/database.js');

//Service Module to response all cab request details made by an employee
exports.getCabRequestedDetailsForEmployee = function(employeeId, getCabRequestedDetailCallBack){
	
	var logger = logconfig.getLogger();
	logger.debug('Entered QCabSerivces->getCabRequestedDetailsForEmployee');
	
	configDB.connectDB(function(db){
		if(db != null || db != undefined){	
			db.load(['../models/cabrequestModel', '../models/employeeModel', '../models/projectModel'], function(err){
				if(!err){
					console.log("CabRequestModel, EmployeeModel, ProjectModel got loaded successfully");
					logger.debug("CabRequestModel, EmployeeModel, ProjectModel got loaded successfully");
					
					var cabrequestdetailsresponse = {};
					var cabrequestdetails = [];
					
					var CabRequestModel = db.models.cabrequest;
					var EmployeeModel = db.models.employee;
					var ProjectModel = db.models.project;
					
					db.settings.set("properties.association_key", "ManagerId");
					EmployeeModel.hasOne('Manager', EmployeeModel); // Self Join
					db.settings.set("properties.association_key", "ProjectId");
					EmployeeModel.hasOne('Projects', ProjectModel, {reverse: 'Projects'});
					db.settings.set("properties.association_key", "EmployeeId");
					CabRequestModel.hasOne('CabRequests',EmployeeModel, {reverse: 'CabRequests'});
					
					EmployeeModel.find({EmployeeId: employeeId}, function(err, employee){
						if(!err){
							console.log("Employee Length = "+employee.length);
							for(var i = 0; i<employee.length; i++){
								console.log("CabRequest Lenght "+employee[i].CabRequests.length+" Of Employee "+employee[i].EmployeeName);
								if(employee[i].CabRequests.length > 0){
									for(var j = 0; j<employee[i].CabRequests.length; j++){
										cabrequestdetails[j] = {};
										cabrequestdetails[j]["EmployeeId"] = employee[i].EmployeeId;
										cabrequestdetails[j]["EmployeeName"] = employee[i].EmployeeName;
										cabrequestdetails[j]["Gender"] = employee[i].Gender;
										cabrequestdetails[j]["ProjectName"] = employee[i].Projects.ProjectName;
										cabrequestdetails[j]["ResidentialAddress"] = employee[i].ResidentialAddress;
										cabrequestdetails[j]["OfficeAddress"] = employee[i].OfficeAddress;
										cabrequestdetails[j]["ContactNumber"] = employee[i].ContactNumber;
										cabrequestdetails[j]["PickUpDate"] = employee[i].CabRequests[j].PickUpDate;
										cabrequestdetails[j]["PickUpTime"] = employee[i].CabRequests[j].PickUpTime;
									}
								}
							}
							
							if(cabrequestdetails.length > 0){
								
								cabrequestdetailsresponse["data"] = cabrequestdetails;
								
								console.log('Exited QCabSerivces->getCabRequestedDetailsForEmployee');
								logger.debug('Exited QCabSerivces->getCabRequestedDetailsForEmployee');
								
								configDB.closeDB(db);
								
								getCabRequestedDetailCallBack(cabrequestdetailsresponse);
							}
							else{								
								cabrequestdetailsresponse["responseCode"] = 5002;
								cabrequestdetailsresponse["responseMsg"] = "No Cab Request for this Manager";
								
								console.log("response = "+cabrequestdetailsresponse);
								
								configDB.closeDB(db);
								
								console.log('Exited QCabSerivces->getCabRequestedDetailsForEmployee');
								logger.debug('Exited QCabSerivces->getCabRequestedDetailsForEmployee');
								
								getCabRequestedDetailCallBack(cabrequestdetailsresponse);
							}
						}
						else{
							console.log('Error in Reading Either or CabRequestModel, EmployeeModel, ProjectModel Value '+err);
							logger.debug('Error in Reading Either or CabRequestModel, EmployeeModel, ProjectModel Value '+err);
							
							configDB.closeDB(db);
							
							console.log('Exited QCabSerivces->getCabRequestedDetailsForEmployee');
							logger.debug('Exited QCabSerivces->getCabRequestedDetailsForEmployee');
							
							getCabRequestedDetailCallBack(err);
						}
					});
				}
				else{
					console.log('Error in Loading CabRequestModel, EmployeeModel, ProjectModel '+err);
					logger.debug('Error in Loading CabRequestModel, EmployeeModel, ProjectModel '+err);
					
					configDB.closeDB(db);
					
					console.log('Exited QCabSerivces->getCabRequestedDetailsForEmployee');
					logger.debug('Exited QCabSerivces->getCabRequestedDetailsForEmployee');
					
					getCabRequestedDetailCallBack(err);
				}
			});
		}
	});
}

//Service Module to response to manager to display all cab request made by all employee working under the manager
exports.getCabRequestedDetailsForManager = function(managerId, getCabRequestedDetailCallBack){
	
	var logger = logconfig.getLogger();
	logger.debug('Entered QCabSerivces->getCabRequestedDetailsForManager');
	
	configDB.connectDB(function(db){
		if(db != null || db != undefined){	
			db.load(['../models/cabrequestModel', '../models/employeeModel', '../models/projectModel', '../models/projectAssignmentModel'], function(err){
				if(!err){
					console.log("CabRequestModel, EmployeeModel, ProjectModel, ProjectAssignmentModel got loaded successfully");
					logger.debug("CabRequestModel, EmployeeModel, ProjectModel, ProjectAssignmentModel got loaded successfully");
					
					var cabrequestdetailsresponse = {};
					var cabrequestdetails = [];
					
					var CabRequestModel = db.models.cabrequest;
					var EmployeeModel = db.models.employee;
					var ProjectModel = db.models.project;
					var ProjectAssignmentModel = db.models.projectassignment;
					
					db.settings.set("properties.association_key", "ManagerId");
					EmployeeModel.hasOne('Manager', EmployeeModel); // Self Join
					
					db.settings.set("properties.association_key", "EmployeeId");
					ProjectAssignmentModel.hasOne('Projects1', EmployeeModel, {reverse: 'Projects1'});
					
					db.settings.set("properties.association_key", "ProjectId");
					ProjectAssignmentModel.hasOne('Projects', ProjectModel, {reverse: 'Projects'});
					
					db.settings.set("properties.association_key", "EmployeeId");
					CabRequestModel.hasOne('CabRequests',EmployeeModel, {reverse: 'CabRequests'});
					
					EmployeeModel.find({ManagerId: managerId}, function(err, employee){
						if(!err){
							console.log("Employee Length = "+employee.length);
							/*for(var i = 0; i<employee.length; i++){
								console.log("CabRequest Lenght "+employee[i].CabRequests.length+" Of Employee "+employee[i].EmployeeName);
								if(employee[i].CabRequests.length > 0){
									for(var j = 0; j<employee[i].CabRequests.length; j++){
										cabrequestdetails[j] = {};
										cabrequestdetails[j]["EmployeeId"] = employee[i].EmployeeId;
										cabrequestdetails[j]["EmployeeName"] = employee[i].EmployeeName;
										cabrequestdetails[j]["Gender"] = employee[i].Gender;
										cabrequestdetails[j]["ProjectName"] = employee[i].Projects.ProjectName;
										cabrequestdetails[j]["ResidentialAddress"] = employee[i].ResidentialAddress;
										cabrequestdetails[j]["OfficeAddress"] = employee[i].OfficeAddress;
										cabrequestdetails[j]["ContactNumber"] = employee[i].ContactNumber;
										cabrequestdetails[j]["PickUpDate"] = employee[i].CabRequests[j].PickUpDate;
										cabrequestdetails[j]["PickUpTime"] = employee[i].CabRequests[j].PickUpTime;
									}
								}
							}*/
							
							getCabRequestedDetailCallBack(employee);
							
							/*if(cabrequestdetails.length > 0){
								
								cabrequestdetailsresponse["data"] = cabrequestdetails;
								
								console.log('Exited QCabSerivces->getCabRequestedDetailsForManager');
								logger.debug('Exited QCabSerivces->getCabRequestedDetailsForManager');
								
								configDB.closeDB(db);
								
								getCabRequestedDetailCallBack(cabrequestdetailsresponse);
							}
							else{								
								cabrequestdetailsresponse["responseCode"] = 5002;
								cabrequestdetailsresponse["responseMsg"] = "No Cab Request for this Manager";
								
								console.log("response = "+cabrequestdetailsresponse);
								
								configDB.closeDB(db);
								
								console.log('Exited QCabSerivces->getCabRequestedDetailsForManager');
								logger.debug('Exited QCabSerivces->getCabRequestedDetailsForManager');
								
								getCabRequestedDetailCallBack(cabrequestdetailsresponse);
							}*/
						}
						else{
							console.log('Error in Reading Either or CabRequestModel, EmployeeModel, ProjectModel, ProjectAssignmentModel Value '+err);
							logger.debug('Error in Reading Either or CabRequestModel, EmployeeModel, ProjectModel, ProjectAssignmentModel Value '+err);
							
							configDB.closeDB(db);
							
							console.log('Exited QCabSerivces->getCabRequestedDetailsForManager');
							logger.debug('Exited QCabSerivces->getCabRequestedDetailsForManager');
							
							getCabRequestedDetailCallBack(err);
						}
					});
					
					/*ManagerModel.get(managerId, function(err, manager){
							if(!err){
								manager.getEmployees(function(err, employee){
									if(!err){
										console.log('Exited QCabSerivces->getCabRequestedDetails');
										logger.debug('Exited QCabSerivces->getCabRequestedDetails');
										
										configDB.closeDB(db);
										getCabRequestedDetailCallBack(employee);
									}
									else{
										console.log('Error in Reading Employee Model Value '+err);
										logger.debug('Error in Reading Employee Model Value '+err);
										
										configDB.closeDB(db);
										
										console.log('Exited QCabSerivces->getCabRequestedDetails');
										logger.debug('Exited QCabSerivces->getCabRequestedDetails');
										
										getCabRequestedDetailCallBack(err);
									}
								});
								
								//configDB.closeDB(db);
								//getCabRequestedDetailCallBack(manager);
							}
							else{
								console.log('Error in Reading CabRequest Model Value '+err);
								logger.debug('Error in Reading CabRequest Model Value '+err);
								
								configDB.closeDB(db);
								
								console.log('Exited QCabSerivces->getCabRequestedDetails');
								logger.debug('Exited QCabSerivces->getCabRequestedDetails');
								
								getCabRequestedDetailCallBack(err);
							}
						});*/
				}
				else{
					console.log('Error in Loading CabRequestModel, EmployeeModel, ProjectModel, ProjectAssignmentModel '+err);
					logger.debug('Error in Loading CabRequestModel, EmployeeModel, ProjectModel, ProjectAssignmentModel '+err);
					
					configDB.closeDB(db);
					
					console.log('Exited QCabSerivces->getCabRequestedDetailsForManager');
					logger.debug('Exited QCabSerivces->getCabRequestedDetailsForManager');
					
					getCabRequestedDetailCallBack(err);
				}
			});
		}
	});
}
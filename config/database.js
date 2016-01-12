/**
 * @Title database.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var orm = require('orm');

var logconfig = require('../config/logconfig.js');
var logger = logconfig.getLogger();

/*module.exports = {
		'url': 'mysql://root:root\@123@localhost/qcab'
}*/

exports.connectDB = function(dbcallback){
	orm.connect('mysql://root:password@localhost/qcab?pool=true', function(err, db){
		if(!err){
			console.log("Database Got connected successfully");
			logger.debug("Database Got connected successfully");
			
			dbcallback(db);
		}
		else{
			console.log('Error in Connection with Database '+err);
			logger.debug('Error in Connection with Database '+err);
		}
	});
}

exports.closeDB = function(db){
	console.log("Database Connection Got Closed Successfully");
	logger.debug("Database Connection Got Closed Successfully");
	db.close();
} 
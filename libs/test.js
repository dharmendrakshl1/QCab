/**
 * New node file
 */
var configDB = require('../config/database.js');

exports.getCabDetails = function(){
	configDB.connectDB(function(db){
		if(db != null || db != undefined){
			console.log("Entered in connection");
			db.close();
		}
		else{
			console.log("db is null");
		}
	});
}
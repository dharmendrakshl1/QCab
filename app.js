/**
 * @Title app.js
 * @Author Dharmendra Kumar Kaushal
 * @Developer Dharmendra Kumar Kaushal
 * @Date 12/09/2015
 */

var express = require('express');
var path = require('path');
var morgan = require('morgan'); // HTTP Request Logger middleware for Node.js
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var engines = require('consolidate');

var accessLogStream = fs.createWriteStream(__dirname+'/logs/access.log', {flags: 'a'});
var logconfig = require('./config/logconfig.js');
var logger = logconfig.getLogger();

var app = express();
var port = process.env.PORT || 3000;

//Setup Express Application
//app.use(morgan('dev', {stream: accessLogStream}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('logs',__dirname+'/logs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//CORS Support, Allow crossdomain middleware
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//IE - Clearing Cache
app.use(function noCache(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires",0);
	   
	/*res.header('Access-Control-Max-Age', 0);
	res.header('Cache-Control', 'max-age=0,no-cache,no-store,post-check=0,pre-check=0,must-revalidate');
	res.header('Expires', '-1');*/ 
	next();
});

//All Node Routes Configuration goes here
require('./routes/noderoutes.js')(app);

app.listen(port, function(err) {
    if(err) {
        console.log("Error on port " + port);
        logger.debug('Error in starting the server on port' + port);

    } else {
        console.log("Server running on port " + port);
    }
});

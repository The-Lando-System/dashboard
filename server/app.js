// Set Up =============================
var path = require('path');
var base = path.resolve(__dirname + '/..');

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var User = require(base + '/server/models/user');

// Configuration ======================
var devConfig = false;
try {
	devConfig = require(base + '/config/config');
	if (!devConfig.db){
		console.log('ERROR! Could not find \'db\' in the config file!');
		console.log('e.g. \'db\': \'mongodb://localhost:27017/mean-template\'');
		process.exit();
	}
	if (!devConfig.secret){
		console.log('ERROR! Could not find \'secret\' in the config file!');
		console.log('e.g. \'secret\': \'mysecret\'');
		process.exit();
	}
	console.log('[x] Successfully parsed the config file! Happy Debugging!');
} catch(err) {
	if (process.env.NODE_ENV === 'prod'){
		console.log('[x] No config file found... Going into Production!');
	} else {
		console.log('ERROR! You need to create a config file!');
		console.log('e.g. your-app/config/config.js');
		console.log('module.exports = {\n\t\'db\': \'mongodb://localhost:27017/mean-template\',\n\t\'secret\': \'mysecret\'\n}');
		process.exit();
	}
}

// Set App-wide variables here ==================================
var dbUrl =  devConfig ? devConfig.db : process.env.DB_URL;
var secretStr = devConfig ? devConfig.secret : process.env.SECRET;
var tokenExpiryTime = devConfig ? devConfig.tokenExpiryTime : process.env.TOKEN_EXPIRY_TIME;

// Try to connect to Mongo
mongoose.connect(dbUrl, function(err){
	if (err){
		console.log('ERROR! Could not connect to MongoDB!')
		if (err.message.includes('ECONNREFUSED')){
			console.log('The MongoDB connection was refused... Is your MongoDB running?');
		}
	} else {
		console.log('[x] Successfully connected to MongoDB!');
		console.log("------> Ready! <---------");
	}
});

app.set('superSecret', secretStr);

app.use(express.static(base + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended':'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type:'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(base + '/public/assets/images/favicon.ico'));

// Routes ==============================
require(base + '/server/routes/static-routes')(app);
require(base + '/server/routes/admin-routes')(app);
require(base + '/server/routes/user-routes')(app);

// User Authentication =================
app.post('/authenticate', function(req,res){
	User.findOne({
		username: req.body.username		
	}, function(err,user){
		if (err) throw err;
		if (!user) {
			console.log("WARNING: Authentication failed! Could not find user: " + req.body.username);
			res.status(404).send({ message: 'Authentication failed, user not found!' });
		} else if (user) {
			if (!passwordHash.verify(req.body.password, user.password)) {
				console.log("WARNING: Authentication failed! Wrong password for user: " + req.body.username);
				res.status(404).send({ message: 'Authentication failed, wrong password!' });
			} else {
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: 2592000   // 30 days?
				});
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});


// Spotify Callback
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});



// Export the app ======================
exports = module.exports = app;
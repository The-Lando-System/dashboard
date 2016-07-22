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
var qstring = require('querystring');
var request = require('request');
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
	if (!devConfig.spotifyClientId || !devConfig.spotifyCallback || !devConfig.spotifySecret){
		console.log('ERROR! Could not find all of the spotify properties in the config file:');
		console.log('\t\'spotifyClientId\',\'spotifyCallback\',\'spotifySecret\'');
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
var SPOTIFY_CLIENT_ID = devConfig ? devConfig.spotifyClientId : process.env.SPOTIFY_CLIENT_ID;
var SPOTIFY_REDIRECT_URI = devConfig ? devConfig.spotifyCallback : process.env.SPOTIFY_REDIRECT_URI;
var SPOTIFY_CLIENT_SECRET = devConfig ? devConfig.spotifySecret : process.env.SPOTIFY_CLIENT_SECRET;

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


// Spotify Login
app.get('/spotify-login', function(req, res) {

  console.log('In GET for spotify login');

  var generateRandomString = function(length) {
	  var text = '';
	  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	  for (var i = 0; i < length; i++) {
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	  }
	  return text;
  };

  var state = generateRandomString(16);

  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    qstring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      state: state
    }));

});



// Spotify Callback
app.get('/spotify-callback', function(req, res) {

  	var code = req.query.code;
	var authOptions = {
	    url: 'https://accounts.spotify.com/api/token',
	    form: {
	        code: code,
	        redirect_uri: SPOTIFY_REDIRECT_URI,
	        grant_type: 'authorization_code',
	        client_id: SPOTIFY_CLIENT_ID,
	        client_secret: SPOTIFY_CLIENT_SECRET
	    },
	    json: true
	};

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token;
        var refresh_token = body.refresh_token;

        res.redirect('/spotify-auth-success/' + access_token + '/' + refresh_token );

      } else {
        res.status(500).send({ message: 'Error! Invalid spotify token!' });
      }
    });
});

// Spotify refresh token
app.get('/refresh_token/:refreshToken', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.params.refreshToken;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


// Export the app ======================
exports = module.exports = app;
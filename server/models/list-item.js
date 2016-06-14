var mongoose = require('mongoose');

module.exports = mongoose.model('ListItem', {
	username:  	  { type: String,  default: ''       },
	description:  { type: String,  default: ''       },
	position:     { type: Number,  default: 1        },
	complete: 	  { type: Boolean, default: false    }
});
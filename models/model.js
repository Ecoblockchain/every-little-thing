var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var thingSchema = new Schema({
	
	// name: {type: String, required: true}, // this version requires this field to exist
	// name: {type: String, unique: true}, // this version requires this field to be unique in the db
	title: String,
	type: String, //do, think, see
	category: String, //ITP, home, family...
	topic: [String],  //culture, design, art, technology...
	people: [String],  //who I am with
	date: {
		month: Number,
		day: Number
	},
	time: {
		period: Boolean,
		startH: Number,
		StartM: Number,
		endH: Number,
		endM: Number
	},
	location: String, 
	emotion: String, //happy, sad, angry, anxious...
	description: String,
	language: String,  //Chinese, English
	sharing: {
		shared: Boolean,
		audience: [String],
		media: [String],  //facebook, email, twitter, instagram...
		feedback: String
	},
	seeDetail:{
		resource: [String],  //book, magazine, facebook, email, twitter, instagram...
		attitude: String,  //agree, disagree, like, hate...
		reason: String,
		url: String
	},
	thinkDetail:{
		tookAction: Boolean,
		action: String
	},
	finished: Boolean,
	dateAdded : { type: Date, default: Date.now }
})

// export 'Thing' model so we can interact with it in other files
module.exports = mongoose.model('Thing',thingSchema);


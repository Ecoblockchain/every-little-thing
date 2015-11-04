var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var thingSchema = new Schema({
	
	// name: {type: String, required: true}, // this version requires this field to exist
	// name: {type: String, unique: true}, // this version requires this field to be unique in the db
	title: String,
	type: String,
	category: String,
	topic: [String],
	people: [String],
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
	emotion: String,
	description: String,
	language: String,
	sharing: {
		shared: Boolean,
		audience: [String],
		media: [String],
		feedback: String
	},
	seeDetail:{
		resource: [String],
		attitude: String,
		reason: String,
		url: String
	},
	thinkDetail:{
		tookAction: Boolean,
		action: String
	},
	dateAdded : { type: Date, default: Date.now }
})

// export 'Thing' model so we can interact with it in other files
module.exports = mongoose.model('Thing',thingSchema);


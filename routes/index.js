var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db model
var Thing = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {

  var jsonData = {
    'name': 'every-little-thing',
    'api-status': 'OK'
  }

  // respond with json data
  res.json(jsonData)
});

// simple route to show an HTML page
router.get('/sample-page', function(req, res) {
  res.render('sample.html')
});

router.get('/add', function(req, res) {
  res.render('add.html')
})

// /**
//  * POST '/api/create'
//  * Receives a POST request of the new user and location, saves to db, responds back
//  * @param  {Object} req. An object containing the different attributes of the Person
//  * @return {Object} JSON
//  */

router.post('/api/create', function(req, res) {

  console.log(req.body);

  // pull out the information from the req.body
  var title = req.body.title;
  var type = req.body.type;
  var category = req.body.category;
  var topic = req.body.topic.split(",");
  var people = req.body.people.split(",");
  var month = req.body.month;
  var day = req.body.day;
  var period = req.body.period;
  var startH = req.body.startH;
  var startM = req.body.startM;
  var endH = req.body.endH;
  var endM = req.body.endM;
  var location = req.body.location;
  var emotion = req.body.emotion;
  var description = req.body.description;
  var language = req.body.language;
  var shared = req.body.shared;
  var audience = req.body.audience.split(",");
  var media = req.body.media.split(",");
  var feedback = req.body.feedback;
  var resource = req.body.resource.split(",");
  var attitude = req.body.attitude;
  var reason = req.body.reason;
  var url = req.body.url;
  var tookAction = req.body.tookAction;
  var action = req.body.action;
  var finished = req.body.finished;

  // hold all this data in an object
  // this object should be structured the same way as your db model
  var thingObj = {
    title: title,
    type: type,
    category: category,
    topic: topic,
    people: people,
    date: {
      month: month,
      day: day
    },
    time: {
      period: period,
      startH: startH,
      startM: startM,
      endH: endH,
      endM: endM
    },
    location: location,
    emotion: emotion,
    description: description,
    language: language,
    sharing: {
      shared: shared,
      audience: audience,
      media: media,
      feedback: feedback
    },
    seeDetail: {
      resource: resource,
      attitude: attitude,
      reason: reason,
      url: url
    },
    thinkDetail: {
      tookAction: tookAction,
      action: action
    },
    finished: finished
  };

  // create a new thing model instance, passing in the object
  var thing = new Thing(thingObj);

  // now, save that thing instance to the database
  // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save    
  thing.save(function(err, data) {
    // if err saving, respond back with error
    if (err) {
      var error = {
        status: 'ERROR',
        message: 'Error saving thing'
      };
      return res.json(error);
    }

    console.log('saved a new thing!');
    console.log(data);

    // now return the json data of the new thing
    var jsonData = {
      status: 'OK',
      thing: data
    }

    return res.json(jsonData);

  })
});

// /**
//  * GET '/api/get/:id'
//  * Receives a GET request specifying the thing to get
//  * @param  {String} req.param('id'). The thingId
//  * @return {Object} JSON
//  */

router.get('/api/get/:id', function(req, res) {

  var requestedId = req.param('id');

  // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
  Thing.findById(requestedId, function(err, data) {

    // if err or no user found, respond with error 
    if (err || data == null) {
      var error = {
        status: 'ERROR',
        message: 'Could not find that thing'
      };
      return res.json(error);
    }

    // otherwise respond with JSON data of the thing
    var jsonData = {
      status: 'OK',
      thing: data
    }

    return res.json(jsonData);

  })
})

// /**
//  * GET '/api/get'
//  * Receives a GET request to get all thing details
//  * @return {Object} JSON
//  */

router.get('/api/get', function(req, res) {

  // mongoose method to find all, see http://mongoosejs.com/docs/api.html#model_Model.find
  Thing.find(function(err, data) {
    // if err or no things found, respond with error 
    if (err || data == null) {
      var error = {
        status: 'ERROR',
        message: 'Could not find things'
      };
      return res.json(error);
    }

    // otherwise, respond with the data 

    var jsonData = {
      status: 'OK',
      things: data
    }

    res.json(jsonData);

  })

})

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the thing to update, updates db, responds back
//  * @param  {String} req.param('id'). The thingId to update
//  * @param  {Object} req. An object containing the different attributes of the Thing
//  * @return {Object} JSON
//  */

router.post('/api/update/:id', function(req, res) {

  var requestedId = req.param('id');

  var dataToUpdate = {}; // a blank object of data to update

  // pull out the information from the req.body and add it to the object to update
  var title, type, category, month, day, period, startH, startM, endH, endM, location, emotion, description, language, shared, feedback, resource, attitude, reason, url, tookAction, action;

  // we only want to update any field if it actually is contained within the req.body
  // otherwise, leave it alone.
  if (req.body.title) {
    title = req.body.title;
    dataToUpdate['title'] = title;
  }
  if (req.body.type) {
    type = req.body.type;
    dataToUpdate['type'] = type;
  }
  if (req.body.category) {
    category = req.body.category;
    dataToUpdate['category'] = category;
  }
  if (req.body.month) {
    month = req.body.month;
    dataToUpdate['date'] = {};
    dataToUpdate['date']['month'] = month;
  }
  if (req.body.day) {
    day = req.body.day;
    if (!dataToUpdate['date']) dataToUpdate['date'] = {};
    dataToUpdate['date']['day'] = day;
  }
  if (req.body.period) {
    period = req.body.period;
    dataToUpdate['time'] = {};
    dataToUpdate['time']['period'] = period;
  }
  if (req.body.startH) {
    startH = req.body.startH;
    if (!dataToUpdate['time']) dataToUpdate['time'] = {};
    dataToUpdate['time']['startH'] = startH;
  }
  if (req.body.startM) {
    startM = req.body.startM;
    if (!dataToUpdate['time']) dataToUpdate['time'] = {};
    dataToUpdate['time']['startM'] = startM;
  }
  if (req.body.endH) {
    endH = req.body.endH;
    if (!dataToUpdate['time']) dataToUpdate['time'] = {};
    dataToUpdate['time']['endH'] = endH;
  }
  if (req.body.endM) {
    endM = req.body.endM;
    if (!dataToUpdate['time']) dataToUpdate['time'] = {};
    dataToUpdate['time']['endM'] = endM;
  }
  if (req.body.location) {
    location = req.body.location;
    dataToUpdate['location'] = location;
  }
  if (req.body.emotion) {
    emotion = req.body.emotion;
    dataToUpdate['emotion'] = emotion;
  }
  if (req.body.description) {
    description = req.body.description;
    dataToUpdate['description'] = description;
  }
  if (req.body.language) {
    language = req.body.language;
    dataToUpdate['language'] = language;
  }
  if (req.body.shared) {
    shared = req.body.shared;
    dataToUpdate['sharing'] = {};
    dataToUpdate['sharing']['shared'] = shared;
  }
  if (req.body.feedback) {
    feedback = req.body.feedback;
    if (!dataToUpdate['sharing']) dataToUpdate['sharing'] = {};
    dataToUpdate['sharing']['feedback'] = feedback;
  }
  if (req.body.resource) {
    resource = req.body.resource;
    dataToUpdate['seeDetail'] = {};
    dataToUpdate['seeDetail']['resource'] = resource;
  }
  if (req.body.attitude) {
    attitude = req.body.attitude;
    if (!dataToUpdate['seeDetail']) dataToUpdate['seeDetail'] = {};
    dataToUpdate['seeDetail']['attitude'] = attitude;
  }
  if (req.body.reason) {
    reason = req.body.reason;
    if (!dataToUpdate['seeDetail']) dataToUpdate['seeDetail'] = {};
    dataToUpdate['seeDetail']['reason'] = reason;
  }
  if (req.body.url) {
    url = req.body.url;
    if (!dataToUpdate['seeDetail']) dataToUpdate['seeDetail'] = {};
    dataToUpdate['seeDetail']['url'] = url;
  }
  if (req.body.tookAction) {
    tookAction = req.body.tookAction;
    dataToUpdate['thinkDetail'] = {};
    dataToUpdate['thinkDetail']['tookAction'] = tookAction;
  }
  if (req.body.action) {
    action = req.body.action;
    if (!dataToUpdate['thinkDetail']) dataToUpdate['thinkDetail'] = {};
    dataToUpdate['thinkDetail']['action'] = action;
  }
  if (req.body.finished) {
    finished = req.body.finished;
    dataToUpdate['finished'] = finished;
  }

  var topic = []; // blank array to hold topic
  if (req.body.topic) {
    topic = req.body.topic.split(","); // split string into array
    dataToUpdate['topic'] = topic;
  }

  var people = []; // blank array to hold people
  if (req.body.people) {
    people = req.body.people.split(","); // split string into array
    dataToUpdate['people'] = people;
  }


  var audience = []; // blank array to hold people
  if (req.body.audience) {
    audience = req.body.audience.split(","); // split string into array
    if (!dataToUpdate['sharing']) dataToUpdate['sharing'] = {};
    dataToUpdate['sharing']['audience'] = audience;
  }

  var media = []; // blank array to hold people
  if (req.body.media) {
    media = req.body.media.split(","); // split string into array
    if (!dataToUpdate['sharing']) dataToUpdate['sharing'] = {};
    dataToUpdate['sharing']['media'] = media;
  }

  console.log('the data to update is ' + JSON.stringify(dataToUpdate));

  // now, update that thing
  // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
  Thing.findByIdAndUpdate(requestedId, dataToUpdate, function(err, data) {
    // if err saving, respond back with error
    if (err) {
      var error = {
        status: 'ERROR',
        message: 'Error updating thing'
      };
      return res.json(error);
    }

    console.log('updated the thing!');
    console.log(data);

    // now return the json data of the new person
    var jsonData = {
      status: 'OK',
      thing: data
    }

    return res.json(jsonData);

  })

})

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the thing to delete
 * @param  {String} req.param('id'). The thingId
 * @return {Object} JSON
 */

router.get('/api/delete/:id', function(req, res) {

  var requestedId = req.param('id');

  // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
  Thing.findByIdAndRemove(requestedId, function(err, data) {
    if (err || data == null) {
      var error = {
        status: 'ERROR',
        message: 'Could not find that thing to delete'
      };
      return res.json(error);
    }

    // otherwise, respond back with success
    var jsonData = {
      status: 'OK',
      message: 'Successfully deleted id ' + requestedId
    }

    res.json(jsonData);

  })

})

module.exports = router;
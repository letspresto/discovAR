var Events = require('./events.js');

exports.events = function (req, res) {
  res.json(Events);
};

exports.event = function (req, res) {
  res.json(Events[req.param.eventId]);
};

var Upload = require('./upload');

exports.upload = function(req, res){
	res.json(upload);
}
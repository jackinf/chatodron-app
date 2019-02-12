const Room = require('../models/room.model');

exports.health = function (req, res) {
  res.json({ success: true });
};

exports.search = function (req, res, next) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  Room.paginate({}, { page, limit }, function(err, result) {
    if (err) return next(err);
    res.json({ result })
  });
};

exports.create = function (req, res, next) {
  new Room({ name: req.body.name }).save(function (err) {
    if (err) return next(err);
    res.json({ message: 'Product Created successfully' });
  })
};

exports.details = function (req, res, next) {
  Room.findById(req.params.id, function (err, item) {
    if (err) return next(err);
    res.json({ item });
  })
};

exports.update = function (req, res, next) {
  Room.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    if (err) return next(err);
    res.json({ message: 'Product udpated.' });
  });
};

exports.remove = function (req, res, next) {
  Room.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.json({ message: 'Deleted successfully!' });
  })
};

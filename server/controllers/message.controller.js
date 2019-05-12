const service = require('../services/message.service');

exports.search = (req, res, next) => {
  const page = req.query.page && parseInt(req.query.page) || 1;
  const limit = req.query.limit && parseInt(req.query.limit) || 10;
  service.search({ page, limit })
    .then(result => res.json(result))
    .catch(err => next(err));
};

exports.add = (req, res, next) => {
  const { author, room, message } = req.body;
  service.add({ author, room, message })
    .then(() => res.json({ message: 'Message created!' }))
    .catch(err => next(err));
};

exports.getLastN = (req, res, next) => service
  .getLastN({ n: parseInt(req.query.n), room: req.query.room })
  .then(result => res.json(result))
  .catch(err => next(err));
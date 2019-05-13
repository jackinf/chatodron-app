import { Request, Response } from 'express';

import Room from '../models/room.model';

export function search(req: Request, res: Response, next: any) {
  const page = req.query.page && parseInt(req.query.page) || 1;
  const limit = req.query.limit && parseInt(req.query.limit) || 10;
  Room.paginate({}, { page, limit }, function(err, result) {
    if (err) return next(err);
    res.json(result)
  });
}

export const create = function (req: Request, res: Response, next: any) {
  new Room({ name: req.body.name }).save(function (err) {
    if (err) return next(err);
    res.json({ message: 'Room created!' });
  })
};

export const details = function (req: Request, res: Response, next: any) {
  Room.findById(req.params.id, function (err, item) {
    if (err) return next(err);
    res.json(item);
  })
};

export const update = function (req: Request, res: Response, next: any) {
  Room.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
    if (err) return next(err);
    res.json({ message: 'Room updated!' });
  });
};

export const remove = function (req: Request, res: Response, next: any) {
  Room.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.json({ message: 'Deleted successfully!' });
  })
};

export default {
  search,
  create,
  details,
  update,
  remove,
}

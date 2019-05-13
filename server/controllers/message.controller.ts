import { Request, Response } from 'express';

import service from '../services/message.service';

export const search = (req: Request, res: Response, next: any) => {
  const page = req.query.page && parseInt(req.query.page) || 1;
  const limit = req.query.limit && parseInt(req.query.limit) || 10;
  service.search({ page, limit })
    .then((result: any) => res.json(result))
    .catch((err: any) => next(err));
};

export const add = (req: Request, res: Response, next: any) => {
  const { author, room, message } = req.body;
  service.add({ author, room, message })
    .then(() => res.json({ message: 'Message created!' }))
    .catch((err: any) => next(err));
};

export const getLastN = (req: Request, res: Response, next: any) => service
  .getLastN({ n: parseInt(req.query.n), room: req.query.room })
  .then((result: any) => res.json(result))
  .catch((err: any) => next(err));

export default {
  search,
  add,
  getLastN,
}

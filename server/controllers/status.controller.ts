import { Request, Response } from 'express';

export function health(req: Request, res: Response) {
  res.json({ success: true });
}

export default {
  health,
}

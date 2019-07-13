import admin from 'firebase-admin';
import { NextFunction, Request, Response } from 'express-serve-static-core';

const serviceAccount = require('./__sensitive__/chatodron-firebase-adminsdk-4u8aq-cf046722d6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatodron.firebaseio.com"
});

export async function verifyUserMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader: string | undefined = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(403).json({ error: 'No credentials sent!' });
    return;
  }

  const idToken = authorizationHeader.split(' ')[1];
  try {
    await admin.auth().verifyIdToken(idToken);
    return next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
}
import { Response, Request, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';

const isAuthorised = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res
      .status(401)
      .json({ status: false, message: 'UnAuthorized!, Token Required!' });
  }

  JWT.verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      console.log(`JWT: ${err.message}`);
      return res
        .status(401)
        .json({ status: false, error: 'UnAuthorized!, Token is not valid' });
    }

    (req as any).user = decoded;
    next();
  });
};

export default isAuthorised;

import { Response, Request, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';

const isAuthorised = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({ status: false, message: 'Token required' });
  }

  JWT.verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      console.log(`JWT: ${err.message}`);
      return res
        .status(401)
        .json({ status: false, error: 'Token is not valid' });
    }

    (req as any).user = decoded;
    next();
  });
};

export default isAuthorised;

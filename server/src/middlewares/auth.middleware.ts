import { Response, Request, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';

const Protected = (req: Request, res: Response, next: NextFunction) => {
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
        .status(403)
        .json({ status: false, error: 'Forbidden!, Token is not valid' });
    }
    (req as any).user = decoded;
    next();
  });
};

export default Protected;

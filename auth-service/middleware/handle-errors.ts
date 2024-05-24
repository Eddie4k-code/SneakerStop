import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

/* This middleware will handle returning a response for custom errors */

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeError());
  }

  res.status(400).send({
    error: "Something went really wild!" 
  });

};



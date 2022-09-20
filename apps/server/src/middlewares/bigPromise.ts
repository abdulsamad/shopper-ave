import { Request, Response, NextFunction } from 'express';

/**
 * Function to get a relief from try/catch hell
 * @param func (request, response, next: next function)
 * @returns function which returns a proimse
 */
const bigPromise =
  (func: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next);

export default bigPromise;

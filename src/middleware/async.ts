import { Request, Response, NextFunction } from "express";

export const asyncHandler = (callback: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise
      .resolve(callback(req, res, next))
      .catch(next)
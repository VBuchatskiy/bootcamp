import { Request, Response, NextFunction } from 'express';

export const getBootcamps = (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json({ message: `get collection ${request.params}` })
};

export const getBootcamp = (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json({ message: `get collection ${request.params}` })
};

export const createBootcamp = (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json({ message: `get collection ${request.params}` })
};

export const updateBootcamp = (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json({ message: `get collection ${request.params}` })
}

export const deleteBootcamp = (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json({ message: `get collection ${request.params}` })
}
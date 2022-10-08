import { Request, Response, NextFunction } from 'express';
import { async } from "@/middleware";
import { User } from '@/models';

export const register = async(async (request: Request, response: Response) => {
  const { statusCode } = response
  const { body } = request
  const { name, email, password, role } = body

  const user = await User.create({
    name,
    email,
    password,
    role
  })

  response.status(statusCode).json({
    statusCode,
  });
});
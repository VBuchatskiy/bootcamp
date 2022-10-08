import { Request, Response, NextFunction } from 'express';
import { async } from "@/middleware";
import { User } from '@/models';

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public

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

  const token = user.sing()

  response.status(statusCode).json({
    token,
  });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public

export const login = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request
  const { email, password } = body

  if (!email || !password) {
    return next({ message: 'please provide email and password' })
  }

  const user = await User.findOne({
    email
  }).select({ password: 1 })


  if (!user) {
    return next({ message: 'invalid email' })
  }

  const valid = await user.compare(password)

  if (!valid) {
    return next({ message: 'invalid credentials' })
  }

  const token = user.sing()

  response.status(statusCode).json({
    token,
  });
});
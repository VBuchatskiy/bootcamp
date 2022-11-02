import { Request, Response, NextFunction } from 'express';
import { async } from "@/middleware";
import { User } from '@/models';
import { mailer } from '@/utils';
import { createHash } from 'crypto';

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
    return next({ message: 'invalid credentials' })
  }

  const user = await User.findOne({
    email
  }).select({ password: 1 })


  if (!user) {
    return next({ message: 'invalid credentials' })
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

// @desc Send reset token
// @route POST /api/v1/auth/login
// @access Public

export const forgot = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body, protocol } = request
  const { email } = body

  const user = await User.findOne({ email })

  if (!user) {
    return next({ message: 'not found' })
  }

  const token = user.token()

  const message = `${protocol}://${request.get('host')}/reset-password/${token}`

  try {
    await mailer({
      to: user.email,
      subject: 'Reset password token',
      message
    })

    response.status(statusCode).json({})
  } catch (error) {

    Object.assign(user, {
      reset_token: ""
    })

    await user.save({
      validateBeforeSave: false
    })

    return next({ message: 'can`t send message' })
  }
})


// @desc Reset password
// @route POST /api/v1/auth/login
// @access Public

export const reset = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { body } = request
  const { password } = body

  const reset_token = createHash('sha256').update(params.token).digest('hex')

  const user = await User.findOne({ reset_token })

  if (!user) {
    return next({ message: 'not found' })
  }

  Object.assign(user, {
    password,
    reset_token: ''
  })

  await user.save()

  const token = user.sing()

  response.status(statusCode).json({
    token
  })
})
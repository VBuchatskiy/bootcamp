import { Router } from 'express'
import { register, login, forgot, reset, getUser, updateUser } from '@/controllers/auth'
import { protect } from '@/middleware/auth'

export const auth = Router()

auth.route('/user').get(protect, getUser)
auth.route('/user/:uid').put(protect, updateUser)
auth.route('/register').post(register)
auth.route('/login').post(login)
auth.route('/forgot-password').post(forgot)
auth.route('/reset-password/:token').put(reset)

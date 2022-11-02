import { Router } from 'express'
import { register, login, forgot, reset } from '@/controllers/auth'

export const auth = Router()

auth.route('/register').post(register)
auth.route('/login').post(login)
auth.route('/forgot-password').post(forgot)
auth.route('/reset-password/:token').put(reset)

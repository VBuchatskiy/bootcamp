import { Router } from 'express'
import { register, login } from '@/controllers/auth'

export const auth = Router()

auth.route('/register').post(register)
auth.route('/login').post(login)

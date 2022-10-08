import { Router } from 'express'
import { register } from '@/controllers/auth'

export const auth = Router()

auth.route('/register').post(register)

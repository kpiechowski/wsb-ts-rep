import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { param } from 'express-validator'
import { addTask } from '../../services/task.service'

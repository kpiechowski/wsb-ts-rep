import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { deleteTask } from '../../services/task.service'

export default {
    method: 'get',
    path: '/api/task/delete',
    validators: [authorize, body('taskId').not().isEmpty()],

    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                await deleteTask(req.body())
            },
        }),
} as TRoute

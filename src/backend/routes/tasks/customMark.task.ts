import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { customMark } from '../../services/task.service'
import { RequestForUser } from '../../services/task.service'
export default {
    method: 'post',
    path: '/api/task/customMark',
    validators: [
        authorize,
        body('taskId').not().isEmpty(),
        body('status').not().isEmpty(),
    ],

    handler: async (req: RequestForUser, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                const userId = req.user.id
                await customMark(req.body(), userId)
            },
        }),
} as TRoute

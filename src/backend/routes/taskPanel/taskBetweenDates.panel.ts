import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

import { getTasksBetweenDates } from '../../services/panel.service'
export default {
    method: 'post',
    path: '/api/taskPanel/get_by_date',
    validators: [
        authorize,
        body('taskId').not().isEmpty(),
        body('status').not().isEmpty(),
    ],

    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                await getTasksBetweenDates(req.body())
            },
        }),
} as TRoute

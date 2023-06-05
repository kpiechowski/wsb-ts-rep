import { prisma } from '../database'
import { v4 } from 'uuid'

export type TaskData = {
    id: string
    title: string
    complete: boolean
    description: string
    userId?: string
    deadLineDate: string
    taskStatus: string
}

export const addTask = async ({
    title,
    complete,
    description,
    deadLineDate,
}: Pick<
    TaskData,
    'title' | 'description' | 'complete' | 'deadLineDate' | 'taskStatus'
>) => {
    return await prisma.task.create({
        data: {
            id: v4(),
            title,
            description,
            complete,
            deadLineDate,
            taskStatus,
        },
    })
}

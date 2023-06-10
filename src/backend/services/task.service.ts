import { prisma } from '../database'
import { v4 } from 'uuid'
import { Request as ExpressRequest } from 'express'
export interface RequestForUser extends ExpressRequest {
    user: {
        id: string
    }
}

export type TaskData = {
    id: string
    title: string
    complete: boolean
    description: string
    userId?: string
    deadLineDate: Date
    taskStatus: string
}

export const addTask = async ({
    title,
    complete,
    description,
    deadLineDate,
}: Pick<TaskData, 'title' | 'description' | 'complete' | 'deadLineDate'>) => {
    return await prisma.task.create({
        data: {
            id: v4(),
            title,
            description,
            userId: 'empty',
            complete,
            deadLineDate,
        },
    })
}
export const markTask = async (taskId: string, userId: string) => {
    return await prisma.task.update({
        where: { id: taskId },
        data: { taskStatus: 'w toku', userId },
    })
}
export const customMark = async (
    [taskId, status]: [string, string],
    userId: string,
) => {
    return await prisma.task.update({
        where: { id: taskId },
        data: { taskStatus: status, userId },
    })
}
export const deleteTask = async (taskId: string) => {
    return await prisma.task.delete({
        where: { id: taskId },
    })
}
export const markAsComplete = async (taskId: string) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
    })

    if (!task || task.userId === 'empty') {
        throw new Error('Nie można zakończyć zadania które nie zostało zaczęte')
    }

    return await prisma.task.update({
        where: { id: taskId },
        data: { taskStatus: 'ukończono', complete: true },
    })
}

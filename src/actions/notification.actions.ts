'use server'

import { authOptions } from "@/lib/authOptions"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export const getNotifications = async () => {
    try {
        const session = await getServerSession(authOptions)
        const res = await prisma.notification.findMany({
        where: {
            userId: session?.user.uid
        },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
            post: {
                select: {
                    content: true,
                }
            },
            comment: {
                select: {
                    content: true
                }
            }
        },
        orderBy: {
            createdAt:'desc'
        }
    })
    return res
    } catch (error) {
        return null
    }
}
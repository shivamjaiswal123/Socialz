'use server'

import { prisma } from "@/lib/prisma"

export const getUserById = async (uid: string) => {
    try {
        return await prisma.user.findUnique({
            where: { id: uid },
            include: {
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        posts: true
                    }
                }
            }
        })
    } catch (error) {
        console.log("Error in getting user by id")
    }
}
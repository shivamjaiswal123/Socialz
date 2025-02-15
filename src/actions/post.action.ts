'use server'

import { authOptions } from "@/lib/authOptions"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export const createPost = async (content: string, imageUrl: string) => {
    const session = await getServerSession(authOptions)

    try {
        const post = await prisma.post.create({
            data: {
                content,
                image: imageUrl,
                authorId: session?.user.uid
            }
        })
        return { success: true, post }
    } catch (error) {
        console.log('Error in posting content')
        return { success: false, message: "Error in posting content" }
    }
}
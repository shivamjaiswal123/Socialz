'use server'

import { authOptions } from "@/lib/authOptions"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

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
        revalidatePath('/')
        return { success: true, post }
    } catch (error) {
        console.log('Error in posting content')
        return { success: false, message: "Error in posting content" }
    }
}

export const getAllPosts = async () => {
    try {
        const posts  = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            }
        })
        return posts
    } catch (error) {
        console.log("Error in getting posts", error);
        throw new Error("Failed to fetch posts");
    }
}

export const toggleLike = async (postId: string) => {
    const session = await getServerSession(authOptions)

    if(!session) {
        return {success: false, message: "You are not authenticated"}
    }
    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId: session?.user.uid,
                    postId
                }
            }
        })

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                authorId: true
            }
        })

        if(!post) {
            return {success: false, message: "Post does not exist !"}
        }

        if(existingLike) {
            // unlike
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId: session?.user.uid,
                        postId
                    }
                }
            })
        } else {
            // like and create notification (only create notif if user liking someone else post)
            await prisma.$transaction([
                prisma.like.create({
                    data: {
                        userId: session?.user.uid,
                        postId
                    }
                }),
                ...(post.authorId !== session?.user.uid 
                    ? [
                        prisma.notification.create({
                        data: {
                            type: 'LIKE',
                            userId: post.authorId,        // recipient (post author)
                            creatorId: session?.user.uid, // user who liked
                            postId
                        }
                    })]: []) 
            ])
        }
        revalidatePath('/')
        return { success: true, message: "Like done"}
    } catch (error) {
        return {success: false, message: "Something went wrong !"}
    }
}

export const createComment = async (postId: string, content: string) => {
    const session = await getServerSession(authOptions)

    if(!session) {
        return {success: false, message: "You are not authenticated"}
    }

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            select: {
                authorId: true
            }
        })
        if(!post) {
            return { success: false, message: "Post does not exist!" }
        }

        const comment = await prisma.$transaction([
            prisma.comment.create({
                data: {
                    postId,
                    content,
                    authorId: session?.user.uid
                }
            }),
            ...(post.authorId !== session?.user.uid 
                ? [
                    prisma.notification.create({
                    data: {
                        type: 'COMMENT',
                        userId: post.authorId,        // recipient (post author)
                        creatorId: session?.user.uid, // user who liked
                        postId
                    }
                })]: []) 
        ])

        revalidatePath('/')
        return {success: true, comment}
    } catch (error) {
        return {success: false, message: "Something went wrong !"}
    }
}
'use server'

import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

interface UserProps {
    username: string,
    email: string,
    password: string
}

export const signup = async ({username, email, password}: UserProps) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            },
            select: {
                id: true,
                email: true
            }
        })

        if(existingUser) {
            return { success: false, message: "User with this email already exist"}
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        // create new user
        await prisma.user.create({
            data: {
                name: username,
                username: email.split("@")[0],
                email,
                password: hashedPassword
            }
        })

        return { success: true, message: "Signup successful"}
    } catch (error) {
        // console.log("Error while signing up: ", error)
        return { success: false, message: "Something went wrong"}
    }
}

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

export const getRandomUsers = async () => {
    try {
        const session = await getServerSession(authOptions);

        return await prisma.user.findMany({
            where: {
                AND: [
                    { NOT: { id: session.user.uid } },
                    { NOT: { followers: { some : { followerId : session.user.uid }} }}
                ]
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
            },
            take: 3
        })
    } catch (error) {
        return []
    }
}

export const toggleFollow = async (targetUserId: string) => {
    const session = await getServerSession(authOptions)
    const userId = session.user.uid

    try {
        if(userId === targetUserId) {
            throw new Error ("You can't follow yourself")
        }

        const existingFollow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: targetUserId
                }
            }
        })

        if(existingFollow) {
            // unfollow
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: targetUserId
                    }
                }
            })
        }else {
            // follow
            await prisma.$transaction([
                prisma.follows.create({
                    data: {
                        followerId: userId,         // userId is the person who follows
                        followingId: targetUserId   // targetUserId is the person being followed
                    }
                }),

                prisma.notification.create({
                    data: {
                        type: 'FOLLOW',
                        userId: targetUserId,
                        creatorId: userId
                    }
                })
            ])
        }

        return { success: true }
    } catch (error) {
        // console.log("Error in toggleFlow: ", error)
        return { success: false }
    }
}
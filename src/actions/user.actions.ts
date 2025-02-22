'use server'

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";

interface UserProps {
    username: string,
    email: string,
    password: string
}

export const signup = async ({username, email, password}: UserProps) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            },
            select: {
                id: true,
                username: true
            }
        })

        if(existingUser) {
            if(existingUser.username === username) {
                return { success: false, message: "Username is already taken"}
            } else {
                return { success: false, message: "User with this email already exist"}
            }
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        await prisma.user.create({
            data: {
                username,
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
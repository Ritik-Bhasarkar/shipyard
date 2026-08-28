import { prisma } from "db/client";

export async function createUser(username: string, password: string){
    return prisma.user.create({
       data:{
        username,
        password
       }
    })
}

export async function getUsers(){
    return prisma.user.findMany();
}

export async function findUserByID(userId: string){
    return prisma.user.findUnique({
        where: {
            userId
        }
    })
}

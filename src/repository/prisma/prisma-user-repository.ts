import { Prisma } from "@prisma/client";
import { UserRepository } from "@/repository/user-repository";
import { prisma } from "@/prisma";

export class PrismaUserRepository implements UserRepository {
  async createUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
  
  async findById(id: string){
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

}
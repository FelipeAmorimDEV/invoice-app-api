import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { prisma } from "../../prisma";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []


  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)
  
    if(!user) {
      return null
    }

    return user
  }
  
  async createUser(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password
    }

    this.users.push(user)

    return user
  }

}
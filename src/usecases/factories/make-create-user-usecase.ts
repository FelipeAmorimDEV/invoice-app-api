import { PrismaUserRepository } from "@/repository/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../create-user-usecase";

export function makeCreateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  return createUserUseCase
}
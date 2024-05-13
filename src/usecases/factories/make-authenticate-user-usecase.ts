import { PrismaUserRepository } from "@/repository/prisma/prisma-user-repository";
import { AuthenticateUserUseCase } from "../authenticate-user-usecase";

export function makeAuthenticateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

  return authenticateUserUseCase
}
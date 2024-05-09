import { User } from "@prisma/client";
import { UserRepository } from "../repository/user-repository";
import { CredentialsAreIncorrects } from "./errors/credentials-are-incorrect-error";
import { compare } from "bcryptjs";

interface AuthenticateParamsUseCase {
  email: string
  password: string
}

interface AuthenticateResponseUseCase {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository){}

  async execute({email, password}: AuthenticateParamsUseCase): Promise<AuthenticateResponseUseCase> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new CredentialsAreIncorrects()
    } 

    const isCorrectPassword = await compare(password, user.password)

    if (!isCorrectPassword) {
      throw new CredentialsAreIncorrects()
    }

    return { user }
  }
}
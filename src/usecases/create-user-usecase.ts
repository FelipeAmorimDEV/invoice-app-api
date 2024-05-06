import { User } from "@prisma/client"
import { UserRepository } from "../repository/user-repository"
import { hash } from "bcryptjs"

interface CreateUserUseCaseParams {
  name: string
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}


export class CreateUserUseCase {
  constructor(private userRepository: UserRepository){}

  async execute({name, email, password}: CreateUserUseCaseParams): Promise<CreateUserUseCaseResponse> {
    const isEmailAlreadyExist =  await this.userRepository.findByEmail(email)

    if (isEmailAlreadyExist) {
      throw new Error('Email already exist')
    }
  
    const password_hash = await hash(password, 6)
  
    const user = await this.userRepository.createUser({name, email, password: password_hash})

    return { user }
  }
}
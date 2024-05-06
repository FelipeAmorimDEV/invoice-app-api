import { describe, it, beforeEach, expect} from 'vitest'
import { UserRepository } from '../repository/user-repository'
import { CreateUserUseCase } from './create-user-usecase'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { compare } from 'bcryptjs'
import { EmailAlreadyExists } from './errors/email-already-exists'

let userRepository: UserRepository
let sut: CreateUserUseCase
describe('Create user usecases', async () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to hash password', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const hashCompare = await compare('123456', user.password)

    expect(hashCompare).toBe(true)
  })

  it('should be not able to create user with duplicate e-mail', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExists)
  })

})
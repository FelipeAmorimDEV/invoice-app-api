import { describe, it, beforeEach, expect} from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-user-usecase'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { CredentialsAreIncorrects } from './errors/credentials-are-incorrect-error'

let userRepository:InMemoryUserRepository
let sut: AuthenticateUserUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUserUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    userRepository.createUser({
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      name: 'John Doe'
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user).toEqual(expect.objectContaining({
      id: expect.any(String)
    }))
  })

  it('should be not able to authenticate with wrong e-mail', async () => {
    expect(() => 
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(CredentialsAreIncorrects)
  })

  it('should be not able to authenticate with wrong password', async () => {
    userRepository.createUser({
      email: 'johndoe@example.com',
      password: '123456',
      name: 'John Doe'
    })

    
    await expect(() => 
      sut.execute({
        email: 'johndoe@example.com',
        password: '1234567'
      })
    ).rejects.toBeInstanceOf(CredentialsAreIncorrects)
  })
})
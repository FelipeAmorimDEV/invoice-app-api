import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUserUseCase } from '@/usecases/factories/make-authenticate-user-usecase'
import { CredentialsAreIncorrects } from '@/usecases/errors/credentials-are-incorrect-error'

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  try {
    const authenticateUserCase = makeAuthenticateUserUseCase()
    await authenticateUserCase.execute({ email, password })
  } catch (error) {
    if (error instanceof CredentialsAreIncorrects) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }


  return reply.status(200).send()
}

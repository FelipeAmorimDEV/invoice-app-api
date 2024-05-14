import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserUseCase } from '@/usecases/factories/make-create-user-usecase'
import { EmailAlreadyExists } from '@/usecases/errors/email-already-exists'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = requestBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()
    await createUserUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof EmailAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }


  return reply.status(201).send()
}

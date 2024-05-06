import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { prisma } from '../../prisma'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = requestBodySchema.parse(request.body)

  const isEmailAlreadyExist = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (isEmailAlreadyExist) {
    throw new Error('Email already exist')
  }

  const password_hash = await hash(password, 6)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: password_hash,
    },
  })

  return reply.status(201).send()
}

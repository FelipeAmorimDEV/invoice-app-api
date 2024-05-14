import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateInvoiceUseCase } from '@/usecases/factories/make-create-invoice-usecase'
import { ResouceNotFoundError } from '@/usecases/errors/resource-not-found-error'

export async function createInvoice(request: FastifyRequest, reply: FastifyReply) {
  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    postCode: z.string(),
    country: z.string()
  })

  const itemsSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    total: z.number()
  })

  //Remover o userId
  const requestBodySchema = z.object({
    description: z.string(),
    clientName: z.string(),
    clientEmail: z.string(),
    status: z.string(),
    terms: z.number(),
    senderAddress: addressSchema,
    clientAddress: addressSchema,
    items: z.array(itemsSchema),
    userId: z.string()
  })

  const { description, clientName, clientEmail, clientAddress, senderAddress, terms, status, items, userId } = requestBodySchema.parse(request.body)

  try {
    const createInvoiceUseCase = makeCreateInvoiceUseCase()
    await createInvoiceUseCase.execute({ description, clientName, clientEmail, clientAddress, senderAddress, status, terms, items, userId })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResouceNotFoundError) {
      return reply.status(403).send({ message: error.message })
    }

    throw error
  }
}

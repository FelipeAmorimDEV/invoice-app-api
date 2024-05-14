import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResouceNotFoundError } from '@/usecases/errors/resource-not-found-error'
import { makeMarkInvoiceAsPaidUseCase } from '@/usecases/factories/make-mark-invoice-as-paid-usecase'
import { makeEditInvoiceUseCase } from '@/usecases/factories/make-edit-invoice-usecase'

export async function editInvoice(request: FastifyRequest, reply: FastifyReply) {
  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    postCode: z.string(),
    country: z.string()
  }).optional()

  const itemsSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    total: z.number()
  })

  //Remover o userId
  const requestBodySchema = z.object({
    description: z.string().optional(),
    clientName: z.string().optional(),
    clientEmail: z.string().optional(),
    terms: z.number(),
    senderAddress: addressSchema,
    clientAddress: addressSchema,
    items: z.array(itemsSchema).optional(),
    createdAt: z.string()
  })

  const requestParamsSchema = z.object({
    id: z.coerce.number()
  })

  const { clientName, clientEmail, description, clientAddress, terms, senderAddress, items, createdAt } = requestBodySchema.parse(request.body)
  const { id } = requestParamsSchema.parse(request.params)

  try {
    const editInvoiceUseCase = makeEditInvoiceUseCase()
    await editInvoiceUseCase.execute({ clientName,clientEmail,description,clientAddress,terms,senderAddress,items, id, createdAt })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResouceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}

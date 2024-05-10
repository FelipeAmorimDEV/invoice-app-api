import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateInvoiceUseCase } from '../../usecases/factories/make-create-invoice-user-case'

export async function createInvoice(request: FastifyRequest, reply: FastifyReply) {
  const itemsSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    total: z.number(),
  })

  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    postCode: z.string(),
    country: z.string()
  })

  const requestBodySchema = z.object({
    description: z.string(),
    dueAt: z.string(),
    status: z.string(),
    terms: z.string(),
    clientName: z.string(),
    clientEmail: z.string(),
    senderAddress: addressSchema,
    clientAddress: addressSchema,
    total: z.number(),
    userId: z.string(),
    items: z.array(itemsSchema),
  })

  const { clientEmail,clientName,description,dueAt,status,terms,userId,total, items, senderAddress, clientAddress } = requestBodySchema.parse(request.body)

 const createInvoiceUseCase = makeCreateInvoiceUseCase()

 const { invoice } = await createInvoiceUseCase.execute({
  userId,
  clientName,
  clientEmail,
  description,
  total,
  dueAt,
  terms,
  status,
  senderAddress,
  clientAddress,
  items
 })

  return reply.status(201).send(invoice)
}

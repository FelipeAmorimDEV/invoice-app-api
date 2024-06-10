import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResouceNotFoundError } from '@/usecases/errors/resource-not-found-error'
import { makeMarkInvoiceAsPaidUseCase } from '@/usecases/factories/make-mark-invoice-as-paid-usecase'

export async function markStatusAsPaid(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    id: z.string(),
  })

  const { id } = requestBodySchema.parse(request.params)

  try {
    const markInvoiceAsPaid = makeMarkInvoiceAsPaidUseCase()
    const { invoice } = await markInvoiceAsPaid.execute({ id: Number(id) })

    return reply.status(200).send({ invoice })
  } catch (error) {
    if (error instanceof ResouceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}

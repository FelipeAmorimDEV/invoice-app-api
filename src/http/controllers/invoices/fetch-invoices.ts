import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchInvoicesUseCase } from '@/usecases/factories/make-fetch-invoices-usecase'

export async function fetchInvoices(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    userId: z.string()
  })

  const { userId } = requestBodySchema.parse(request.query)

  const fetchInvoicesUseCase = makeFetchInvoicesUseCase()
  const { invoices } = await fetchInvoicesUseCase.execute({ userId })

  return reply.status(200).send({ invoices })
}

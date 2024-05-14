import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetInvoiceUseCase } from '@/usecases/factories/make-get-invoice-usecase'
import { ResouceNotFoundError } from '@/usecases/errors/resource-not-found-error'

export async function getInvoice(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    id: z.string(),
  })

  const { id } = requestBodySchema.parse(request.params)

  try {
    const getInvoiceUseCase = makeGetInvoiceUseCase()
    const { invoice } = await getInvoiceUseCase.execute({ id: Number(id) })

    return reply.status(200).send({ invoice })
  } catch (error) {
    if (error instanceof ResouceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}

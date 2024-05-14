import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteInvoiceUseCase } from '@/usecases/factories/make-delete-invoice-usecase'
import { ResouceNotFoundError } from '@/usecases/errors/resource-not-found-error'

export async function deleteInvoice(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchemma = z.object({
    id: z.string()
  })

  const { id } = requestParamsSchemma.parse(request.params)

  try {
    const deleteInvoiceUseCase = makeDeleteInvoiceUseCase()
    await deleteInvoiceUseCase.execute({ id: Number(id) })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResouceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}

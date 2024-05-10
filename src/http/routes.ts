import { FastifyInstance} from 'fastify'
import { createUser } from './controllers/create-user'
import { createInvoice } from './controllers/create-invoice'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/invoices', createInvoice)
}

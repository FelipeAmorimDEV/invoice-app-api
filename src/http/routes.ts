import { FastifyInstance} from 'fastify'
import { createUser } from './controllers/user/create-user'
import { authenticateUser } from './controllers/user/authenticate-user'
import { createInvoice } from './controllers/invoices/create-invoice'
import { fetchInvoices } from './controllers/invoices/fetch-invoices'
import { getInvoice } from './controllers/invoices/get-invoice'
import { deleteInvoice } from './controllers/invoices/delete-invoice'
import { markStatusAsPaid } from './controllers/invoices/paid-status'
import { editInvoice } from './controllers/invoices/edit-invoice'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/users/login', authenticateUser)

  app.post('/invoices', createInvoice)
  app.get('/invoices/:id', getInvoice)
  app.get('/invoices', fetchInvoices)
  app.delete('/invoices/:id', deleteInvoice)
  app.patch('/invoices/:id', markStatusAsPaid)
  app.put('/invoices/:id', editInvoice)
}

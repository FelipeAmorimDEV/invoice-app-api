import { describe, it, beforeEach, expect, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../../app'
import { prisma } from '../../prisma'



describe('Create Invoice Use Case', async () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to create a new invoice', async () => {
    const { id } = await prisma.user.findFirstOrThrow()

    const invoiceRequest = await request(app.server).post('/invoices').send({
      description: "Re-branding",
      terms: "1",
      dueAt: new Date(),
      clientName: "Jensen Huang",
      clientEmail: "jensenh@mail.com",
      status: "paid",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom"
      },
      clientAddress: {
        street: "106 Kendell Street",
        city: "Sharrington",
        postCode: "NR24 5WQ",
        country: "United Kingdom"
      },
      items: [
        {
          name: "Brand Guidelines",
          quantity: 1,
          price: 1800.90,
          total: 1800.90
        },
        {
          name: "Brand Guidelines 2",
          quantity: 1,
          price: 1800.90,
          total: 1800.90
        }
      ],
      total: 1800.90,
      userId: id
    })

    expect(invoiceRequest.status).toEqual(201)
    expect(invoiceRequest.body).toEqual(expect.objectContaining({
      id: expect.any(Number)
    }))

  })
})
import request from 'supertest'
import { app } from "@/app";
import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { prisma } from '@/prisma';

describe("Fetch Invoices e2e", () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to fetch the invoices', async () => {
    await prisma.user.create({
      data: {
        name: 'john doe',
        email: 'johndoe@example.com',
        password: '123456'
      }
    })

    const user = await prisma.user.findFirstOrThrow()

    await prisma.invoice.create({
      data: {
        description: "Re-branding",
        terms: 1,
        dueAt: new Date('07/11/24'),
        total: 1500.20,
        clientName: "Jensen Huang",
        clientEmail: "jensenh@mail.com",
        status: "paid",
        senderAddress: JSON.stringify({
          street: "19 Union Terrace",
          city: "London",
          postCode: "E1 3EZ",
          country: "United Kingdom"
        }),
        clientAddress: JSON.stringify({
          street: "106 Kendell Street",
          city: "Sharrington",
          postCode: "NR24 5WQ",
          country: "United Kingdom"
        }),
        items: [
          {
            name: "Brand Guidelines",
            quantity: 1,
            price: 1800.90,
            total: 1800.90
          }
        ],
        userId: user.id
      }
    })

    const response = await request(app.server)
      .get('/invoices')
      .query({'userId': user.id})
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.invoices).toHaveLength(1)
    expect(response.body.invoices).toEqual([expect.objectContaining({
      description: "Re-branding",
    })])


  })
})
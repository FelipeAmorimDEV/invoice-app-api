import { describe, it, beforeEach, expect } from 'vitest'

import { InMemoryInvoiceRepository } from '@/repository/in-memory-repository/in-memory-invoice-repository'
import { ResouceNotFoundError } from './errors/resource-not-found-error'
import { MarkInvoiceAsPaidUseCase } from './make-invoice-as-paid'

let invoiceRepository: InMemoryInvoiceRepository
let sut: MarkInvoiceAsPaidUseCase

describe('Mark Invoice As Paid Use Case', async () => {
  beforeEach(() => {
    invoiceRepository = new InMemoryInvoiceRepository()
    sut = new MarkInvoiceAsPaidUseCase(invoiceRepository)
  })

  it('should be able to mark a invoice as paid', async () => {
    invoiceRepository.createInvoice({
      id: 1,
      dueAt: '2021-08-19',
      description: "Re-branding",
      terms: "1",
      clientName: "Jensen Huang",
      clientEmail: "jensenh@mail.com",
      status: "pending",
      senderAddress: {
        "street": "19 Union Terrace",
        "city": "London",
        "postCode": "E1 3EZ",
        "country": "United Kingdom"
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
        }
      ],
      total: 1800.90,
      userId: 'user-1'
    })

    const { invoice } = await sut.execute({ id: 1 })

    expect(invoice).toEqual(expect.objectContaining({
      status: 'paid'
    }))
  })

  it('should not be able to mark as paid an inexistent invoice', async () => {
    await expect(() => 
      sut.execute({id: 1})
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })
})
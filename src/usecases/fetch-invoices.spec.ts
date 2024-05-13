import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryInvoiceRepository } from '@/repository/in-memory-repository/in-memory-invoice-repository'
import { FetchInvoiceUseCase } from './fetch-invoices-usecase'


let invoiceRepository: InMemoryInvoiceRepository
let sut: FetchInvoiceUseCase

describe('Fetch Invoices Use Case', async () => {
  beforeEach(() => {
    invoiceRepository = new InMemoryInvoiceRepository()
    sut = new FetchInvoiceUseCase(invoiceRepository)
  })

  it('should be able to get all user invoice', async () => {
    await invoiceRepository.createInvoice({
      dueAt: '2021-08-19',
      description: "Re-branding",
      terms: "1",
      clientName: "Jensen Huang",
      clientEmail: "jensenh@mail.com",
      status: "paid",
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

    await invoiceRepository.createInvoice({
      dueAt: '2021-08-19',
      description: "Re-branding",
      terms: "1",
      clientName: "Jensen Huang",
      clientEmail: "jensenh@mail.com",
      status: "paid",
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

    const { invoices } = await sut.execute({userId: 'user-1'})


    expect(invoices).toHaveLength(2)
    expect(invoices).toEqual([
      expect.objectContaining({
        clientName: 'Jensen Huang'
      }),
      expect.objectContaining({
        clientName: 'Jensen Huang'
      })
    ])
  })

  it('should be able to get none invoice with user that has not registered invoice', async () => {
    const { invoices } = await sut.execute({userId: 'inexistent-user'})
   
    expect(invoices).toHaveLength(0)
  })
})
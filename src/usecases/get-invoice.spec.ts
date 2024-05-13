import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryInvoiceRepository } from '@/repository/in-memory-repository/in-memory-invoice-repository'
import { GetInvoiceUseCase } from './get-invoice-usecase'
import { ResouceNotFoundError } from './errors/resource-not-found-error'


let invoiceRepository: InMemoryInvoiceRepository
let sut: GetInvoiceUseCase

describe('Get Invoice Use Case', async () => {
  beforeEach(() => {
    invoiceRepository = new InMemoryInvoiceRepository()
    sut = new GetInvoiceUseCase(invoiceRepository)
  })

  it('should be able to get a invoice', async () => {
    const { id } = await invoiceRepository.createInvoice({
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

    const { invoice } = await sut.execute({ id })

    expect(invoice).toEqual(expect.objectContaining({
      description: 'Re-branding'
    }))
  })

  it('should not be able to get a invoice that does not exist', async () => {
    await expect(() => 
      sut.execute({ id: 10 })
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })
})
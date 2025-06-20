import { describe, it, beforeEach, expect } from 'vitest'

import { CreateInvoiceUseCase } from './create-invoice-usecase'
import { InMemoryInvoiceRepository } from '@/repository/in-memory-repository/in-memory-invoice-repository'
import { InMemoryUserRepository } from '@/repository/in-memory-repository/in-memory-user-repository'
import { ResouceNotFoundError } from './errors/resource-not-found-error'
import { EditInvoiceUseCase } from './edit-invoice-use-case'

let invoiceRepository: InMemoryInvoiceRepository
let sut: EditInvoiceUseCase

describe('Edit Invoice Use Case', async () => {
  beforeEach(() => {
    invoiceRepository = new InMemoryInvoiceRepository()
    sut = new EditInvoiceUseCase(invoiceRepository)
  })

  it('should be able to edit a invoice', async () => {
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

    const { invoice } = await sut.execute({
      dueAt: '2021-08-19',
      description: "Criação de logo",
      terms: "1",
      clientName: "John Doe",
      clientEmail: "johndoe@example.com",
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
          name: "Logo",
          quantity: 1,
          price: 180.90,
          total: 180.90
        }
      ],
      total: 1800.90,
      userId: 'user-1',
      id
    })

    expect(invoice).toEqual(expect.objectContaining({
      description: 'Criação de logo',
      clientName: 'John Doe',
      clientEmail: 'johndoe@example.com'
    }))
  })

  it('should not be able to edit a inexistent invoice', async () => {
    await expect(() => 
      sut.execute({
        dueAt: '2021-08-19',
        description: "Criação de logo",
        terms: "1",
        clientName: "John Doe",
        clientEmail: "johndoe@example.com",
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
            name: "Logo",
            quantity: 1,
            price: 180.90,
            total: 180.90
          }
        ],
        total: 1800.90,
        userId: 'user-1',
        id: 4
      })
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })
})
import { describe, it, beforeEach, expect } from 'vitest'

import { CreateInvoiceUseCase } from './create-invoice-usecase'
import { InMemoryInvoiceRepository } from '../repository/in-memory-repository/in-memory-invoice-repository'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { ResouceNotFoundError } from './errors/resource-not-found-error'

let invoiceRepository: InMemoryInvoiceRepository
let userRepository: InMemoryUserRepository
let sut: CreateInvoiceUseCase

describe('Create Invoice Use Case', async () => {
  beforeEach(() => {
    invoiceRepository = new InMemoryInvoiceRepository()
    userRepository = new InMemoryUserRepository()
    sut = new CreateInvoiceUseCase(invoiceRepository, userRepository)
  })

  it('should be able to create a new invoice', async () => {
    userRepository.createUser({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const { invoice } = await sut.execute({
      createdAt: new Date('2021-08-18'),
      dueAt: new Date('2021-08-19'),
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


    expect(invoice).toEqual(expect.objectContaining({
      id: expect.any(Number)
    }))
  })

  it('should not be able to create a new invoice without being authenticated', async () => {
    await expect(() =>
      sut.execute({
        createdAt: new Date('2021-08-18'),
        dueAt: new Date('2021-08-19'),
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
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })
})
import { Invoice } from "@prisma/client";
import { InvoiceRepository } from "../repository/invoice-repository";
import { UserRepository } from "../repository/user-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";

interface CreateInvoiceUseCaseParams {
  description: string
  dueAt: string
  status: string
  terms: string
  clientName: string
  clientEmail: string
  senderAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  clientAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  items: {
    name: string
    quantity: number
    price: number
    total: number
  }[]
  total: number
  userId: string
}

interface CreateInvoiceUseCaseResponse {
  invoice: Invoice
}

export class CreateInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository, private userRepository: UserRepository) { }

  async execute({ description, clientName, clientEmail, clientAddress, senderAddress, status, terms, dueAt, items, total, userId }: CreateInvoiceUseCaseParams): Promise<CreateInvoiceUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResouceNotFoundError()
    }


    const invoice = await this.invoiceRepository.createInvoice({
      description, clientName, clientEmail, clientAddress, senderAddress, status, terms, dueAt, items, total, userId 
    })

    return { invoice }
  }
}
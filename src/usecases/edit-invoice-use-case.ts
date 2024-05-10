import { Invoice } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";
import { UserRepository } from "@/repository/user-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";

interface EditInvoiceUseCaseParams {
  id: number
  userId: string
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
}

interface EditInvoiceUseCaseResponse {
  invoice: Invoice
}

export class EditInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) { }

  async execute({ description, clientName, clientEmail, clientAddress, senderAddress, status, terms, dueAt, items, total, id, userId}: EditInvoiceUseCaseParams): Promise<EditInvoiceUseCaseResponse> {
    const invoice = await this.invoiceRepository.editInvoice(id, { description, clientName, clientEmail, clientAddress, senderAddress, status, terms, dueAt, items, total, userId })

    if (!invoice) {
      throw new ResouceNotFoundError()
    }

    return { invoice }
  }
}
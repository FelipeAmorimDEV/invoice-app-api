import { Invoice } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";
import { addDays } from "date-fns";

interface EditInvoiceUseCaseParams {
  id: number
  description?: string 
  terms: number
  createdAt: string | Date
  clientName?: string
  clientEmail?: string 
  senderAddress?: {
    street: string
    city: string
    postCode: string
    country: string
  }
  clientAddress?: {
    street: string
    city: string
    postCode: string
    country: string
  } 
  items?: {
    name: string
    quantity: number
    price: number
    total: number
  }[]
}

interface EditInvoiceUseCaseResponse {
  invoice: Invoice
}

export class EditInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) { }

  async execute({ description, clientName, clientEmail, clientAddress, senderAddress,terms, items, id, createdAt}: EditInvoiceUseCaseParams): Promise<EditInvoiceUseCaseResponse> {

    const dueAt = addDays(new Date(createdAt), terms)
    const total = items ? items.reduce((acc,item) => acc+= item.total, 0) : 0

    const date = { description, clientName, clientEmail, clientAddress, senderAddress, terms, dueAt, items, total }

    const invoice = await this.invoiceRepository.editInvoice(id, date)

    if (!invoice) {
      throw new ResouceNotFoundError()
    }

    return { invoice }
  }
}
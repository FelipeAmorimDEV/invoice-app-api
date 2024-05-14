import { Invoice } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";
import { UserRepository } from "@/repository/user-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";
import { addDays } from 'date-fns'

//Mudar term para número

type Address  = {
  street: string
  city: string
  postCode: string
  country: string
}

type Items = {
  name: string
  quantity: number
  price: number
  total: number
}

interface CreateInvoiceUseCaseParams {
  description: string
  status: string
  terms: number
  clientName: string
  clientEmail: string
  senderAddress: Address
  clientAddress: Address
  items: Items[]
  userId: string
}

interface CreateInvoiceUseCaseResponse {
  invoice: Invoice
}

export class CreateInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository, private userRepository: UserRepository) { }

  async execute({ description, clientName, clientEmail, clientAddress, senderAddress, status, terms, items, userId }: CreateInvoiceUseCaseParams): Promise<CreateInvoiceUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResouceNotFoundError()
    }

    const dueAt = addDays(new Date(), terms)
    const total = items.reduce((acc,item) => acc+= item.total, 0)

    const invoice = await this.invoiceRepository.createInvoice({
      description, clientName, clientEmail, clientAddress, senderAddress, status, terms, dueAt, items, total, userId
    })

    return { invoice }
  }
}
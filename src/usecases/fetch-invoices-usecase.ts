import { InvoiceRepository } from "@/repository/invoice-repository"
import { Invoice } from "@prisma/client"

interface FetchInvoiceUseCaseParams {
  userId: string
}

interface FetchInvoiceUseCaseResponse {
  invoices: Invoice[]
}

export class FetchInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) { }
  async execute({ userId }: FetchInvoiceUseCaseParams): Promise<FetchInvoiceUseCaseResponse> {
    const invoices = await this.invoiceRepository.fetchManyById(userId)

    return { invoices }
  }
}
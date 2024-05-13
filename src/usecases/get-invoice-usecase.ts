import { InvoiceRepository } from "@/repository/invoice-repository"
import { Invoice } from "@prisma/client"
import { ResouceNotFoundError } from "./errors/resource-not-found-error"

interface GetInvoiceUseCaseParams {
  id: number
}

interface GetInvoiceUseCaseResponse {
  invoice: Invoice
}

export class GetInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository){}
  async execute({ id }: GetInvoiceUseCaseParams): Promise<GetInvoiceUseCaseResponse>{
    const invoice = await this.invoiceRepository.getById(id)

    if (!invoice) {
      throw new ResouceNotFoundError()
    }

    return { invoice }
  }
}
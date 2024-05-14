import { Invoice } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";


//Mudar term para número
interface MakeInvoiceAsPaidUseCaseParams {
  id: number
}

interface MakeInvoiceAsPaidUseCaseResponse {
  invoice: Invoice
}

export class MarkInvoiceAsPaidUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {} 

  async execute({ id }: MakeInvoiceAsPaidUseCaseParams): Promise<MakeInvoiceAsPaidUseCaseResponse> {
    const invoice = await this.invoiceRepository.markInvoiceAsPaid(id)

    if (!invoice) {
      throw new ResouceNotFoundError()
    }

    return { invoice }
  }
}
import { Invoice } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";
import { ResouceNotFoundError } from "./errors/resource-not-found-error";


//Mudar term para número
interface DeleteInvoiceUseCaseParams {
  id: number
}

interface DeleteInvoiceUseCaseResponse {
  invoice: Invoice[]
}

export class DeleteInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {} 

  async execute({ id }: DeleteInvoiceUseCaseParams): Promise<DeleteInvoiceUseCaseResponse> {
    const invoice = await this.invoiceRepository.deleteInvoice(id)

    if (!invoice) {
      throw new ResouceNotFoundError()
    }

    return { invoice }
  }
}
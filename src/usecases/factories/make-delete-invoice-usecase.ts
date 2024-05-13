import { DeleteInvoiceUseCase } from "../delete-invoice-usecase";
import { PrismaInvoiceRepository } from "@/repository/prisma/prisma-invoice-repository";

export function makeDeleteInvoiceUseCase() {
  const invoiceRepository = new PrismaInvoiceRepository()
  const deleteInvoiceUseCase = new DeleteInvoiceUseCase(invoiceRepository)

  return deleteInvoiceUseCase
}
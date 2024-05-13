import { PrismaInvoiceRepository } from "@/repository/prisma/prisma-invoice-repository";
import { EditInvoiceUseCase } from "../edit-invoice-use-case";

export function makeEditInvoiceUseCase() {
  const invoiceRepository = new PrismaInvoiceRepository()
  const editInvoiceUseCase = new EditInvoiceUseCase(invoiceRepository)

  return editInvoiceUseCase
}
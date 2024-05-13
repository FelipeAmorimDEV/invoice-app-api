import { PrismaInvoiceRepository } from "@/repository/prisma/prisma-invoice-repository";
import { GetInvoiceUseCase } from "../get-invoice-usecase";

export function makeGetInvoiceUseCase() {
  const invoiceRepository = new PrismaInvoiceRepository()
  const getInvoiceUseCase = new GetInvoiceUseCase(invoiceRepository)

  return getInvoiceUseCase
}
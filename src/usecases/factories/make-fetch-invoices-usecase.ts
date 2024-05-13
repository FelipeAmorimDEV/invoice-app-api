import { PrismaInvoiceRepository } from "@/repository/prisma/prisma-invoice-repository";
import { FetchInvoiceUseCase } from "../fetch-invoices-usecase";

export function makeFetchInvoicesUseCase() {
  const invoiceRepository = new PrismaInvoiceRepository()
  const fetchInvoicesUseCase = new FetchInvoiceUseCase(invoiceRepository)

  return fetchInvoicesUseCase
}
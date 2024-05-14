import { PrismaInvoiceRepository } from "@/repository/prisma/prisma-invoice-repository";
import { MarkInvoiceAsPaidUseCase } from "../mark-invoice-as-paid-usecase";

export function makeMarkInvoiceAsPaidUseCase() {
  const invoiceRepository = new PrismaInvoiceRepository()
  const makeInvoiceAsPaidUseCase = new MarkInvoiceAsPaidUseCase(invoiceRepository)

  return makeInvoiceAsPaidUseCase
}
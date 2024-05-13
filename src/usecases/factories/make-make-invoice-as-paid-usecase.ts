import { PrismaInvoiceRepository } from "@/repository/prisma/prisma-invoice-repository";
import { MarkInvoiceAsPaidUseCase } from "../make-invoice-as-paid";

export function makeMakeInvoiceAsPaidUseCase() {
  const invoiceRepository = new PrismaInvoiceRepository()
  const makeInvoiceAsPaidUseCase = new MarkInvoiceAsPaidUseCase(invoiceRepository)

  return makeInvoiceAsPaidUseCase
}
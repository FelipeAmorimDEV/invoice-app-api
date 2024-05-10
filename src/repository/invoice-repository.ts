import { Prisma, Invoice } from "@prisma/client";

export interface InvoiceRepository {
  createInvoice(data: Prisma.InvoiceUncheckedCreateInput): Promise<Invoice>
}
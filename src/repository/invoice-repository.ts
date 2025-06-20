import { Prisma, Invoice } from "@prisma/client";

export interface InvoiceRepository {
  createInvoice(data: Prisma.InvoiceUncheckedCreateInput): Promise<Invoice>
  deleteInvoice(id: number): Promise<Invoice | null>
  markInvoiceAsPaid(id: number): Promise<Invoice | null>
  editInvoice(id: number, data: Prisma.InvoiceUpdateWithoutUserInput): Promise<Invoice | null>
  fetchManyById(id: string): Promise <Invoice[]>
  getById(id: number): Promise<Invoice | null>
}
import { Invoice, Prisma } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";

export class InMemoryInvoiceRepository implements InvoiceRepository {
  public invoices: Invoice[] = []
  async createInvoice(data: Prisma.InvoiceUncheckedCreateInput) {
    const invoice = {
      id: 1,
      createdAt: new Date(),
      description: data.description,
      dueAt: new Date(data.dueAt),
      status: data.status,
      terms: data.terms,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      senderAddress: JSON.stringify(data.senderAddress),
      clientAddress: JSON.stringify(data.clientAddress),
      items: JSON.stringify(data.items),
      total: data.total,
      userId: data.userId,
    }

    this.invoices.push(invoice)

    return invoice
  }

}

import { Invoice, Prisma } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";

export class InMemoryInvoiceRepository implements InvoiceRepository {

  public invoices: Invoice[] = []

  async editInvoice(id: number, {clientAddress, clientEmail,clientName,description,dueAt,items,senderAddress,status,terms,total}: Prisma.InvoiceUncheckedCreateInput) {
    const invoice = this.invoices.find(invoice => invoice.id === id)

    if (!invoice) {
      return null
    }

    const invoiceEdited = {...invoice, clientAddress: JSON.stringify(clientAddress), clientEmail,clientName,description,dueAt: new Date(dueAt),items: JSON.stringify(items),senderAddress: JSON.stringify(senderAddress),status,terms,total}
    
    return invoiceEdited
  }

  async markInvoiceAsPaid(id: number) {
    const invoice = this.invoices.find(invoice => invoice.id === id)

    if (!invoice) {
      return null
    }

    invoice.status = 'paid'

    return invoice
  }

  async deleteInvoice(id: number) {
    const invoiceIndex = this.invoices.findIndex(invoice => invoice.id === id)

    if(invoiceIndex < 0) {
      return null
    }

    const withoutItem = this.invoices.splice(invoiceIndex, 1)
    
    return withoutItem
  }

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

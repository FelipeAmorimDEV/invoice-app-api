import { Prisma } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";
import { prisma } from "@/prisma";

export class PrismaInvoiceRepository implements InvoiceRepository {
  async deleteInvoice(id: number) {
    const invoice = await prisma.invoice.delete({
      where: {
        id
      }
    })

    return invoice
  }

  async markInvoiceAsPaid(id: number) {
    const invoice = prisma.invoice.update({
      where: {
        id,
      },
      data: {
        status: 'paid'
      }
    })

    return invoice
  }
  async editInvoice(id: number, data: Prisma.InvoiceUncheckedCreateInput) {
    const invoice = prisma.invoice.update({
      where: {
        id
      },
      data
    })

    return invoice
  }
  async fetchManyById(id: string) {
    const invoices = prisma.invoice.findMany(({
      where: {
        userId: id
      }
    }))

    return invoices
  }
  async getById(id: number) {
    const invoice = prisma.invoice.findUnique({
      where: {
        id
      }
    })

    return invoice
  }
  async createInvoice(data: Prisma.InvoiceUncheckedCreateInput) {
    const invoice = await prisma.invoice.create({
      data
    })

    return invoice
  }

}
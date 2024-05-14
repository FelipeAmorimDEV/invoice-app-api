import { Prisma } from "@prisma/client";
import { InvoiceRepository } from "@/repository/invoice-repository";
import { prisma } from "@/prisma";

export class PrismaInvoiceRepository implements InvoiceRepository {
  async deleteInvoice(id: number) {
    const resource = await prisma.invoice.findUnique({
      where: {
        id
      }
    })

    if (!resource) {
      return null
    }

    await prisma.invoice.delete({
      where: {
        id
      }
    })

    return resource
  }

  async markInvoiceAsPaid(id: number) {
    const resource = await prisma.invoice.findUnique({
      where: {
        id
      }
    })

    if (!resource) {
      return null
    }

    const hasResourceAlreadyBeenPaid = resource.status === 'paid'

    if (!hasResourceAlreadyBeenPaid){
      await prisma.invoice.update({
        where: {
          id,
        },
        data: {
          status: 'paid'
        }
      })
    }

    return resource
  }
  
  async editInvoice(id: number, data: Prisma.InvoiceUpdateWithoutUserInput) {
    const invoice = await prisma.invoice.update({
      where: {
        id
      },
      data
    })

    return invoice
  }

  async fetchManyById(id: string) {
    const invoices = await prisma.invoice.findMany(({
      where: {
        userId: id
      }
    }))

    return invoices
  }

  async getById(id: number) {
    const invoice = await prisma.invoice.findUnique({
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
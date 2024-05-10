import { Prisma } from "@prisma/client";
import { InvoiceRepository } from "../invoice-repository";
import { prisma } from "../../prisma";

export class PrismaInvoiceRepository implements InvoiceRepository {
  async createInvoice(data: Prisma.InvoiceUncheckedCreateInput) {
    const invoice = await prisma.invoice.create({
      data
    })

    return invoice
  }

}
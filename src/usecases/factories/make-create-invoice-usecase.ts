import { PrismaInvoiceRepository } from "@/repository/prisma/prisma-invoice-repository";
import { PrismaUserRepository } from "@/repository/prisma/prisma-user-repository";
import { CreateInvoiceUseCase } from "../create-invoice-usecase";

export function makeCreateInvoiceUseCase() {
  const userRepository = new PrismaUserRepository()
  const invoiceRepository = new PrismaInvoiceRepository()
  const createInvoiceUserCase = new CreateInvoiceUseCase(invoiceRepository, userRepository)

  return createInvoiceUserCase
}
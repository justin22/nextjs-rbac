import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient()
} else {
  if (!(global as any).prismaClient as any) {
    (global as any).prismaClient = new PrismaClient()
  }
  prismaClient = (global as any).prismaClient
}

export default prismaClient

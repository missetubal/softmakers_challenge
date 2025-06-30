import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
export const UserRepository = {
  findByEmail: (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
  },

  create: (data: { email: string; password: string }): Promise<User> => {
    return prisma.user.create({ data });
  },

  listAll: (): Promise<User[]> => {
    return prisma.user.findMany();
  },
};

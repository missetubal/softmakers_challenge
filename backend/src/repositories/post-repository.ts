import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PostRepository = {
  create: (data: {
    title: string;
    content: string;
    authorId: number;
  }): Promise<Post> => {
    return prisma.post.create({ data });
  },

  update: (id: number, data: { title?: string; content?: string }) => {
    return prisma.post.update({ where: { id }, data });
  },

  delete: (id: number) => {
    return prisma.post.delete({ where: { id } });
  },

  findById: (id: number): Promise<Post | null> => {
    return prisma.post.findUnique({ where: { id } });
  },

  findAll: (sort: 'asc' | 'desc' = 'desc'): Promise<Post[]> => {
    return prisma.post.findMany({ orderBy: { createdAt: sort } });
  },

  findByUser: (
    userId: number,
    sort: 'asc' | 'desc' = 'desc'
  ): Promise<Post[]> => {
    return prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: sort },
    });
  },
};

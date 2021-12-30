import { PrismaClient } from '@prisma/client';

const create = async () => {
  const prisma = new PrismaClient();
  const newUser = await prisma.user.create({
    data: {
      name: 'Tsuyopon',
    },
  });
  const newUserWithPost = await prisma.user.create({
    data: {
      name: 'Tsuyoshi',
      posts: {
        create: {
          title: 'Hello, World!',
          published: false,
        },
      },
    },
  });

  console.log({
    newUser,
    newUserWithPost: newUserWithPost,
  });

  await prisma.$disconnect();
};

create();

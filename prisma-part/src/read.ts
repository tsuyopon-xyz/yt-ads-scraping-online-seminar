import { PrismaClient } from '@prisma/client';

const read = async () => {
  // 事前に `./create.ts` を実行してデータがDBに追加されている前提のコード

  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  const userById1 = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    include: {
      posts: true,
    },
  });
  const posts = await prisma.post.findMany();
  const postsWithAuthor = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  const foundData = {
    users,
    usersWithPosts,
    userById1,
    posts,
    postsWithAuthor,
  };

  console.log(foundData);

  // データが全て見れない場合はこちらを使う
  console.log(JSON.stringify(foundData, null, 2));

  await prisma.$disconnect();
};

read();

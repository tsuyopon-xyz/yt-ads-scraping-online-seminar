import { PrismaClient } from '@prisma/client';

const update = async () => {
  // 事前に `./create.ts` を実行してデータがDBに追加されている前提のコード

  const prisma = new PrismaClient();
  const targetUserId = 1;

  const foundUserBeforeDelete = await prisma.user.findUnique({
    where: {
      id: targetUserId,
    },
  });

  const deleteResult = await prisma.user.delete({
    where: {
      id: targetUserId,
    },
  });

  const foundUserAfterDelete = await prisma.user.findUnique({
    where: {
      id: targetUserId,
    },
  });

  const foundData = {
    foundUserBeforeDelete,
    foundUserAfterDelete,
    deleteResult,
  };

  console.log(foundData);

  await prisma.$disconnect();
};

update();

import { PrismaClient } from '@prisma/client';

const update = async () => {
  // 事前に `./create.ts` を実行してデータがDBに追加されている前提のコード

  const prisma = new PrismaClient();
  const targetUserId = 1;

  const foundUserBeforeUpdate = await prisma.user.findUnique({
    where: {
      id: targetUserId,
    },
  });

  const updateResult = await prisma.user.update({
    where: {
      id: targetUserId,
    },
    data: {
      name: 'Updated Name!!',
    },
  });

  const foundUserAfterUpdate = await prisma.user.findUnique({
    where: {
      id: targetUserId,
    },
  });

  const foundData = {
    foundUserBeforeUpdate,
    foundUserAfterUpdate,
    updateResult,
  };

  console.log(foundData);

  await prisma.$disconnect();
};

update();

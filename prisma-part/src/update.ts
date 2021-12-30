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

  const updatedResult = await prisma.user.update({
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
    updatedResult,
  };

  console.log(foundData);

  // データが全て見れない場合はこちらを使う
  console.log(JSON.stringify(foundData, null, 2));

  await prisma.$disconnect();
};

update();

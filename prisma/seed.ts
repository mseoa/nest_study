import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordSeoa = await bcrypt.hash('password-seoa', roundsOfHashing);
  const passwordJordan = await bcrypt.hash('password-jordan', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'seoa@moon.com' },
    update: {
      password: passwordSeoa,
    },
    create: {
      email: 'seoa@moon.com',
      name: 'Seoa Moon',
      password: passwordSeoa,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jordan@cute.com' },
    update: {
      password: passwordJordan,
    },
    create: {
      email: 'jordan@cute.com',
      name: 'Jordan Cutee',
      password: passwordJordan,
    },
  });

  // create two dummy articles
  const post1 = await prisma.article.upsert({
    // 조건에 맞는 걸 찾고 있다면 업데이트. create를 쓰면 중복된 데이터가 있을 가능성있어 upsert 사용
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {
      authorId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user2.id,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      published: true,
    },
  });

  console.log({ user1, user2, post1, post2, post3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

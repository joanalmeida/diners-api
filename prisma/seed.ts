import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const testDiner = await prisma.diner.create({
    data: {
      name: 'Testo-diner',
    },
  });

  const products = await prisma.product.create({
    data: {
      name: 'Coca-Cola',
      description: 'La que le gusta al Taser',
      price: 350,
      state: 'Available',
    },
  });

  console.log({ testDiner, products });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

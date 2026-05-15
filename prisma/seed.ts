import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@barbershop.com' },
    update: {},
    create: {
      name: 'Admin Barbershop',
      email: 'admin@barbershop.com',
      password: adminPassword,
      role: Role.admin,
    },
  });

  const services = [
    {
      name: 'Haircut',
      description: 'Potong rambut pria',
      price: 50000,
      duration: 45,
    },
    {
      name: 'Haircut + Wash',
      description: 'Potong rambut dan keramas',
      price: 70000,
      duration: 60,
    },
    {
      name: 'Beard Trim',
      description: 'Rapikan jenggot dan kumis',
      price: 35000,
      duration: 30,
    },
  ];

  for (const service of services) {
    const existingService = await prisma.service.findFirst({
      where: { name: service.name },
    });

    if (!existingService) {
      await prisma.service.create({ data: service });
    }
  }

  const barbers = [
    { name: 'Budi', phone: '081234567001' },
    { name: 'Andi', phone: '081234567002' },
    { name: 'Rizky', phone: '081234567003' },
  ];

  for (const barber of barbers) {
    const existingBarber = await prisma.barber.findFirst({
      where: { phone: barber.phone },
    });

    if (!existingBarber) {
      await prisma.barber.create({ data: barber });
    }
  }

  console.log('Seed data berhasil dibuat');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
        email: "test@test.com",
        username: "testuser",
        password: process.env.POSTGRES_DB_TEST_PASSWORD || "default_password",
    }
  })
}

main()
    .then(()  => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
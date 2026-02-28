import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

async function main() {
    console.log(`Starting process seeding...`)

    const hashedPassword = await bcrypt.hash('AdminGanteng', 10);

    const user = await prisma.pengguna.create({
        data: {
            username: "admin", password: hashedPassword,
        }
    });

    console.log('Seeding successfully!');
    console.log(user);
}

main().catch((e) => {
    console.error(' seeding error:', e);
    process.exit(1);
})
    .finally(async () => {
        await prisma.$disconnect();
    });
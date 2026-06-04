import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const active = await prisma.gelombang.findFirst({
        where: {
            tanggal_mulai: { lte: new Date() },
            tanggal_selesai: { gte: new Date() },
        }
    });
    console.log("Active Gelombang:", active);
}
main().finally(() => prisma.$disconnect());

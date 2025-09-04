import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const email = "demo@example.com";
	const passwordHash = await bcrypt.hash("demo1234", 10);

	const user = await prisma.user.upsert({
		where: { email },
		update: {},
		create: { email, password: passwordHash },
	});

	// Clean previous demo items
	await prisma.item.deleteMany({ where: { ownerId: user.id } });

	// Seed a few items
	await prisma.item.createMany({
		data: [
			{ title: "First item", notes: "Hello world", ownerId: user.id },
			{ title: "Second item", notes: "Sample notes", ownerId: user.id },
			{ title: "Third item", ownerId: user.id },
		],
	});

	console.log("Seed complete. Demo user:", email, "password: demo1234");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

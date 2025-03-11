import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the TaskStatus enum values to match the schema
type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  // We'll delete users that don't have auth relationships
  await prisma.user.deleteMany({
    where: {
      accounts: {
        none: {},
      },
    },
  });

  // Create 3 users
  const users = [];
  for (let i = 0; i < 3; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const now = new Date();

    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        image: faker.image.avatar(),
        emailVerified: true,
        createdAt: now,
        updatedAt: now,
      },
    });

    users.push(user);
    console.log(`Created user with id: ${user.id}`);
  }

  // Create 2-3 projects for each user
  for (const user of users) {
    const projectCount = faker.number.int({ min: 2, max: 3 });

    for (let i = 0; i < projectCount; i++) {
      const project = await prisma.project.create({
        data: {
          name: faker.company.name(),
          description: faker.lorem.paragraph(),
          userId: user.id,
        },
      });

      console.log(
        `Created project with id: ${project.id} for user: ${user.name}`
      );

      // Create 3-7 tasks for each project
      const taskCount = faker.number.int({ min: 3, max: 7 });

      for (let j = 0; j < taskCount; j++) {
        const statuses: TaskStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED"];
        const randomStatus = faker.helpers.arrayElement(statuses);

        const task = await prisma.task.create({
          data: {
            title: faker.lorem.sentence({ min: 3, max: 8 }),
            description: faker.lorem.paragraph(),
            status: randomStatus,
            projectId: project.id,
          },
        });

        console.log(`Created task with id: ${task.id}`);
      }
    }
  }

  console.log("Seeding finished.");
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

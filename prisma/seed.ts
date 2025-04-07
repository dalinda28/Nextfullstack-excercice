import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the TaskStatus enum values to match the schema
type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

async function main() {
  const email = process.argv[2];
  console.log("Start seeding...");

  // Clear existing data except for the specified user if email is provided
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();

  if (!email) {
    // Delete users without auth relationships only if no email is specified
    await prisma.user.deleteMany({
      where: {
        accounts: {
          none: {},
        },
      },
    });

    // Create 3 random users
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

    // Create 2-3 projects for each random user
    for (const user of users) {
      await createProjectsForUser(user.id, 2, 3, 3, 7);
    }
  } else {
    // If email is provided, find the user and create projects for them
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(`No user found with email: ${email}`);
    }

    // Create exactly 3 projects with 10 tasks each for the specified user
    await createProjectsForUser(user.id, 3, 3, 10, 10);
    console.log(
      `Created 3 projects with 10 tasks each for user: ${user.email}`
    );
  }

  console.log("Seeding finished.");
}

async function createProjectsForUser(
  userId: string,
  minProjects: number,
  maxProjects: number,
  minTasks: number,
  maxTasks: number
) {
  const projectCount = faker.number.int({ min: minProjects, max: maxProjects });

  for (let i = 0; i < projectCount; i++) {
    const project = await prisma.project.create({
      data: {
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        userId: userId,
      },
    });

    console.log(`Created project with id: ${project.id}`);

    const taskCount = faker.number.int({ min: minTasks, max: maxTasks });
    const statuses: TaskStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED"];

    for (let j = 0; j < taskCount; j++) {
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

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

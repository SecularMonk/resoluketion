import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
   const bookCreateResults = await prisma.book.createManyAndReturn({
      data: [
         { author: "Brandon Sanderson", title: "The Way of Kings", totalPages: 1024 },
         { author: "Christopher Buehlman", title: "Between Two Fires", totalPages: 520 },
         { author: "Rebecca Yarros", title: "Fourth Wing", totalPages: 620 },
         { author: "JRR Tolkien", title: "The Fellowship of the Ring", totalPages: 462 },
      ],
   });

   const [{ id: user0Id }, { id: user1Id }] = await prisma.user.createManyAndReturn({
      data: [
         { username: "William Thunderhammer III", email: "test@gmail.com", name: "Zimbabwe Jones" },
         { username: "Billy Fakename", email: "example@gmail.com", name: "Johnny Fakename" },
      ],
   });

   await prisma.userProgress.createMany({
      data: [
         { userId: user0Id, bookId: bookCreateResults[0].id, isCompleted: true, rating: 5 },
         { userId: user0Id, bookId: bookCreateResults[1].id, isCompleted: false },
         { userId: user1Id, bookId: bookCreateResults[1].id, isCompleted: true, rating: 5 },
      ],
   });
};

seed();

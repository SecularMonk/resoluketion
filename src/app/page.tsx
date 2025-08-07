import { prisma } from "@/lib/prisma";
import { CreateBookForm } from "./createBookForm";

const Home = async () => {
   const books = await prisma.book.findMany();

   return (
      <div className="p-4 flex flex-col gap-y-4">
         <CreateBookForm />
         <div className="flex flex-col gap-y-2">
            {books.map((book) => (
               <div key={book.id}>
                  <h2>
                     {book.title} by {book.author}. Details: {book.id} Completed?
                  </h2>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Home;

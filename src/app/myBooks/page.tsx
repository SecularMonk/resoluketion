import { prisma } from "@/lib/prisma";
import { setBookReadStatus } from "./actions";
import { ToggleReadStatus } from "./toggleBookReadStatus";

const MyProgress = async () => {
   //hard-code userId since we don't have auth
   const userId = "2adfcf5f-3247-4dc9-898b-29408ca40e0e";
   const userProgress = await prisma.userProgress.findMany({ include: { book: true }, where: { userId } });
   return (
      <div>
         {userProgress.map((progress) => (
            <div key={progress.id}>
               <h2>
                  {progress.book.title} by {progress.book.author}. Read? {progress.isCompleted === true ? "Yes" : "No"}
               </h2>

               <div>
                  Mark as read
                  <ToggleReadStatus id={progress.bookId} userId={userId} onToggle={setBookReadStatus} disabled={false} initialChecked={progress.isCompleted} />
               </div>
            </div>
         ))}
      </div>
   );
};

export default MyProgress;

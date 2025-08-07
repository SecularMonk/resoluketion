"use client";

import { createBook } from "./actions";
import { useState, useTransition } from "react";

export function CreateBookForm() {
   const [error, setError] = useState<string | null>(null);
   const [isPending, startTransition] = useTransition();

   async function handleSubmit(formData: FormData) {
      const input = {
         title: formData.get("title"),
         author: formData.get("author"),
         totalPages: formData.get("totalPages"),
         isbn: formData.get("isbn"),
         description: formData.get("description"),
         coverUrl: formData.get("coverUrl"),
      };
      startTransition(async () => {
         const result = await createBook(input);

          if (!result.success) {
            //  wanted to avoid direclty bubbling up the error here. Ideally it would hook up to an error service.
            if (typeof result.error === "string") {
               setError(result.error);
            }
         } else {
            location.reload();
         }
      });
   }

   return (
      <form action={handleSubmit} className="space-y-2">
         {/* only some inputs are required - would be good to indicate which ones those are */}
         <input name="title" type="text" placeholder="Title" className="border p-2 w-full" />
         <input name="author" type="text" placeholder="Author" className="border p-2 w-full" />
         <input name="totalPages" type="number" placeholder="Total pages" className="border p-2 w-full" />
         <input name="isbn" type="text" placeholder="ISBN" className="border p-2 w-full" />
         <input name="description" type="text" placeholder="description" className="border p-2 w-full" />
         <input name="coverUrl" type="text" placeholder="Cover URL" className="border p-2 w-full" />

         {error && <p className="text-red-500">{error}</p>}
         <button type="submit" disabled={isPending} className="bg-blue-600 text-white p-2">
            {isPending ? "Creating..." : "Create Book"}
         </button>
      </form>
   );
}

"use server";
import { prisma } from "@/lib/prisma";
import { Prisma, Book, UserProgress } from "@prisma/client";
import { z } from "zod";

const createBookSchema = z.object({
   title: z.string(),
   author: z.string(),
   isbn: z.string().nullable(),
   totalPages: z.coerce.number().min(0),
   description: z.string().nullable(),
   coverUrl: z.string().nullable(),
});

/**
 * @description Discriminated union to allow type narrowing in calling scope
 */
type CreateBookResult = { success: true; result: Book } | { success: false; error: unknown };

/**
 *
 * @param book A new book
 * @returns The created book in the DB
 * @throws input validation errors if passed invalid data, or DB error if the creation fails
 */
export const createBook = async (book: Record<string, FormDataEntryValue | null>): Promise<CreateBookResult> => {
   //use zod to validate user input
   const result = createBookSchema.safeParse(book);

   if (!result.success) {
      throw new Error("Invalid args received for new book");
   }

   // satisfy prisma create type from validated data
   const dbData: Prisma.BookCreateInput = result.data;

   // in future would be great to have global error types so we can show meaningful results to users, this is just the raw Prisma error
   try {
      const result = await prisma.book.create({ data: dbData });
      return { success: true, result };
   } catch (error) {
      return { success: false, error };
   }
};
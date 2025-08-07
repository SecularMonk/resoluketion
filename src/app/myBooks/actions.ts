'use server'

import { prisma } from "@/lib/prisma";
import z from "zod";

const setBookReadStatusSchema = z.uuidv4();

export const setBookReadStatus = async (bookId: string, userId: string, readStatus: boolean): Promise<{ success: boolean }> => {
   const isValid = setBookReadStatusSchema.safeParse(bookId);

   if (!isValid) {
      throw new Error("Invalid bookId!");
   }

   try {
      //use upsert, since they might not have any records so far
      await prisma.userProgress.upsert({
         where: { userId_bookId: { userId, bookId } },
         create: { userId, bookId },
         update: { isCompleted: readStatus },
      });
      return { success: true };
   } catch {
      return { success: false };
   }
};
export type SetBookReadStatusSignature = typeof setBookReadStatus;

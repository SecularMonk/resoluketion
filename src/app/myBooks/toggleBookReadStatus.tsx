"use client";

import { useState, useTransition } from "react";

interface CheckboxProps {
   id: string;
   userId: string;
   initialChecked?: boolean;
   onToggle: (bookId: string, userId: string, readStatus: boolean) => Promise<{ success: boolean }>;
   label?: string;
   disabled?: boolean;
}

export function ToggleReadStatus({ id, userId, initialChecked = false, onToggle, label, disabled = false }: CheckboxProps) {
   const [checked, setChecked] = useState(initialChecked);
   const [isPending, startTransition] = useTransition();

   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setChecked(newChecked);

      startTransition(async () => {
         try {
            await onToggle(id, userId, newChecked);
            location.reload();
         } catch {
            setChecked(!newChecked);
         }
      });
   };

   return (
      <div>
         <label className="flex items-center gap-2 cursor-pointer">
            <input
               type="checkbox"
               checked={checked}
               onChange={handleChange}
               disabled={disabled || isPending}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
            />
            {label && <span className={`text-sm ${isPending ? "opacity-50" : ""}`}>{label}</span>}
            {isPending && <span className="text-xs text-gray-500">Updating...</span>}
         </label>
      </div>
   );
}

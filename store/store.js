// This file handles everything using zustand
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
        items: [],
        setItems: (newItems) => set ({items: newItems}),
    }),
    {
        name: "storage",
        storage: typeof window !== "undefined" ? localStorage : undefined,
    }

  )  
);


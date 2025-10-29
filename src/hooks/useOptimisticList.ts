"use client";

import { useOptimistic } from "react";

type OptimisticAction<T> =
  | { type: "add"; item: T }
  | { type: "update"; item: T; matchBy: keyof T }
  | { type: "delete"; id: any; matchBy: keyof T };

export function useOptimisticList<T extends Record<string, any>>(initialData: T[]) {
  return useOptimistic(
    initialData,
    (currentList: T[], action: OptimisticAction<T>): T[] => {
      switch (action.type) {
        case "add":
          return [action.item, ...currentList];

        case "update":
          return currentList.map((el) =>
            el[action.matchBy] === action.item[action.matchBy]
              ? action.item
              : el
          );

        case "delete":
          return currentList.filter((el) => el[action.matchBy] !== action.id);

        default:
          return currentList;
      }
    }
  );
}

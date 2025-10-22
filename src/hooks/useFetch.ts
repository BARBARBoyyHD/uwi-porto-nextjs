"use client";
import { supabase } from "@/utils/server";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

/**
 * Generic fetch hook to get multiple records
 */
export function useGetData<T>(
  endpoint: string,
  queryKey: string
): UseQueryResult<T[], Error> {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(`${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.data);
      return data.data;
    },
  });
}

/**
 * Generic fetch hook to get a single record
 */
export function useGetSingleData<T>(
  id: string,
  endpoint: string,
  queryKey: string
): UseQueryResult<T, Error> {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.data);
      return data.data;
    },
  });
}

/**
 * Generic insert (POST) hook
 */
export function usePostData<T>(
  endpoint:string,
  queryKey: string
): UseMutationResult<T[], Error, T> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: T) => {
      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to post data");
      }
      const result = await response.json();
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}

/**
 * Generic update (PUT) hook
 */
export function useUpdateData<T>(
  endpoint: string,
  queryKey: string
): UseMutationResult<T[], Error, { id: string; updates: Partial<T> }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update data");
      }
      const result = await response.json();
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}

/**
 * Generic delete hook
 */
export function useDeleteData<T>(
  endpoint: string,
  id: string,
  queryKey: string
): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete data");
      }
      const result = await response.json();
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}

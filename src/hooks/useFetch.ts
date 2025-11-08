"use client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

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
      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to fetch data");
      }

      // Handle empty array
      if (!data.data || data.data.length === 0) {
        throw new Error("No data found");
      }

      return data?.data ?? [];
    },
    // 🚫 Jangan refetch otomatis
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    // 🧠 Cache aktif selama 5 menit
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Generic fetch hook to get a single record
 */
export function useGetSingleData<T>(
  id: string,
  endpoint: string,
  queryKey: string,
  option?: { enabled: boolean }
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

      return data.data;
    },
    ...option,
  });
}

/**
 * Generic insert (POST) hook
 */
export function usePostData<T>(
  endpoint: string,
  queryKey: string
): UseMutationResult<T[], Error, T> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: T) => {
      // Detect if it's FormData (for file upload)
      const isFormData = data instanceof FormData;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: isFormData
          ? undefined
          : { "Content-Type": "application/json" },
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to post data");
      }

      const result = await response.json();
      return result.data;
    },

    onSuccess: () => {
      toast("✅ Added successfully!", {
        duration: 2000,
        className:
          "bg-green-500 text-white font-semibold transition-all duration-300 ease-in-out",
      });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      toast.error("❌ Failed to add data", { description: error.message });
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
      const isFormData = updates instanceof FormData;
      const response = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: isFormData
          ? undefined
          : { "Content-Type": "application/json" },
        body: isFormData ? updates : JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update data");
      }
      const result = await response.json();
      return result.data;
    },
    onSuccess: () => {
      toast("✏️ Updated successfully!", {
        duration: 2000,
        className:
          "bg-green-500 text-white transition-all duration-300 ease-in-out",
      });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      toast.error("❌ Failed to update data", { description: error.message });
    },
  });
}

/**
 * Generic delete hook
 */
export function useDeleteData(
  endpoint: string,
  queryKey: string
): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
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
    onSuccess: (id) => {
      toast("🗑️ Deleted successfully!", {
        duration: 2000,
        className:
          "bg-green-500 text-white transition-all duration-300 ease-in-out",
      });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.removeQueries({ queryKey: [id] });
    },
    onError: (error) => {
      toast.error("❌ Failed to delete data", { description: error.message });
    },
  });
}

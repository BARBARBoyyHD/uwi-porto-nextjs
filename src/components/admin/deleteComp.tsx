import React from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/useFetch";

interface DeleteCompProps {
  id: string;
  endpoint: string;
  queryKey: string;
}

export function DeleteComp({ id, endpoint, queryKey }: DeleteCompProps) {
  const { mutate } = useDeleteData(endpoint, id, queryKey);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-400 hover:text-red-300 hover:bg-zinc-700"
      onClick={() => mutate(id)} // ✅ <-- actually call mutate() here
    >
      <FaTrash size={16} />
    </Button>
  );
}

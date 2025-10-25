"use client";

import { useGetData } from "@/hooks/useFetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { DeleteComp } from "../deleteComp";
import { HeroEditDialogForm } from "./form/HeroEditDialogForm";

export default function HeroData() {
  const { data, error } = useGetData(
    "/api/v1/admin/hero-section/get",
    "hero-section"
  );

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Hero Section Data</h1>

      {data && data.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((hero: any) => (
            <Card
              key={hero.id}
              className="bg-zinc-800 border-zinc-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold truncate">
                  {hero.full_name}
                </CardTitle>

                <div className="flex gap-2">
                  <HeroEditDialogForm id={hero.id} />
                  <DeleteComp
                    id={hero.id}
                    endpoint="/api/v1/admin/hero-section/delete"
                    queryKey="hero-section"
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-gray-300 text-sm">{hero.summary}</p>

                {hero.image_url && (
                  <img
                    src={hero.image_url}
                    alt={hero.full_name}
                    className="w-full h-40 object-cover rounded-xl mt-2"
                  />
                )}

                <div className="pt-3">
                  <p>{hero.cta}</p>
                </div>

                <span className="block text-gray-500 text-xs">
                  Created at: {new Date(hero.created_at).toLocaleString()}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No hero data found.</p>
      )}
    </div>
  );
}

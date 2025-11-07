"use client";

import { useGetData } from "@/hooks/useFetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteComp } from "../../deleteComp";
import { HeroEditDialogForm } from "./form/HeroEditDialogForm";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import type { HeroType } from "@/types/heroType";

export default function HeroData() {
  const { data, error, isLoading } = useGetData<HeroType>(
    "/api/v1/admin/hero-section/get",
    "hero-section"
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <SpinnerLoading />
      </div>
    );

  if (error)
    return <p className=" text-gray-500 text-center">No hero section found.</p>;

  if (!data?.length)
    return (
      <div className="text-center py-10 text-gray-500">
        No hero section found.
      </div>
    );

  return (
    <div className="p-6 space-y-6 dark">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((hero) => (
          <Card
            key={hero.id}
            className="text-primary rounded-2xl shadow-lg hover:shadow-xl transition"
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
              <p className="text-secondary-foreground text-sm">
                {hero.summary}
              </p>

              {hero.image_url && (
                <img
                  src={hero.image_url}
                  alt={hero.full_name || "Hero image"}
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
    </div>
  );
}

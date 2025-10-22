"use client";
import { useGetData } from "@/hooks/useFetch";

export default function HeroData() {
  const { data, error } = useGetData(
    "/api/v1/admin/hero-section/get",
    "hero-section"
  );

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-white mb-4">Hero Section Data</h1>

      {data && data.length > 0 ? (
        data.map((hero: any) => (
          <div
            key={hero.id}
            className="p-4 bg-zinc-800 rounded-2xl shadow-md flex flex-col gap-2"
          >
            <h2 className="text-xl font-semibold text-white">
              {hero.full_name}
            </h2>
            <p className="text-gray-300">{hero.summary}</p>

            {hero.image_url && (
              <img
                src={hero.image_url}
                alt={hero.full_name}
                className="w-40 h-40 object-cover rounded-lg mt-2"
              />
            )}

            <a
              href={hero.cta}
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {hero.cta ? "Visit CTA" : "No CTA link"}
            </a>

            <span className="text-gray-400 text-sm">
              Created at: {new Date(hero.created_at).toLocaleString()}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No hero data found.</p>
      )}
    </div>
  );
}

"use client";

import { useGetData } from "@/hooks/useFetch";
import React from "react";
import type { Experience } from "@/types/experience";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import { formatDate } from "@/lib/formatDate";
import { DeleteComp } from "@/components/deleteComp";
import { ExperienceFormEditDialog } from "./form/ExperienceEditFormDialog";

export default function ExperienceData() {
  const { data, isLoading } = useGetData<Experience>(
    "/api/v1/admin/experience/get",
    "experience"
  );

  const [optimisticExperience] = useOptimisticList<Experience>(data || []);

  // 🌀 Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <SpinnerLoading />
      </div>
    );
  }

  // 🧾 No Data Found State
  if (!optimisticExperience?.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600">No experience found.</p>
      </div>
    );
  }

  // ✅ Data Found
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {optimisticExperience.map((experience, index) => (
        <div
          key={index}
          className="flex flex-col justify-between w-full sm:w-[48%] lg:w-[31%] p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-200"
        >
          {/* Header: company + icons */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {experience.company_name}
              </h1>
              <p className="text-gray-600">{experience.position}</p>
            </div>
            <div className="flex gap-3 text-gray-500">
              <ExperienceFormEditDialog id={experience.id} />
              <DeleteComp
                id={experience.id}
                queryKey="experience"
                endpoint="/api/v1/admin/experience/delete"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="mt-3 text-sm text-gray-500">
            <p>Start date: {formatDate(experience.start_date)}</p>
            <p>
              {experience.currently_working
                ? "Currently working"
                : `End date: ${formatDate(experience.end_date)}`}
            </p>
          </div>

          {/* Description */}
          <div
            className="mt-3 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: experience.description as string,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

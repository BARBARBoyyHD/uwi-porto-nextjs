"use client";

import { DeleteComp } from "@/components/deleteComp";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { useGetData } from "@/hooks/useFetch";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import { formatDate } from "@/lib/formatDate";
import type { Educations } from "@/types/educations";
import { EducationEditFormDialog } from "./form/EducationFormEditDialog";

export default function EducationsList() {
  const { data, isLoading } = useGetData<Educations>(
    "/api/v1/admin/educations/get",
    "educations"
  );
  const [educationOptimistic] = useOptimisticList(data || []);

  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="flex flex-wrap gap-4 p-6">
      {educationOptimistic.map((education) => (
        <div
          key={education.id}
          className="flex flex-col justify-between p-4 w-full sm:w-[48%] lg:w-[31%] bg-white border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {education.school_name}
            </h2>
            <p className="text-sm text-gray-600">
              {education.degree} — {education.field_of_study} - {education.score}
            </p>
            <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{__html:education.description}}/>

            <div className="text-sm text-gray-500 mt-2">
              <span>{formatDate(education.start_date)}</span> -{" "}
              <span>{formatDate(education.end_date)}</span> 
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-4">
            <EducationEditFormDialog id={education.id} />

            <DeleteComp
              id={education.id}
              endpoint={"/api/v1/admin/educations/delete"}
              queryKey="educations"
            />
          </div>
        </div>
      ))}

      {/* If no data */}
      {educationOptimistic.length === 0 && (
        <div className="text-center w-full text-gray-500 mt-8">
          No education records found.
        </div>
      )}
    </div>
  );
}

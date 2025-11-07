import { useGetData } from "@/hooks/useFetch";
import React from "react";
import type { JobRole } from "@/types/jobroles";
import { useOptimisticList } from "@/hooks/useOptimisticList";
import ScrollVelocity from "@/components/ScrollVelocity";
export default function JobRoleComp() {
  const { data: jobRole } = useGetData<JobRole>(
    "/api/v2/job-role",
    "job-role"
  );
  const [optimisticJobRole] = useOptimisticList(jobRole || []);
  const velocity = 100;

  // prepare texts for ScrollVelocity as string[]
  const roleTexts: string[] = optimisticJobRole
    ? optimisticJobRole.map((r) => r.role_name || "")
    : [];

  return (
    <div>
      {" "}
      {roleTexts.length > 0 && (
        <div className=" w-full">
          {/* pass an array of strings (ScrollVelocity expects string[]) */}
          <ScrollVelocity texts={roleTexts} velocity={velocity} />
        </div>
      )}
    </div>
  );
}

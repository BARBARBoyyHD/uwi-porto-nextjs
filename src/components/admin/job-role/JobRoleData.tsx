"use client";

import { useGetData } from "@/hooks/useFetch";
import React from "react";
import { JobFormEditDialog } from "./form/JobFormEditDialog";
import type { JobRole } from "@/types/jobroles";
import { Briefcase } from "lucide-react";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { DeleteComp } from "@/components/deleteComp";
import { useOptimisticList } from "@/hooks/useOptimisticList";

export default function JobRoleData() {
  const { data, isLoading } = useGetData<JobRole>(
    "/api/v1/admin/job-role/get",
    "job-role"
  );
  const [optimisticJobRole] = useOptimisticList(data || []);
  if (isLoading) {
    return <SpinnerLoading />;
  }
  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-center md:justify-start gap-6">
        {optimisticJobRole?.length ? (
          optimisticJobRole.map((jobRole, index) => (
            <div
              key={index}
              className="group relative border border-border bg-card w-[220px] h-[140px] shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200 rounded-2xl p-5 flex flex-col justify-between items-center"
            >
              {/* Icon and role name */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <Briefcase className="w-6 h-6" />
                </div>
                <p className="font-semibold text-base text-foreground">
                  {jobRole.role_name}
                </p>
              </div>

              {/* Edit button */}
              <div>
                <JobFormEditDialog id={jobRole.id} />
                <DeleteComp
                  id={jobRole.id}
                  endpoint="/api/v1/admin/job-role/delete"
                  queryKey="job-role"
                />
              </div>

              {/* subtle accent bar */}
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-primary/40 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">
            No job roles found. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
}

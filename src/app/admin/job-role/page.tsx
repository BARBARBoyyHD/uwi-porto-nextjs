import { JobFormDialog } from "@/components/admin/job-role/form/JobFormDialog";
import JobRoleData from "@/components/admin/job-role/JobRoleData";

import React from "react";
export default function JobRole() {
  return (
    <section>
      <div className="flex items-center justify-between p-6">
        <h1 className="text-primary font-bold text-3xl">Job Role</h1>
        <JobFormDialog />
      </div>
      <JobRoleData />
    </section>
  );
}

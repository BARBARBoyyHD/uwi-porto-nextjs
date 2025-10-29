import React from "react";
import { ExperienceFormDialog } from "@/components/admin/experience/form/ExperienceFormDialog";
import ExperienceData from "@/components/admin/experience/ExperienceData";

export default function Experience() {
  return (
    <section>
      <div className="flex items-center justify-between p-6">
        <h1 className="text-primary font-bold text-3xl">Experience</h1>
        <ExperienceFormDialog />
      </div>
      <ExperienceData />
    </section>
  );
}

import { ProjectsDialog } from "@/components/admin/projects/form/ProjectsDialogForm";
import ProjectsData from "@/components/admin/projects/ProjectsData";
import React from "react";

export default function ProjectPages() {
  return (
    <section>
      <div className="flex w-full items-center justify-between p-6">
        <h1 className="dark:text-primary-foreground text-primary font-bold text-2xl">
          Projects page
        </h1>
        <ProjectsDialog />
      </div>
      <ProjectsData />
    </section>
  );
}

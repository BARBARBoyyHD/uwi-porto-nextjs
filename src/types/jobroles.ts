export type JobRole = {
  id: string;
  role_name: string;
  created_at: string;
};

export type JobRoleForm = Omit<JobRole, "id" | "created_at">;

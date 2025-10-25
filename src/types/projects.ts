export type Projects = {
  id: string;
  project_name: string;
  description: string;
  tech: string;
  live_demo_url?: string;
  image_url: string;
  created_at?: Date;
};

export type ProjectsFrom = Omit<Projects, "id">;

export type Experience = {
  id: string;
  company_name: string;
  position: string;
  start_date: Date | string;
  end_date?: Date|string | null;
  description?: string;
  currently_working: boolean;
};

export type ExperienceForm = Omit<Experience, "id">;
export type Experience = {
  id: string;
  company_name: string;
  position: string;
  start_date: string | Date;
  end_date?: string | Date | null;
  description?: string;
  currently_working: boolean;
};

export type ExperienceForm = Omit<Experience, "id">;

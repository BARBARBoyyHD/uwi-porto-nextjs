export type Educations = {
  id: string;
  school_name: string;
  degree: string;
  field_of_study: string;
  score: string; 
  description: string;
  start_date: string | Date | null;
  end_date: string | Date | null;
};

export type EducationsForm = Omit<Educations, "id">;

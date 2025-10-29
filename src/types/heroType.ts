export type HeroType = {
  id: string;
  full_name: string;
  summary: string;
  image_url: string;
  cta: string;
  created_at: string;
};

export type HeroForms = Omit<HeroType, "id" | "created_at">;
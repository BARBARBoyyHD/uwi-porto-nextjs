export type Testimonial = {
  id: string;
  client_name: string;
  message: string;
  client_position: string;
  image_url: string;
  created_at: string;
};

export type TestimonialForm = Omit<Testimonial, "id" | "created_at">;

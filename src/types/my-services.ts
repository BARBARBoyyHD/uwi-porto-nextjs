export type MyServices = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
};

export type MyServicesForm = Omit<MyServices, "id">;

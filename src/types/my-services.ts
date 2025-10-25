export type MyServices = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
};

export type MyServicesForm = Omit<MyServices, "id">;

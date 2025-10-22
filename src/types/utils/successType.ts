export type SuccessType<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};

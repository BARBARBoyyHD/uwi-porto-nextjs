"use client";

import { useGetData } from "@/hooks/useFetch";
import type { MyServices } from "@/types/my-services";
import { DeleteComp } from "../../deleteComp";
import { MyServicesEditDialog } from "./form/MyServiceEditDialog";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { useOptimisticList } from "@/hooks/useOptimisticList";

export default function MyServicesData() {
  const { data, isLoading } = useGetData<MyServices>(
    "/api/v1/admin/my-services/get",
    "myService"
  );

  const [optimisticServices] = useOptimisticList<MyServices>(data ?? []);

  return (
    <section className="container mx-auto p-4 sm:p-6 lg:p-8 dark">
      {isLoading ? (
        <div>
          <SpinnerLoading />
        </div>
      ) : optimisticServices &&
        Array.isArray(optimisticServices) &&
        optimisticServices.length > 0 ? (
        <div className="flex flex-wrap -mx-3">
          {optimisticServices.map((service) => (
            <div key={service.id} className="w-full sm:w-1/2 lg:w-1/3 p-3">
              <div className="h-full bg-amber-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    {service.title}
                  </h3>

                  <div
                    className="text-gray-600 mb-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />

                  <p className="text-lg font-bold text-gray-900 mb-4">
                    Price:{" "}
                    <span className="text-green-600">
                      Rp {service.price.toLocaleString("id-ID")}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    Category:{" "}
                    <span className="font-medium text-gray-700">
                      {service.category}
                    </span>
                  </p>
                </div>

                <div className="flex justify-end space-x-3 p-6 pt-4 border-t">
                  <MyServicesEditDialog id={service.id} />
                  <DeleteComp
                    id={service.id}
                    endpoint="/api/v1/admin/my-services/delete"
                    queryKey="myService"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-xl py-10">
          😔 No Services Found
        </p>
      )}
    </section>
  );
}

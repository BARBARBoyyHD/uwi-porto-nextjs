import { MyServicesDialog } from "@/components/admin/my-services/form/MyServiceDialogForm";
import MyServicesData from "@/components/admin/my-services/MyServicesData";
import React from "react";

export default function MyServices() {
  return (
    <section>
      <div className="flex items-center justify-between p-6">
        <h1 className="text-primary text-2xl font-bold">My Services</h1>
        <MyServicesDialog />
      </div>
      <MyServicesData />
    </section>
  );
}

import React from "react";
import MyServicesComp from "@/components/users/my-services/MyServicesComp";
import MyServicesList from "@/components/users/my-services/MyServicesList";
export default function MyServices() {
  return (
    <section>
      <MyServicesComp />
      <MyServicesList />
    </section>
  );
}

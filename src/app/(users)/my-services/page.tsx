import React from "react";
import MyServicesComp from "@/components/users/my-services/MyServicesComp";
import MyServicesList from "@/components/users/my-services/MyServicesList";
import Navbar from "@/components/NavBar";

export default function MyServices() {
  return (
    <section>
      <Navbar/>
      <MyServicesComp />
      <MyServicesList />
    </section>
  );
}

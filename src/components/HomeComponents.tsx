"use client";
import HeroComp from "@/components/users/hero-section/HeroComp";
import Aurora from "./Aurora";
import EducationsComp from "./users/educations/EducationsComp";
import ExperiencesComp from "./users/experience/ExperienceComp";
import JobRoleComp from "./users/job-role/JobRole";
import ProjectsComp from "./users/projects/ProjectsComp";
import { TechStackComp } from "./users/tech-stack/TechStackComp";
import ContactComp from "./users/contact/ContactComp";
import TestimonialComp from "./users/testimonial/TestimonialComp";
import { useLoader } from "@/hooks/useLoader";
import Loader from "./loader/Loader";

export default function HomeComponents() {
  const isLoading = useLoader();

  return (
    <section>
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#0f100f", "#FFD700", "#0f0f0f"]}
          blend={1}
          amplitude={0.5}
          speed={1}
        />
      </div>
      {isLoading ? (
        <>
          <div className="w-full min-h-screen flex justify-center items-center">
            <Loader />
          </div>
        </>
      ) : (
        <>
          {" "}
          <HeroComp />
          <JobRoleComp />
          <TechStackComp />
          <ProjectsComp />
          <EducationsComp />
          <ExperiencesComp />
          <TestimonialComp />
          <ContactComp />
        </>
      )}
    </section>
  );
}

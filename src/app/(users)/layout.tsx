import Aurora from "@/components/Aurora";
import { SkeletonComp } from "@/components/skeleton/SkeletonComp";
import { TanstackProvider } from "@/utils/ReactQueryProviders";
import { Suspense } from "react";
import { DynamicTitle } from "./metadata";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      {/* Global Navbar */}
      <DynamicTitle />
      {/* Background Aurora */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#0f100f", "#FFD700", "#0f0f0f"]}
          blend={1}
          amplitude={0.5}
          speed={1}
        />
      </div>

      {/* Page content */}
      <Suspense fallback={<SkeletonComp />}>{children}</Suspense>
    </TanstackProvider>
  );
}

import { TanstackProvider } from "@/utils/ReactQueryProviders";
import NavBar from "@/components/NavBar";
import Aurora from "@/components/Aurora"; // ✅ adjust path if needed

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      {/* Global Navbar */}
      <NavBar />

      {/* Background Aurora */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#0f100f", "#454545", "#0f0f0f"]}
          blend={1}
          amplitude={0.5}
          speed={1}
        />
      </div>

      {/* Page content */}
      {children}
    </TanstackProvider>
  );
}

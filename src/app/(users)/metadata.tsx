"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const titleMap: Record<string, string> = {
      "/certificates": "Certificates | Nahrul",
      "/my-services": "Services | Nahrul",
      "/projects": "Projects | Nahrul",
    };

    if (!pathname) return; // pastikan bukan null

    document.title = titleMap[pathname] || "Nahrul";
  }, [pathname]);

  return null;
}

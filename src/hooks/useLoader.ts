"use client";
import { useEffect, useState } from "react";

export function useLoader(delay = 1000) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      setLoading(false);
    };
    init();
  }, [delay]);

  return loading;
}

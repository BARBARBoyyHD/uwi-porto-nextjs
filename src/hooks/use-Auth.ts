
export async function useLogout() {
  try {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
    });
    window.location.href = "/";
  } catch (error) {
    if (error instanceof Error) {
      console.error("Logout failed:", error.message);
    }
  }
}

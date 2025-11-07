"use client";

import { login } from "@/app/(auth)/admin-login/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { SpinnerLoading } from "../SpinnerLoading";

export default function AdminLoginPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await login(formData);
    if (result.success === true) {
      toast("Login successful!",{
       style: { background: "#22c55e", color: "white" },
      });
      router.push("/admin/hero-section");
    } else {
      toast("Wrong Email and Password",{
        style: { background: "red", color: "white" },
      });
    }
  }

  return (
    <div className="dark min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm border">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Admin Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full font-medium"
              disabled={isPending}
            >
              {isPending ? <SpinnerLoading /> : "Log in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client"

import { login } from "@/app/(auth)/admin-login/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  return (
    <div className="dark min-h-screen flex items-center justify-center  px-4">
      <Card className="w-full max-w-sm border  ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold ">
            Admin Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col space-y-5" action={login}>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email" className="">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className=""
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="password" className="">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className=""
              />
            </div>

            <Button
              type="submit"
              className="w-full font-medium"
            >
              Log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Implement actual password reset logic here
    console.log('Password reset requested for:', email)

    // Simulate a password reset request
    toast({
      title: "Password Reset Requested",
      description: "If an account exists for this email, you will receive password reset instructions.",
    })

    // Reset form
    setEmail('')
  }

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="mt-4 w-full" type="submit">
              Reset Password
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={() => router.push('/login')}>
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


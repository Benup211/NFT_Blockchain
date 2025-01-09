"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { toast } = useToast()


  const setUser = (user: any) => {
    
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: Implement actual login logic here
    console.log('Login attempt with:', { email, password })
    
    // For now, just simulate a login check
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.email === email) {
        setUser(user) // Set the user in the AppContext
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
        })
        router.push('/dashboard')
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Login failed",
        description: "User not found",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="mt-4 w-full" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={() => router.push('/register')}>
            Create Account
          </Button>
          <Link href="/forgot-password" className="text-sm text-muted-foreground hover:underline">
            Forgot Password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}


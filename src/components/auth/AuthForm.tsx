'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


type AuthFormProps = {
  mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Add your auth logic here
    
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Login' : 'Create Account'}</CardTitle>
        <CardDescription>
          {mode === 'login' 
            ? 'Enter your credentials to login' 
            : 'Enter your information to create an account'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" type="submit" disabled={isLoading}>
            
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
          <Button variant="outline" className="w-full" type="button">
            
            Continue with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

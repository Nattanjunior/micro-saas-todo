'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/hooks/use-toast'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Magic Link'}
    </Button>
  )
}

export function AuthForm() {
  const [message, setMessage] = useState<string | null>(null)

  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('email', { email: data.email, redirect: false });

      toast({
        title: 'Magic Link Sent',
        description: 'check your email for the magic link to login',
      })
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'An error ocurred. Please try again.',
      })
    }

  })


  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email to receive a magic link</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required {...form.register('email')} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <SubmitButton />
          {message && (
            <p className={`mt-4 text-sm ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}


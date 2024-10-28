'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GithubIcon } from "lucide-react"

export function Authentication_01() {
  return (
    <Card className="w-full max-w-md bg-white shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-gray-800">FormGenius</CardTitle>
        <CardDescription className="text-gray-600 text-center">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button 
          variant="outline" 
          className="bg-white text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign in with Google
        </Button>
        <Button 
          variant="outline" 
          className="bg-white text-gray-800 hover:bg-gray-50 border border-gray-300 shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md"
        >
          <GithubIcon className="mr-2 h-5 w-5" />
          Sign in with GitHub
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-1.5 pt-2">
        <div className="text-sm text-gray-500 text-center">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardFooter>
    </Card>
  )
}
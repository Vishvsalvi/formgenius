'use client'

import React, { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'


const SuccessPage = () => {
  

  useEffect(() => {
   
    history.pushState(null, '', location.href)
    window.onpopstate = function () {
      history.go(1)
    }

    return () => {
      window.onpopstate = null
    }
  }, [])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <CardDescription className="text-center mb-6 text-lg">
            Your response has been successfully submitted.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessPage
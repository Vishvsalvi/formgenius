"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { getForm, getAllQuestions, getAllFieldOptions } from '@/app/actions/form'
import Form from '@/components/form'
import { LoaderCircle } from 'lucide-react'
type Props = {}

const Page = (props: Props) => {
  const { formId } = useParams()
  const { data: session, status } = useSession();

  const getFormData = async () => {
    if (status !== 'authenticated' || !session?.user?.email) {
      throw new Error('User not authenticated')
    }

    const form = await getForm(Number(formId[0]))
    
    if (form?.userId !== session.user.email) {
      throw new Error('You are not authorized to view this form')
    }

    const questions = await getAllQuestions(Number(form?.id))
    const fieldOptions = await Promise.all(questions.map(q => getAllFieldOptions(Number(q.id))))
    
    return { form, questions, fieldOptions }
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['form', formId],
    queryFn: getFormData,
    enabled: status === 'authenticated' && !!session?.user?.id,
  })

  if (status === 'loading' || isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading <LoaderCircle className='animate-spin' /></div>
  }

  if (status === 'unauthenticated') {
    return <div className="flex justify-center items-center h-screen">Please sign in to view this form.</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">
      {error instanceof Error ? error.message : 'Error loading form data'}
    </div>
  }

  if (!data) return null

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
     <Form isPublished={false} data={data} />
    </div>
  )
}

export default Page
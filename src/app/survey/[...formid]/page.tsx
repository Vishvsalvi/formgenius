'use client'

import React from 'react'

import { getAllQuestions, getForm, getAllFieldOptions } from '@/app/actions/form'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Form from '@/components/form'
import { LoaderCircle } from 'lucide-react'

const Page = () => {
    const { formid } = useParams()
    // const [formData, setFormData] = useState({})

    const getFormData = async () => {
        const form = await getForm(Number(formid))
        const questions = await getAllQuestions(Number(form?.id))
        console.log(questions)
            const fieldOptions = await Promise.all(questions.map(q => getAllFieldOptions(Number(q.id))))
        
        return { form, questions, fieldOptions }
    }
    
    const { data, error, isLoading } = useQuery({
        queryKey: ['form', formid],
        queryFn: getFormData
    })

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading <LoaderCircle className='animate-spin' /></div>
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error loading form data</div>
    if (!data) return null

    

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
           <Form isPublished={true} data={data} />
        </div>
    )
}

export default Page
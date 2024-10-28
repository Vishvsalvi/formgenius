"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, MoreVertical, ChevronDown, Calendar, Users, LoaderCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"
import { AiPromptForm } from '@/components/ai-prompt-form';
import Link from "next/link"
import { getAllForms } from "../actions/form"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react";
import Layout from "../layouts/layout"
type FormData = {
  id: string
  title: string
  description: string
  createdAt: string
  responses: number
  category: string
}


const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")


  const { data: session, status } = useSession();

  const getForms = async () => {
    try {
      if (session?.user?.id) {
        const forms = await getAllForms(session.user.email);
        return forms;
      }
      return [];

    }
    catch (error) {
      console.error(error)
      return
    }
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: getForms,
    enabled: status === 'authenticated' && !!session?.user?.id,
  })

  const filteredForms = data ? data.filter(
    (form) =>
    (form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : []

  if (status === 'loading' || isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading <LoaderCircle className='animate-spin' /></div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading form data</div>
  }

  return (
    <Layout>

    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl tracking-tighter font-bold text-gray-800 dark:text-white">AI Generated Forms</h1>

        <Dialog>
          <DialogTrigger className="whitespace-nowrap gap-2 flex items-center px-3 py-2 text-sm rounded-md bg-neutral-800 hover:bg-neutral-700 text-white"
            role="button">
           <Plus className="w-5 h-5" /> New Form</DialogTrigger>
          <DialogContent>
            <DialogHeader>

            <DialogTitle className="text-3xl tracking-tighter font-bold mb-6 text-gray-800" >AI Form Generator</DialogTitle>
            <DialogDescription>Enter your prompt</DialogDescription>
            </DialogHeader>
            <AiPromptForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search forms..."
            className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredForms.map((form, index) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FormCard form={form} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
    </Layout>

  )
}

const FormCard = ({ form }: { form: FormData }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-7 py-6  shadow-lg transition-all hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {form.title}
        </h2>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit form</DropdownMenuItem>
            <DropdownMenuItem>Duplicate form</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete form</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{form.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <Link className="text-white px-3 py-2 bg-black rounded-md text-xs" href={`/survey/form-view/${form.id}`} >View form</Link>
        <span className="flex items-center">
          <Users className="mr-1 h-4 w-4" />
          {form.responses} responses
        </span>
      </div>
      <div className="mt-4 flex items-center">
        {/* <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
          {form.category}
        </span> */}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
    </div>
  )
}

export default Dashboard;
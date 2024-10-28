import React from 'react'
import { auth } from '@/app/auth'
import Layout from '@/app/layouts/layout'
import { getAllQuestions, getFormSubmission, getFormSubmissionAnswers } from '@/app/actions/form'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function SurveyResults({
  params
}: {
  params: {
    slug: string[]
  }
}) {
  const session = await auth()
  if (!session?.user) {
    return (
      <Layout>
        <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            You must be logged in to view this page.
          </AlertDescription>
        </Alert>
      </Layout>
    )
  }

  const [formId, userId] = params.slug
  const userid = decodeURIComponent(userId)
  if (session.user.email !== userid) {
    console.log(session.user.email)
    console.log(userid)
    return (
      <Layout>
        <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authorization Error</AlertTitle>
          <AlertDescription>
            You are not authorized to view this page.
          </AlertDescription>
        </Alert>
      </Layout>
    )
  }

  const questions = await getAllQuestions(Number(formId))
  const submissions = await getFormSubmission(Number(formId))
  const answers = submissions ? await Promise.all(
    submissions.map(submission => getFormSubmissionAnswers(submission.id))
  ) : null

  if (!questions || questions.length === 0) {
    return (
      <Layout>
        <Alert className="max-w-2xl mx-auto mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Questions</AlertTitle>
          <AlertDescription>
            No questions found for this survey.
          </AlertDescription>
        </Alert>
      </Layout>
    )
  }

  if (!submissions || submissions.length === 0) {
    return (
      <Layout>
        <Alert className="max-w-2xl mx-auto mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Submissions</AlertTitle>
          <AlertDescription>
            No submissions found for this survey.
          </AlertDescription>
        </Alert>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Card className="bg-white rounded-xl shadow-lg border-0">
          <CardHeader className="border-b border-gray-100">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-semibold text-gray-800">Survey Results</CardTitle>
              {/* <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors duration-150"
                onClick={() => {
                  // Analysis button functionality will be added here
                }}
              >
                <BarChart className="w-4 h-4 mr-2" />
                View Analysis
              </Button> */}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="rounded-lg border border-gray-100 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 py-4">Submission ID</TableHead>
                    {questions.map(question => (
                      <TableHead 
                        key={question.id}
                        className="font-semibold text-gray-700 py-4"
                      >
                        {question.text}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission, index) => (
                    <TableRow 
                      key={submission.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {submission.id}
                      </TableCell>
                      {questions.map(question => {
                        const answer = answers && answers[index]
                          ? answers[index].find(a => a.questionId === question.id)
                          : null
                        return (
                          <TableCell 
                            key={question.id}
                            className="text-gray-600"
                          >
                            {answer ? answer.text : 'N/A'}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
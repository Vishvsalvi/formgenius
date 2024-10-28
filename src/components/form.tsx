'use client'

import React, { useState } from 'react'
import { useForm} from "react-hook-form"
import Link from 'next/link'
import { Copy, Home, LayoutDashboard } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { publishForm, submitForm, postAnswer } from '@/app/actions/form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import confetti from "canvas-confetti";
import FormFields from './formfield'
import { useRouter } from 'next/navigation'

type FormData = {
  id: number;
  published: boolean;
  title: string;
  description: string;
}

type Question = {
  id: string;
  text: string;
  FieldType: 'Input' | 'TextArea' | 'Checkbox' | 'Select' | 'Radio';
}

type FieldOption = {
  id: string;
  value: string;
  text: string;
}

type Props = {
  data: {
    form?: FormData;
    questions: Question[];
    fieldOptions: FieldOption[][];
  };
  isPublished: boolean;
}

const Form: React.FC<Props> = ({ data, isPublished }) => {

  const router = useRouter();
  const { control, handleSubmit, getValues, register } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [publishedLink, setPublishedLink] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const confettiFunction = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  };

  function handleSubmitAnswer(questions, fieldOptions, formData, formSubmissionId) {
    let final = []
    for (let i = 0; i < questions.length; i++) {
      const questionId = questions[i].id
      const formAnswer = formData[i + 1]

      if (questions[i].FieldType == "Input" || questions[i].FieldType == "TextArea") {
        final.push({ questionId, text: formAnswer, fieldOptionId: null, formSubmissionId })
      }

      if (questions[i].FieldType == "Select" || questions[i].FieldType == "Radio") {
        const validFieldOption = fieldOptions[i].filter((elem) => elem.value == formAnswer);
        const fieldOptionId = validFieldOption.length > 0 ? validFieldOption[0].id : null;
        final.push({ questionId, text: formAnswer, fieldOptionId, formSubmissionId });
      }

      if (questions[i].FieldType == "Checkbox") {
        let checkboxAnswers = [];

        fieldOptions[i].forEach((option) => {
          if (formAnswer[option.value] === true) {
            checkboxAnswers.push({
              questionId,
              text: option.value,
              fieldOptionId: option.id,
              formSubmissionId
            });
          }
        });

        final.push(...checkboxAnswers);
      }
    }

    return final;


  }

  const onSubmit = async () => {
    if (isPublished) {
      const formData = getValues();
      console.log('Form data:', formData);
      if (!data.form?.id) return;
      let formId = data.form?.id;

      const result = await submitForm({ formId });
      if (!result) return;

      const indexedData = {};
      let index = 1;
      for (const key in formData) {
        indexedData[index] = formData[key];
        index++;
      }

      const submitAnswer = handleSubmitAnswer(data.questions, data.fieldOptions, indexedData, result.id);
      
      if (!submitAnswer) return;
      const submissionPromises = submitAnswer.map(answer => postAnswer(answer));

        try {
        await Promise.all(submissionPromises);
        router.push('/success');
      } catch (error) {
        console.error('Error submitting answers:', error);
      }
      return;
    }

    try {
      const publishedForm = await publishForm(Number(data.form?.id));
      console.log('Form published:', publishedForm);
      if (!publishedForm) return;
      setPublishedLink(`http://localhost:3000/survey/${publishedForm.id}`);
      setIsDialogOpen(true);
      confettiFunction();
    } catch (error) {
      console.error('Error publishing form:', error);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publishedLink);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  }


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!isPublished && (
        <nav className="mb-8">
          <ul className="flex justify-end space-x-4">
            <li>
              <Link href="/" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <Home size={20} />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <LayoutDashboard size={20} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold">{data.form?.title}</CardTitle>
          <CardDescription className="text-gray-100">{data.form?.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormFields
              questions={data.questions}
              fieldOptions={data.fieldOptions}
              control={control}
              register={register}
            />
            <div className="mt-6">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                {isPublished ? "Submit Response" : "Publish Form"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this form.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                value={publishedLink}
                readOnly
              />
            </div>
            <TooltipProvider>
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={copyToClipboard} type="button" size="sm" className="px-3">
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Link copied!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Form
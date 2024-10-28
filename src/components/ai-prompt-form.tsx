"use client"

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { createForm, createQuestion, createFieldOption } from '@/app/actions/form'
import { useRouter } from 'next/navigation'
import axios from 'axios';

const WORD_LIMIT = 25; // Set word limit here

export function AiPromptForm() {
  const { data } = useSession();
  const router = useRouter();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/).filter((word) => word.length > 0);
    setWordCount(words.length);
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (wordCount > WORD_LIMIT) {
      alert(`Word limit exceeded! Please reduce your input to ${WORD_LIMIT} words.`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/formai', { prompt: input });
      const completion = response.data.form; // Access the `form` key
      console.log("Completion received:", completion);

      if (!completion || completion.trim() === '') {
        alert("Invalid form generation prompt! Please try again.");
        setIsLoading(false);
        return;
      }

      let form;
      try {
        form = JSON.parse(completion); // Parse the stringified JSON
        console.log("Parsed form:", form);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error generating form. Please try again.");
        setIsLoading(false);
        return;
      }

      if (!form || Object.keys(form).length === 0) {
        alert("Invalid form structure generated. Please try again.");
        setIsLoading(false);
        return;
      }

      form.userId = data?.user?.email;

      const formHandler = async (form: any) => {
        try {
          const formQuestions = form.questions;
          delete form.questions;
          const formResponse = await createForm(form);
          console.log("This is formResponse", formResponse);
          
          if (formResponse) {
            await Promise.all(formQuestions.map(async (question: any) => {
              question.formId = formResponse.id;
              const questionFieldOptions = question.fieldOptions;
              delete question.fieldOptions;
              
              const questionResponse = await createQuestion(question);
              console.log("This is questionResponse", questionResponse);
              
              if (questionFieldOptions && questionResponse) {
                await Promise.all(questionFieldOptions.map(async (fieldOption: any) => {
                  fieldOption.questionId = questionResponse.id;
                  await createFieldOption(fieldOption);
                }));
              }
            }));
          }
          
          return formResponse;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

      try {
        const formResponse = await formHandler(form);
        if (formResponse) {
          router.push(`/survey/form-view/${formResponse.id}`);
        } else {
          alert("Error creating form. Please try again.");
        }
      } catch (error) {
        console.error("Error in form handling:", error);
        alert("An error occurred while creating the form. Please try again.");
      }
    } catch (error) {
      console.error("Error in API call:", error);
      alert("An error occurred while generating the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Textarea
            id="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="Example: A 10-question survey for university students to gather feedback on online learning platforms"
            className="min-h-[100px] transition-all duration-200 ease-in-out outline-none"
            aria-describedby="wordCount errorMessage"
          />
          <p className={`text-sm ${wordCount > WORD_LIMIT ? 'text-red-600' : 'text-gray-600'}`}>
            Word count: {wordCount}/{WORD_LIMIT} {wordCount > WORD_LIMIT && "(Word limit exceeded)"}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || wordCount > WORD_LIMIT} // Disable if loading or word limit exceeded
          className="w-full transition-all duration-200 ease-in-out"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              Generating...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              Generate Form ✨
            </div>
          )}
        </Button>
      </form>
    </div>
  )
}

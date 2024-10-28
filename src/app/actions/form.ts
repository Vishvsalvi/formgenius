"use server"
import { Question, Form, FieldOption, FormSubmission, Answer } from "@prisma/client";
import prisma from "../db";

export const createForm = async (data: Form) => {
  try {
    console.log(data);
    const form = await prisma.form.create({
      data,
    });
    return form;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const createQuestion = async (data: Question) => {
    try {
        const question = await prisma.question.create({
        data,
        });
        return question;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const createFieldOption = async (data: FieldOption) => {
    try {
        const fieldOption = await prisma.fieldOption.create({
        data,
        });
        return fieldOption;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const getAllQuestions = async(formId: number) => {
    try {
        const questions = await prisma.question.findMany({
            where: {
                formId
            }
        });
        return questions;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const getForm = async(id: number) => {
    try {
        const form = await prisma.form.findUnique({
            where: {
                id
            }
        });
        return form;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const getAllFieldOptions = async(questionId: number) => {
    try {
        const fieldOptions = await prisma.fieldOption.findMany({
            where: {
                questionId
            }
        });
        return fieldOptions;
    } catch (error) {
        console.error(error);
        return;
    }
}


export const publishForm = async(id: number) => {
    try {
        const form = await prisma.form.update({
            where: {
                id
            },
            data: {
                published: true
            }
        });
        return form;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const getAllForms = async(userId: string) => {
    try {
       const forms = await prisma.form.findMany({
              where: {
                userId,
                published: true
              }
       })
        return forms;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const postAnswer = async(data: Answer) => {
    try {
        const answer = await prisma.answer.create({
            data
        });
        return answer;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const submitForm = async(data: Omit<FormSubmission, 'id'>) => {
    try {
        const submitForm = await prisma.formSubmission.create({
            data
        });
        return submitForm;
    } catch (error) {
        console.error(error);   
        return;   
    }
}

export const getFormSubmission = async(formId: number) => {
    try {
        const formSubmission = await prisma.formSubmission.findMany({
            where: {
                formId
            }
        });
        return formSubmission;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const getFormSubmissionAnswers = async(formSubmissionId: number) => {
    try {
        const answers = await prisma.answer.findMany({
            where: {
                formSubmissionId
            }
        });
        return answers;
    } catch (error) {
        console.error(error);
        return;
    }
}
'use server';
import { streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const LoadingComponent = () => (
  <div className="animate-pulse p-4">Generating form...</div>
);

const getWeather = async (location: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return '82°F️ ☀️';
};

interface WeatherProps {
  location: string;
  weather: string;
}

interface FormProps {
  label: string;
  valueType: 'text' | 'number | email | password | date | time | datetime-local';
  inputType: 'Input' | 'Textarea' | 'Select' | 'Checkbox' | 'Radio' | 'Switch';
  options: string[];
  placeholder: string;
  required: boolean;

}

const FormComponent = (props: FormProps[]) => (
  <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
    
      {props.map((form) => (
        <label>
          {form.label}
          {form.inputType === 'Input' && (
            <input
              type={form.valueType}
              placeholder={form.placeholder}
              required={form.required}
            />
          )}
          {form.inputType === 'Textarea' && (
            <textarea
              placeholder={form.placeholder}
              required={form.required}
            />
          )}
          {form.inputType === 'Select' && (
            <select>
              {form.options.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          )}
          {form.inputType === 'Checkbox' && (
            <input type="checkbox" />
          )}
          {form.inputType === 'Radio' && (
            <input type="radio" />
          )}
          {form.inputType === 'Switch' && (
            <input type="checkbox" />
          )}
        </label>
      ))}
  </div>
);

const WeatherComponent = (props: WeatherProps) => (
  <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
    The weather in {props.location} is {props.weather}
  </div>
);

export async function streamComponent() {
  const result = await streamUI({
    model: openai('gpt-4o-mini'),
    prompt: `Generate an array of objects for a form. Each object should follow this interface:

    interface FormProps {
      label: string;
      valueType: "text" | "number" | "email" | "password" | "date" | "time" | "datetime-local";
      inputType: "Input" | "Textarea" | "Select" | "Checkbox" | "Radio" | "Switch";
      options: string[];
      placeholder: string;
      required: boolean;
    }
    
    Provide the output as a valid JSON array. Ensure that each object in the array includes all the properties specified in the FormProps interface.`,
    text: ({ content }) => {
      try {
        const formProps = JSON.parse(content);
        console.log('formProps', formProps);
        return <FormComponent {...formProps} />;
      } catch (error) {
        return <div>Error parsing form data: {(error as Error).message}</div>;
      }
    }
  });
 
  return result.value;
}
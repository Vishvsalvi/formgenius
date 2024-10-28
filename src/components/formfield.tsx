import React from 'react';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Controller } from 'react-hook-form';

const FormFields = ({ questions, fieldOptions, control, register }) => {
    const renderField = (question, index) => {
      const options = fieldOptions[index] || [];
  
      switch (question.FieldType) {
        case 'Select':
          return (
            <div className="mb-6">
              <Label htmlFor={question.id.toString()} className="block mb-2 font-bold">
                {question.text}
              </Label>
              <Controller
                name={question.id.toString()}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          );
  
        case 'Checkbox':
          return (
            <div className="mb-6">
              <Label className="block mb-2 font-bold">{question.text}</Label>
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Controller
                      name={`${question.id}.${option.value}`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${question.id}-${option.id}`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label
                            htmlFor={`${question.id}-${option.id}`}
                            className="text-sm font-normal"
                          >
                            {option.text}
                          </Label>
                        </div>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
  
        case 'Radio':
          return (
            <div className="mb-6">
              <Label className="block mb-2 font-bold">{question.text}</Label>
              <Controller
                name={question.id.toString()}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="space-y-2">
                      {options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.id}`} />
                          <Label
                            htmlFor={`${question.id}-${option.id}`}
                            className="text-sm font-normal"
                          >
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          );
  
        case 'TextArea':
          return (
            <div className="mb-6">
              <Label htmlFor={question.id.toString()} className="block mb-2 text-sm font-bold">
                {question.text}
              </Label>
              <Textarea
                id={question.id.toString()}
                {...register(question.id.toString())}
                className="min-h-[100px]"
              />
            </div>
          );
  
        default:
          return (
            <div className="mb-6">
              <Label htmlFor={question.id.toString()} className="block mb-2 text-sm font-bold">
                {question.text}
              </Label>
              <Input
                id={question.id.toString()}
                type="text"
                {...register(question.id.toString())}
              />
            </div>
          );
      }
    };
  
    return (
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={`${question.id}-${index}`} className="p-4 bg-white rounded-lg border border-gray-200">
            {renderField(question, index)}
          </div>
        ))}
      </div>
    );
  };
  
  export default FormFields;
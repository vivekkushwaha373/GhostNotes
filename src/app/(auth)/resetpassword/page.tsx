'use client'

import Link from "next/link"
import {useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/hooks/use-toast"
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const page = () => {

    

  
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { toast } = useToast();
    

    interface resetPass {
        email: string,
        
    }

    //zod implementation
    const form = useForm({

        defaultValues: {
            email:''
        }
    })



    const onSubmit = async (data: resetPass) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>('/api/reset', data);
            toast({
                title: 'Success',
                description: response.data.message
            })
            
            setIsSubmitting(false);
        }
        catch (error) {
            console.log('Error in resetting password', error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: 'Updating user password failed',
                description: errorMessage,
                variant: 'destructive'
            })
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join Ghost Note
                    </h1>
                    <p className="mb-4">Enter your Email</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                //additional use case
                        
                                            }}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        <Button type="submit" disabled={isSubmitting}>
                            {
                                isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                    </>
                                ) : ('Click')
                            }
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Go back to signin page?{' '}
                        <Link href='/signin' className="text-blue-600 hover:text-blue-800">Sign in</Link>
                    </p>
                   
                </div>
            </div>
        </div>
    )
}

export default page

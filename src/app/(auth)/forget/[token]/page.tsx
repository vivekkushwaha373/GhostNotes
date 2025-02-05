'use client'

import Link from "next/link"
import {useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


const page = () => {


    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const token = params.token;

    interface forgetPass{
        newpassword: string,
        confirmpassword:string
    }

    //zod implementation
    const form = useForm({
       
        defaultValues: {
            newpassword: '',
            confirmpassword: '',
        }
    })

   

    const onSubmit = async (data:forgetPass) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>('/api/forget',
                {
                    ...data,
                    token 
                    
                });
            toast({
                title: 'Success',
                description: response.data.message
            })
            router.replace(`/signin`);
            setIsSubmitting(false);
        }
        catch (error) {
            console.log('Error in Updating user password', error);
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
                    <p className="mb-4">Set New Password</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">
                        <FormField
                            name="newpassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="new password" {...field}
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
                        <FormField
                            name="confirmpassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirm password" {...field}
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
                                ) : ('Update password')
                            }
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Already a member?{' '}
                        <Link href='/signin' className="text-blue-600 hover:text-blue-800">Sign in</Link>
                    </p>
                    Or
                    <p>
                        Are you a new user?{' '}
                        <Link href='/signup' className="text-blue-600 hover:text-blue-800">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page

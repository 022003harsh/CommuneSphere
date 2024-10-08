'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState, useTransition } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { registerUser } from '@/actions/user.register'
import { RegisterSchema } from '@/schema/register.schema'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from "sonner"
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '../ui/button'


interface AddMemberFormProps {
    closeModalFunction: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ closeModalFunction }) => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            role: "USER",
            email: "",
            password: "1234567",
            name: "",
            current_year: "First",
        }
    })
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    console.log(isPending);

    // Form submit handler.
    function onSubmit(values: z.infer<typeof RegisterSchema>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            registerUser(values)
                .then((data: any) => {
                    setError(data.error);
                    setSuccess(data.success);
                    toast("Member has been created.")
                }).catch((error) => {
                    setError("An error occurred during submission.");
                    toast("Error adding member.");
                    throw error;
                });
        });

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className='flex w-full justify-center gap-4 bg-white'>
                    <Avatar className='size-20'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="CommuneSphere" />
                        <AvatarFallback>CM</AvatarFallback>
                    </Avatar>
                    <div className='space-y-2'>
                        <Button className='rounded-md text-xs h-9 w-40 flex border-2 bg-bluePrimary border-bluePrimary text-white gap-2 hover:bg-white hover:text-bluePrimary'>
                            <Pencil className='w-4 h-4' />Add Image
                        </Button>
                        <Button className='rounded-md text-xs h-9 w-40 flex bg-white border-2 border-errorRed text-errorRed gap-2 hover:bg-errorRed hover:text-white'>
                            <Trash2 className='w-4 h-4' />Remove Image
                        </Button>
                    </div>
                </div>
                {/* edit form */}
                <div className="grid flex-1 grid-cols-2 gap-2 pt-4">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter name" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roll_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Roll Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter roll number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* branch */}
                    <FormField
                        control={form.control}
                        name="branch"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Branch</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="border-gray-300 text-gray-500">
                                            <SelectValue placeholder="Select branch" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="CSE">CSE</SelectItem>
                                        <SelectItem value="ECE">ECE</SelectItem>
                                        <SelectItem value="ME">ME</SelectItem>
                                        <SelectItem value="CE">CE</SelectItem>
                                        <SelectItem value="EE">EE</SelectItem>
                                        <SelectItem value="IT">IT</SelectItem>
                                        <SelectItem value="MCA">MCA</SelectItem>
                                        <SelectItem value="MBA">MBA</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* year and gender */}
                    <FormField
                        control={form.control}
                        name="domain"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Domain</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="border-gray-300 text-gray-500">
                                            <SelectValue placeholder="Select domain" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='web'>
                                            Web
                                        </SelectItem>
                                        <SelectItem value='app'>
                                            App
                                        </SelectItem>
                                        <SelectItem value='cloud'>
                                            Cloud
                                        </SelectItem>
                                        <SelectItem value='cyber'>
                                            Cyber Security
                                        </SelectItem>
                                        <SelectItem value='ml'>
                                            Machine Learning
                                        </SelectItem>
                                        <SelectItem value='video_editing'>
                                            Video Editing
                                        </SelectItem>
                                        <SelectItem value='content_writing'>
                                            Content Writing
                                        </SelectItem>
                                        <SelectItem value='marketing'>
                                            Marketing
                                        </SelectItem>
                                        <SelectItem value='finance'>
                                            Finance
                                        </SelectItem>
                                        <SelectItem value='public_relations'>
                                            Public Relations
                                        </SelectItem>
                                        <SelectItem value='creative'>
                                            Creative
                                        </SelectItem>
                                        <SelectItem value='design'>
                                            Design
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* current year */}
                    <FormField
                        control={form.control}
                        name="current_year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current year</FormLabel>

                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="border-gray-300 text-gray-500">
                                            <SelectValue placeholder="Select current year" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="First">1</SelectItem>
                                        <SelectItem value="Second">2</SelectItem>
                                        <SelectItem value="Third">3</SelectItem>
                                        <SelectItem value="Fourth">4</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* role */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>

                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="border-gray-300 text-gray-500">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter email" {...field} className="border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* personal email */}
                    <FormField
                        control={form.control}
                        name="personal_email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Personal email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter personal email" type="email" {...field} className="border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* phone number */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter phone number"  {...field} className="border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* socials */}

                </div>
                <br />
                <FormError message={error} />
                <FormSuccess message={success} />


                <div className='flex w-full gap-2'>

                    <Button type="button" className='border-2 w-1/2 border-errorRed bg-white text-errorRed hover:bg-errorRed hover:text-white' onClick={closeModalFunction}>Discard</Button>


                    <Button type="submit" className='border-2 w-1/2 border-sucessGreen bg-sucessGreen text-white hover:bg-white hover:text-sucessGreen'>Save changes</Button>

                </div>

            </form>
        </Form>
    )
}

export default AddMemberForm

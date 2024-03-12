'use client'

import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type FieldType = {
    user: {
        email: string;
        password: string;
    }
    name: string;
    post: {
        hobby: string;
        favorite_food: string;
    }[]
}

export default function InternFormRhfPage() {
    const [layout, setLayout] = useState<string>('user')

    const { 
        register,
        control, 
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FieldType>()

    const { fields, append, remove } = useFieldArray<FieldType>({
        control,
        name: "post"
    })

    const onSubmit: SubmitHandler<FieldType> = async (data) => {
        const { email, password } = data.user

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/add`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })

            if(res.status === 200) {
                console.log("Add user successfully.")
            }
        } catch (error) {
            setError("root", {
                message: 'Add user failed'
            })
        }
    }

    const onPost: SubmitHandler<FieldType> = async (data) => {
        const { name, post } = data

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/add`, {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    post: post
                }),
            })

            if(res.status === 200) {
                console.log("Add post successfully.")
            }
        } catch (error) {
            setError("root", {
                message: 'Add post failed'
            })
        }
    }

    return (
        <>
        <div className="border border-gray-300 mb-5 flex text-sm cursor-pointer justify-center items-center">
            <div className={`p-2 w-16 text-center ${layout === 'user' && 'bg-green-300'}`} onClick={() => {
                setLayout('user')
            }}>
                User
            </div>
            <div className={`p-2 w-16 text-center ${layout === 'post' && 'bg-green-300'}`} onClick={() => {
                setLayout('post')
            }}>
                Post
            </div>
        </div>

        {layout === 'user' && (
        <form className="p-16 w-full flex flex-col items-center justify-center gap-2" 
        onSubmit={handleSubmit(onSubmit)}>
            
            <div className="p-16 w-full flex flex-col items-center justify-center gap-2">
            
                <div className="w-1/3 flex flex-col gap-1">
                    <label htmlFor="email">
                        E-Mail
                    </label>
                    <input
                    className="rounded-md border border-gray-300 text-sm p-1"
                    {...register('user.email', {
                        required: "Please enter a valid email",
                        validate: (value) => {
                            if(!value.includes('@')) {
                                return "E-Mail must include @"
                            }
                            return true
                        }
                    })}
                    type="text"
                    placeholder="E-Mail"
                    />
                    {errors.user?.email && <div className="text-red-500">{errors.user.email.message}</div>}
                </div>
                
                <div className="w-1/3 flex flex-col gap-1">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                    className="rounded-md border border-gray-300 text-sm p-1"
                    {...register('user.password', {
                        required: "Please enter your password",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        },
                    })}
                    type="password"
                    placeholder="Password"
                    />
                    {errors.user?.password && <div className="text-red-500">{errors.user.password.message}</div>}
                </div>
                <div className="w-1/3">
                    <button disabled={isSubmitting} className="p-2 bg-blue-300 text-sm rounded-md" type="submit">
                        {isSubmitting ? "Loading..." : "Submit"}
                    </button>
                </div>
                {errors.root && <div className="text-red-500">{errors.root.message}</div>}
            </div>
        </form>
        )}

        {layout === 'post' && (
        <form
        className="p-16 w-full flex flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit(onPost)}>
            <div className="w-1/3 flex flex-col gap-1">
                <label htmlFor="name">
                    Name
                </label>
                <input
                className="rounded-md border border-gray-300 text-sm p-1"
                {...register('name', {
                    required: "Please enter your name",
                })}
                type="text"
                placeholder="Name"
                />
                {errors.name && <div className="text-red-500">{errors.name.message}</div>}
            </div>
            <div className="w-2/3 items-center flex flex-col justify-center gap-1">
                {fields.map((field, index) => {
                    return (
                        <div key={field.id} className="p-3 border border-gray-300 flex gap-3">
                            <div>
                                <label htmlFor="hobby">
                                    Hobby
                                </label>
                                <input
                                {...register(`post.${index}.hobby`)}
                                className="mx-2 rounded-md border border-gray-300 text-sm p-1"
                                type="text" />
                            </div>

                            <div>
                                <label htmlFor="favorite_food">
                                    Favorite Food
                                </label>
                                <input
                                {...register(`post.${index}.favorite_food`)}
                                key={field.id}
                                className="mx-2 rounded-md border border-gray-300 text-sm p-1"
                                type="text" />
                            </div>

                            <div>
                                <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 py-0.5 rounded-md">Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="w-1/3">
                <button className="p-2 bg-blue-300 text-sm rounded-md" type="button" onClick={() => append({ hobby: '', favorite_food: '' })}>
                    Add More Fields
                </button>
                <button className="p-2 mx-2 bg-blue-300 text-sm rounded-md" type="submit">
                    Submit
                </button>
            </div>
        </form>
        )}
        </>
    )
}
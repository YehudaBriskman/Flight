import React, { useState } from 'react'
import Loading from '../shared/Loading'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Network, URLS } from '../Routes/NetworkService'
import { getAxiosStatus } from '../utils/utils'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import validator from 'email-validator'

const SignUp = () => {
    const [passwordType, setPasswordType] = useState("password")
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const nav = useNavigate()
    const signup = async (data) => {
        try {
            await Network.post(URLS.REGISTER, data) // Send data to server for registration
            nav("/login") // Navigate to login page upon successful registration
        } catch (error) {
            if (getAxiosStatus(error) == 409) {
                setError("error", { message: "email is already registered" })
            }
            else {
                console.log(getAxiosStatus(error) + ": ", error);
                setError("error", { message: "network error" }) // Set error for network issues
            }
        }
    }

    return (
        <div>
            <Loading on={isSubmitting} />
            <div className="max-w-sm mx-auto mt-8 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-lg">
                <form onSubmit={handleSubmit(signup)} className=" shadow-md rounded px-8 pt-6 pb-3 mb-4 items-center">
                    <div className='w-full text-center'><h1 className='text-black font-medium text-3xl pb-2'>Sign Up</h1></div>
                    <div className="mb-4 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded">
                        <label className="ps-1 block text-gray-700 text-sm font-bold ">Name</label>
                        <input
                            {...register("name", {
                                required: true,
                                validate: (value) => {
                                    if (!(value.length >= 6)) return "Password  most contains at-list 6 letters"
                                    if (!(value.length <= 12)) return "Password can not contains more than 12 letters"
                                    if (!(/[A-Z]/.test(value))) return "Password must include at-list 1 uppercase letter"
                                }
                            })}
                            style={{ boxShadow: "none" }}
                            type="text"
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none"
                        />
                    </div>
                    <div className='min-h-9 text-center pb-2'>{errors.name && <span className='text-xs text-red-700'>{errors.name.message}</span>}</div>
                    <div className="mb-4 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded">
                        <label className="ps-1 block text-gray-700 text-sm font-bold ">Email</label>
                        <input
                            {...register("email", {
                                required: true,
                                validate: (value) => {
                                    return validator.validate(value) ? true : 'Invalid email'
                                }
                            })}
                            style={{ boxShadow: "none" }}
                            type="email"
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none"
                        />
                    </div>
                    <div className='min-h-9 text-center pb-2'>{errors.email && <span className='text-xs text-red-700'>{errors.email.message}</span>}</div>
                    <div className="mb-4 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded flex justify-between">
                        <div className='w-[80%]'>
                            <label className="ps-1 block text-gray-700 text-sm font-bold ">Password</label>
                            <input
                                {...register("password", {
                                    required: true,
                                    validate: (value) => {
                                        if (!(value.length >= 6)) return "Password  most contains at-list 6 letters"
                                        if (!(value.length <= 12)) return "Password can not contains more than 12 letters"
                                        if (!(/[A-Z]/.test(value))) return "Password must include at-list 1 uppercase letter"
                                        if (!(/[0-9]/.test(value))) return "Password must include at-list 1 number"
                                    }
                                })}
                                style={{ boxShadow: "none" }}
                                type={passwordType}
                                className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:outline-none"
                            />
                        </div>
                        <div className='w-[20%] items-center flex justify-center'>
                            {passwordType == "text" && <IoMdEye className='size-6 text-black mt-4 cursor-pointer' onClick={() => setPasswordType("password")} />}
                            {passwordType == "password" && <IoMdEyeOff className='size-6 text-black mt-4 cursor-pointer' onClick={() => setPasswordType("text")} />}
                        </div>
                    </div>
                    <div className='min-h-9 text-center pb-2'>{errors.password && <span className='text-xs text-red-700'>{errors.password.message}</span>}</div>
                    <div className="mb-2 pb-2 text-center w-full">
                        <button type="submit" className="bg-gradient-to-r from-slate-400 via-gray-400 to-slate-400 shadow-lg text-black hover:scale-110 transition duration-300 ease-in-out font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default SignUp

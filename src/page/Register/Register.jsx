import { Button, Input, Select, SelectItem } from '@heroui/react'
import styles from './Register.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const [errMsg, setErrMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const schema = zod.object({
        name: zod.string().nonempty("name is req").min(3, 'name 3'),
        email: zod.string().nonempty("email is req").min(3, 'email 3'),
        dateOfBirth: zod.coerce.date().refine(function (value) {
            if (new Date().getFullYear() - value.getFullYear() >= 18) {
                return true
            }
        }, "you must change"),
        gender: zod.enum(['male', 'female']),
        password: zod.string().nonempty("password is req").min(3, 'password 3'),
        rePassword: zod.string(),
    }).refine(function (value) {
        if (value.password === value.rePassword) {
            return true
        } else {
            return false
        }
    }, {
        message: "repassword not croect"
        , path: ['rePassword']
    })
    const { handleSubmit, register, formState } = useForm({
        defaultValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "dateOfBirth": "",
            "gender": ""
        }, mode: 'onChange', resolver: zodResolver(schema)
    })
    const { errors } = formState
    function handleValue(values) {
        setErrMsg(null)
        setIsLoading(true)
        axios.post("https://linked-posts.routemisr.com/users/signup", values)
            .then(() => {
                setIsLoading(false)
                navigate('/login')
            })
            .catch((err) => {
                setErrMsg(err.response.data.error)
                setIsLoading(false)
            })
    }
    return (
        <main className='bg-gray-50 p-4 w-1/2 mx-auto shadow mt-5'>
            <h1>Register now </h1>
            {errMsg && <p className='text-red-500'>{errMsg}</p>}
            <form onSubmit={handleSubmit(handleValue)}>
                <Input
                    className=" my-3 bg-white"
                    label="name"
                    name="name"
                    type="text"
                    variant="bordered"
                    errorMessage={errors.name?.message}
                    isInvalid={errors.name}
                    {...register('name')}
                />
                <Input
                    className=" my-3 bg-white"
                    label="Email"
                    name="Email"
                    type="email"
                    variant="bordered"
                    errorMessage={errors.email?.message}
                    isInvalid={errors.email}
                    {...register('email', {
                        required: "password is required"
                    })}
                />
                <Input
                    className=" my-3 bg-white"
                    label="password"
                    name="password"
                    type="password"
                    variant="bordered"
                    errorMessage={errors.password?.message}
                    isInvalid={errors.password}
                    {...register('password', {
                        required: "password is required", minLength: {
                            value: 6, message: "in valid"
                        }
                    })}
                />
                <Input
                    className=" my-3 bg-white"
                    label="rePassword"
                    name="rePassword"
                    type="password"
                    variant="bordered"
                    errorMessage={errors.rePassword?.message}
                    isInvalid={errors.rePassword}
                    {...register('rePassword')}
                />
                <Input
                    className=" my-3 bg-white"
                    label="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    variant="bordered" errorMessage={errors.dateOfBirth?.message}
                    isInvalid={errors.dateOfBirth}
                    {...register('dateOfBirth', {
                        required: "date of birth is required"
                    })}

                />
                <Select className=" my-3" label="gender" errorMessage={errors.gender?.message}
                    isInvalid={errors.gender} {...register('gender', {
                        required: "gender is required"
                    })}
                >
                    <SelectItem key={"male"}>{"male"}</SelectItem>
                    <SelectItem key={"female"}>{"female"}</SelectItem>
                </Select>
                <Button type='submit' variant='bordered' isDisabled={isLoading} isLoading={isLoading}>{isLoading ? 'loading' : 'Register'}</Button>
            </form>
        </main >
    )
}

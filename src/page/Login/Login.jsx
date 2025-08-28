import { Button, Input, Select, SelectItem } from '@heroui/react'
import styles from './Login.module.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Auth/AuthContext'

export default function Login() {
    const navigate = useNavigate()
    const { setUserToken } = useContext(AuthContext)
    const [errMsg, setErrMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const schema = zod.object({
        email: zod.string().nonempty("email is req").min(3, 'email 3'),
        password: zod.string().nonempty("password is req").min(3, 'password 3'),
    })
    const { handleSubmit, register, formState } = useForm({
        defaultValues: {
            "email": "",
            "password": "",
        }, mode: 'onChange', resolver: zodResolver(schema)
    })
    const { errors } = formState
    function handleLogin(values) {
        setErrMsg(null)
        setIsLoading(true)
        axios.post("https://linked-posts.routemisr.com/users/signin", values)
            .then((res) => {
                if (res.data.message === 'success') {
                    setUserToken(res.data.token)
                    localStorage.setItem('token', res.data.token)
                    navigate('/')
                }
                setIsLoading(false)
                console.log(res);
            })
            .catch((err) => {
                setErrMsg(err.response.data.error)
                setIsLoading(false)
            })
    }
    return (
        <main className='bg-gray-50 p-4 w-1/2 mx-auto shadow mt-5'>
            <h1>Login now </h1>
            {errMsg && <p className='text-red-500'>{errMsg}</p>}
            <form onSubmit={handleSubmit(handleLogin)}>
                <Input
                    className=" my-3 bg-white"
                    label="Email"
                    name="Email"
                    type="email"
                    variant="bordered"
                    errorMessage={errors.email?.message}
                    isInvalid={errors.email}
                    {...register('email', {
                        required: "email is required"
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
                <Button type='submit' variant='bordered' isDisabled={isLoading} isLoading={isLoading}>{isLoading ? 'loading' : 'Login'}</Button>
            </form>
        </main >
    )
}

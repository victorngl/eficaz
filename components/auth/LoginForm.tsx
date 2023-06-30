import { useSession } from "next-auth/react"
import Header from "../header/Header";
import Head from "next/head";

import { signIn } from "next-auth/react"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


function LoginForm() {
    const router = useRouter()

    const [error, setError] = useState('');
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const notifyLoginSuccessful = () => toast.success("Login realizado com sucesso!");

    function handleFormChange(e) {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        var md5 = require('md5');
        
        await signIn('credentials', {
            redirect: false,
            email: loginInfo.email,
            password: md5(loginInfo.password),
            callbackUrl: '/'

        }).then((res) => {

            if (res?.error) {
                setError('Email ou Senha inválidos!')
            }

            if (res?.ok)
                notifyLoginSuccessful();
            router.push('/')


        })
    }

    //useEffect(() => {
    //if (router.query.error) {
    //    setError(router.query.error) // To prefill the email after redirect
    //  }
    //}, [router])


    return (
        <>
            <Header />
            <Head>
                <title>Eficaz - Login</title>
            </Head>

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <img className="m-5" src='/logo.png' alt="" />
                    {error &&

                        <div className="mb-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold mr-2">Oooops!</strong>
                            <span className="block sm:inline">{error}</span>
                        </div>

                    }

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Acessar
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input onChange={(e) => { handleFormChange(e) }} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="nome@email.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                    <input onChange={(e) => { handleFormChange(e) }} type="password" name="password" id="password" placeholder="••••••••" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Esqueceu a senha?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Entrar</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );




}

export default LoginForm;
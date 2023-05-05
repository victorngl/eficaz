import React, { useEffect, useState, useMemo, useRef } from 'react';

import Navbar from '../../../../../components/navbar/Navbar';
import Container from '../../../../../components/utils/Container';
import Footer from '../../../../../components/footer/Footer';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { User } from '../../../../../types/types';
import Head from 'next/head';
import Header from '../../../../../components/header/Header';
import UserForm from '../../../../../components/admin/users/UserForm';

function UserEditPage() {
    const router = useRouter();

    const { userId } = router.query;

    const notifySaveSuccefull = () => toast.success("Usuário editado com sucesso!");

    const [user, setUser] = useState<User>({
        id: 0,
        email: "",
        name: "",
        phone: "",
        cpf: "",
        password: "",
        role: 0,
    });


    useEffect(() => {
        if (userId != undefined) {
            fetch(`/api/user/${userId}`)
                .then((response) => { return response.json(); })
                .then(data => {
                    setUser(data);
                })
        }

    }, [userId])

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                notifySaveSuccefull()
                router.push('/admin/users')
            }
            return response.json();
        })
    };

    return (
        <>
            <Header />
            <Head>
                <title>Eficaz - Editar usuário #{user.id}</title>
            </Head>

            <Navbar />
            <Container>

                <div className='h-12 border-b-2 divide-secondary mb-5'>
                    <h4 className="text-2xl font-bold dark:text-white">Editar usuário - #{user.id}</h4>
                </div>

                <UserForm user={user} setUser={setUser} />

                <div className='flex mt-4'>
                    <div className='w-6/12 text-left flex gap-8'>
                        <button onClick={e => handleUpdateUser(e)} type='button' className='p-4 rounded text-sm bg-green-500 hover:bg-green-800 text-white'>Salvar</button>
                    </div>
                </div>

            </Container>
            <Footer />

        </>
    )
}

export default UserEditPage;
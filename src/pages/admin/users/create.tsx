import Head from 'next/head';
import Header from '../../../../components/header/Header';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Container from '../../../../components/utils/Container';
import Footer from '../../../../components/footer/Footer';
import Navbar from '../../../../components/navbar/Navbar';
import UsersShowTable from '../../../../components/admin/users/UsersShowTable';
import SearchField from '../../../../components/utils/SearchField';
import { toast } from 'react-toastify';
import { User } from '../../../../types/types';
import UserForm from '../../../../components/admin/users/UserForm';


export default function UserCreate() {
    const router = useRouter();
    const notifyCreateSuccefull = () => toast.success("Usuário criado com sucesso!");
    const notifyPasswordRequired = () => toast.error("Preencha o campo senha!");

    const [user, setUser] = useState<User>({
        email: "",
        name: "",
        phone: "",
        cpf: "",
        password: "",
        role: 0,
    });

    const handleUserCreate = async (e: any) => {
        e.preventDefault();
        
        if(user.password === '') {
            notifyPasswordRequired();
            return;
        }


        fetch("/api/user/create", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              notifyCreateSuccefull()
              router.push('/admin/users')
            }
            return response.json();
          })
      };
    
    return (
        <>
            <Header />
            <Head>
                <title>Eficaz - Criar usuário</title>
            </Head>

            <Navbar />
            <Container>
                <div className='h-12 border-b-2 divide-secondary mb-5'>
                    <h4 className="text-2xl font-bold dark:text-white">Criar usuário</h4>
                </div>

                <UserForm user={user} setUser={setUser} />

                
                <div className='flex mt-4'>
                    <div className='w-6/12 text-left flex gap-8'>
                        <button onClick={ e => handleUserCreate(e) } type='button' className='p-4 rounded text-sm bg-green-500 hover:bg-green-800 text-white'>Salvar</button>
                    </div>
                </div>

            </Container>
            <Footer />
        </>
    );
}
import Head from 'next/head';
import Header from '../../../../components/header/Header';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Container from '../../../../components/utils/Container';
import Footer from '../../../../components/footer/Footer';
import Navbar from '../../../../components/navbar/Navbar';
import UsersShowTable from '../../../../components/admin/users/UsersShowTable';
import SearchField from '../../../../components/utils/SearchField';


export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [busca, setBusca] = useState('');

    const router = useRouter();

    useEffect(() => {
        fetch('/api/user/')
            .then((response) => { return response.json(); })
            .then(data => { setUsers(data); })

    }, [])

    const filteredUsers = useMemo(() => {
        const lowerBusca = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return users
            .filter((user) => user.name
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(lowerBusca))
    }, [busca, users])

    return (
        <>
            <Header />
            <Head>
                <title>Eficaz - Admin Usuários</title>
            </Head>

            <Navbar />
            <Container>
                <div className='h-12 border-b-2 divide-secondary mb-5'>
                    <h4 className="text-2xl font-bold dark:text-white">Usuários</h4>
                </div>

                <div className='space-y-2 mb-2'>
                    <p>Buscar</p>
                    <div className='flex justify-between'>
                        <SearchField onChange={(e) => setBusca(e.target.value)}></SearchField>
                        <button type='button' className='text-sm p-2 font-semibold rounded-lg bg-green-500 text-white' onClick={() => router.push(`/orcamento/create`)}>Criar usuário</button>
                    </div>
                </div>

                <UsersShowTable dataRaw={users} setData={setUsers} data={filteredUsers} />

            </Container>
            <Footer />
        </>
    );
}
import Head from 'next/head';
import Header from '../../../components/header/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '../../../components/utils/Container';
import Footer from '../../../components/footer/Footer';
import Navbar from '../../../components/navbar/Navbar';
import FunctionCard from '../../../components/admin/users/FunctionCards';

export default function AdminDashboard() {
    const router = useRouter();


    return (
        <>
            <Header />
            <Head>
                <title>Eficaz - Admin Dashboard</title>
            </Head>

            <Navbar />
            <Container>
                <div className='h-12 border-b-2 divide-secondary mb-5'>
                    <h4 className="text-2xl font-bold dark:text-white">Administrador</h4>
                </div>

            <FunctionCard link="/admin/users/" image='https://static.vecteezy.com/system/resources/previews/009/636/683/original/admin-3d-illustration-icon-png.png' />   
                
            </Container>
            <Footer />
        </>
    );
}
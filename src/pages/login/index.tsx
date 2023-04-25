import Head from 'next/head';
import Header from '../../../components/header2/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  const { message } = router.query;
  
  console.log(router.query)

  return (

    <LoginForm />

  );
}
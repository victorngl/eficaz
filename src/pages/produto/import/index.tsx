import React from 'react';
import Head from 'next/head'
import router from 'next/router';

import Navbar from '../../../../components/navbar/Navbar';
import Container from '../../../../components/utils/Container';
import Divider from '../../../../components/utils/Divider';
import Footer from '../../../../components/footer/Footer';

export default function ImportHomePage() {

  const handleFileExampleDownload = () => {
    const fileUrl = `/importacao/exemplo.xlsx`;

    // Cria um link para iniciar o download
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = fileUrl;
    a.download = 'exemplo.xlsx';

    // Adiciona o link ao documento e simula o clique
    document.body.appendChild(a);
    a.click();

    // Remove o link do documento
    document.body.removeChild(a);
  }


  return (
    <>
      <Head>
        <title>Eficaz - Importação</title>
      </Head>

      <Navbar />
      <Container>

        <p className='font-bold text-lg my-2'>Importação de Produtos por Planilha</p>
        <p className='text-sm my-2'>O processo de importação fica melhor feito de um computador desktop.</p>

        <Divider className='my-2' />


        <div className='space-y-2'>

          <div className='flex space-x-5'>
            <button type='button' className='text-sm p-2 font-semibold rounded bg-green-500 text-white' onClick={() => router.push(`/produto/import/adittional`)}>Importação Adicional</button>
            <button type='button' className='text-sm p-2 font-semibold rounded bg-green-500 text-white' onClick={() => router.push(`/produto/import/entirebd`)}>Importação de Banco de dados</button>
            <button type='button' className='text-sm p-2 font-semibold rounded bg-blue-500 text-white' onClick={() => router.push(`/produto/export`)}>Exportar Banco de dados</button>
            <button type='button' className='text-sm p-2 font-semibold rounded bg-blue-500 text-white' onClick={() => handleFileExampleDownload()}>Download planilha de exemplo</button>

          </div>

        </div>

        <Divider className='my-2' />


      </Container>
      <Footer />
    </>
  )
}

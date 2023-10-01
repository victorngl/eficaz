import React, { useState } from 'react';
import Head from 'next/head'
import router from 'next/router';
import XLSX from 'sheetjs-style';
import Navbar from '../../../../components/navbar/Navbar';
import Container from '../../../../components/utils/Container';
import Divider from '../../../../components/utils/Divider';
import Footer from '../../../../components/footer/Footer';
import Boundary from '../../../../components/utils/Boundary';

export default function ImportAdittional() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleBdExport = async () => {

    const req = await fetch('/api/products/products/');
    const productsJson = await req.json();

    console.log(productsJson);

    var wb = XLSX.utils.book_new();
    
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(productsJson);

    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');

    XLSX.writeFile(wb, 'produtos.xlsx');
  };

  return (
    <>
      <Head>
        <title>Eficaz - Importação Adicional</title>
      </Head>

      <Navbar />
      <Container>

        <p className='font-bold text-lg my-2'>Exportação de todo banco de dados para Planilha Excel.</p>
        <p className='text-sm my-2'>O processo de exportação fica melhor feito de um computador desktop.</p>
        <p className='font-bold text-sm my-2'>Esse processo irá exportar <b>todos</b> os produtos existentes no banco de dados</p>


        <Divider className='my-2' />

        {error && <Boundary type='error'>{error}</Boundary>}
        {success && <Boundary type='success'>{success}</Boundary>}

        <div className='space-y-2'>

          <div className='flex space-x-5'>


          </div>

        </div>

        <Divider className='my-2' />
        <button type='button' className='text-sm p-2 font-semibold rounded bg-red-500 text-white' onClick={() => handleBdExport()}>Exportar Banco de Dados</button>

      </Container>
      <Footer />
    </>
  )
}

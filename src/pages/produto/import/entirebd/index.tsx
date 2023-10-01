import React, { useState } from 'react';
import Head from 'next/head'
import router from 'next/router';

import Navbar from '../../../../../components/navbar/Navbar';
import Container from '../../../../../components/utils/Container';
import Divider from '../../../../../components/utils/Divider';
import Footer from '../../../../../components/footer/Footer';
import ImportFileUploadForm from '../../../../../components/product/import/ImportForm';
import Boundary from '../../../../../components/utils/Boundary';

export default function ImportAdittional() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');


  const handleSubmitUploadImportFile = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/products/import/entire', {
        method: 'POST',
        body: formData,
      });

      const responseMessage = await response.json();
      if (response.ok) {
        // Lide com a resposta de sucesso aqui
        console.log(responseMessage.message);
        setSuccess(responseMessage.message)
      } else {
        // Lide com erros aqui
        setError(responseMessage.error)
        console.log('Erro ao importar planilha:', error);
      }
    } catch (error) {

      setError('Erro ao enviar sua requisição.')
      console.log('Erro ao enviar requisição:', error);
    }
  };
  return (
    <>
      <Head>
        <title>Eficaz - Importação Adicional</title>
      </Head>

      <Navbar />
      <Container>

        <p className='font-bold text-lg my-2'>Importação de Produtos por Planilha - TOTAL</p>
        <p className='text-sm my-2'>O processo de importação fica melhor feito de um computador desktop.</p>
        <p className='font-bold text-sm my-2'>(Campos origatórios na planilha: name, unity. price, supplier, quantity)</p>
        <p className='font-bold text-sm my-2 text-red-700'>[ATENÇÃO] Esse processo apaga todo banco de dados e cria um novo a partir da planilha enviada!</p>



        <Divider className='my-2' />

        {error && <Boundary type='error'>{error}</Boundary>}
        {success && <Boundary type='success'>{success}</Boundary>}

        <div className='space-y-2'>

          <div className='flex space-x-5'>


          </div>

        </div>

        <Divider className='my-2' />

        <ImportFileUploadForm onFileUpload={handleSubmitUploadImportFile} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />

      </Container>
      <Footer />
    </>
  )
}

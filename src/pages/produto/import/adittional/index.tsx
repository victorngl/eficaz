import React, { useState } from 'react';
import Head from 'next/head'
import router from 'next/router';

import Navbar from '../../../../../components/navbar/Navbar';
import Container from '../../../../../components/utils/Container';
import Divider from '../../../../../components/utils/Divider';
import Footer from '../../../../../components/footer/Footer';
import ImportFileUploadForm from '../../../../../components/product/import/ImportForm';
import ErrorBoundary from '../../../../../components/utils/ErrorBoundary';
import SuccessBoundary from '../../../../../components/utils/SuccessBoundary';

export default function ImportAdittional() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');


  const handleSubmitUploadImportFile = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/products/import/adittional', {
        method: 'POST',
        body: formData,
      });

      const responseMessage = await response.json();
      if (response.ok) {
        // Lide com a resposta de sucesso aqui
        console.log('Planilha importada com sucesso!');
        setSuccess('Planilha importada com sucesso!')
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

        <p className='font-bold text-lg my-2'>Importação de Produtos por Planilha - Adicional</p>
        <p className='text-sm my-2'>O processo de importação fica melhor feito de um computador desktop.</p>
        <p className='font-bold text-sm my-2'>(Campos origatórios na planilha: name, unity. price, supplier, quantity)</p>


        <Divider className='my-2' />

        {error && <ErrorBoundary message={error}/>}
        {success && <SuccessBoundary message={success}/>}

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

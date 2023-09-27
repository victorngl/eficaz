import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head'
import router from 'next/router';

import Navbar from '../../../../../components/navbar/Navbar';
import Container from '../../../../../components/utils/Container';
import SearchField from '../../../../../components/utils/SearchField';
import Divider from '../../../../../components/utils/Divider';

import Footer from '../../../../../components/footer/Footer';
import ProductsShowTable from '../../../../../components/product/ProductsShowTable';

import { Product } from '../../../../../types/types';

export default function ProdutosPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [busca, setBusca] = useState<string>('');

  useEffect(() => {
    fetch('/api/products/products')
      .then((response) => { return response.json(); })
      .then(data => { setProducts(data); })

  }, [])

  const filteredProducts = useMemo(() => {
    const lowerBusca = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return products
      .filter((product) => product.name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .includes(lowerBusca))
  }, [busca, products])

  return (
    <>
      <Head>
        <title>Eficaz - Produtos</title>
      </Head>

      <Navbar />
      <Container>

        <p className='font-bold text-lg my-2'>Importação de Produtos por Planilha</p>
        <p className='text-sm my-2'>O processo de importação fica melhor feito de um computador desktop.</p>

        <Divider className='my-2' />


        <div className='space-y-2'>
          
          <div className='flex space-x-5'>
              <button type='button' className='text-sm p-2 font-semibold rounded bg-green-500 text-white' onClick={() => router.push(`/produto/create`)}>Importação Adicional</button>
              <button type='button' className='text-sm p-2 font-semibold rounded bg-green-500 text-white' onClick={() => router.push(`/produto/create`)}>Importação de Banco de dados</button>              
              <button type='button' className='text-sm p-2 font-semibold rounded bg-blue-500 text-white' onClick={() => router.push(`/produto/create`)}>Exportar Banco de dados</button>
              <button type='button' className='text-sm p-2 font-semibold rounded bg-blue-500 text-white' onClick={() => router.push(`/produto/create`)}>Download planilha de exemplo</button>

          </div>

        </div>

        <Divider className='my-2' />


      </Container>
      <Footer />
    </>
  )
}
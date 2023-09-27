import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head'
import router from 'next/router';

import Navbar from '../../../components/navbar/Navbar';
import Container from '../../../components/utils/Container';
import SearchField from '../../../components/utils/SearchField';
import Divider from '../../../components/utils/Divider';

import Footer from '../../../components/footer/Footer';
import ProductsShowTable from '../../../components/product/ProductsShowTable';

import { Product } from '../../../types/types';

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

        <p className='font-bold text-lg my-2'>Produtos</p>

        <Divider className='my-2' />


        <div className='space-y-2'>
          <p>Buscar</p>
          <div className='flex space-x-5'>
            <SearchField onChange={(e) => setBusca(e.target.value)}></SearchField>
           
              <button type='button' className='text-sm p-2 font-semibold rounded bg-green-500 text-white' onClick={() => router.push(`/produto/create`)}>Criar produto</button>
              <button type='button' className='text-sm p-2 font-semibold rounded bg-blue-500 text-white' onClick={() => router.push(`/produto/import`)}>Importação por Planilha</button>
            
          </div>

        </div>

        <Divider className='my-2' />

        <ProductsShowTable dataRaw={products} data={filteredProducts} setData={setProducts} />

      </Container>
      <Footer />
    </>
  )
}

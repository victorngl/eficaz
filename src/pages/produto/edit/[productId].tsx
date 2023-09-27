import React, { useEffect, useState } from 'react';

import Divider from '../../../../components/utils/Divider';
import Navbar from '../../../../components/navbar/Navbar';
import Container from '../../../../components/utils/Container';
import Footer from '../../../../components/footer/Footer';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Product } from '../../../../types/types';

import Head from 'next/head';
import ProductInfo from '../../../../components/product/ProductInfo';

export default function EditPage() {
  const router = useRouter();
  const { productId } = router.query;

  const notifySaveSuccefull = () => toast.success("Produto editado com sucesso!");

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    supplier: '',
  });

  useEffect(() => {
    if (productId != undefined) {
      fetch(`/api/products/${productId}`)
        .then((response) => { return response.json(); })
        .then(data => {
          setProduct(data);
        })
    }

  }, [productId])

  const saveProduct = async (e) => {
    e.preventDefault();

    fetch("/api/products/update", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        notifySaveSuccefull()
        router.push('/produto')
      }
      return response.json();
    })
  };

  return (
    <>
      <Head>
        <title>Eficaz - Editar Produto</title>
      </Head>

      <Navbar />
      <Container>

        <div className='h-12 border-b-2 divide-secondary mb-5'>
          <h4 className="text-2xl font-bold dark:text-white">Editar produto - #{product.id}</h4>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
        <form onSubmit={(e) => saveProduct(e)}>

          <ProductInfo product={product} setProduct={setProduct} />

          <div className='gap-4 flex'>
            <button type='submit' className='mt-3 p-3 rounded bg-green-500 text-white font-semibold text-sm'>Salvar</button>
            <button type='button' onClick={ (e) => router.back() } className='mt-3 p-3 rounded bg-blue-500 text-white font-semibold text-sm'>Cancelar</button>
          </div>

        </form>

      </Container>
      <Footer />

    </>
  )
}

// <ExportEstimateExcel estimate={estimate} selectedProducts={estimate.products} />



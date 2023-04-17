import React, { useEffect, useState, useMemo, useRef } from 'react';

import Box from '@mui/material/Box';
import { Divider, Button, Typography } from '@mui/material';
import '@fontsource/roboto/400.css';

import Navbar from '../../../components/utils/Navbar';
import Estimate from '../../../components/estimate/Estimate';
import SearchField from '../../../components/estimate/SearchField';
import EstimateSelectedTable from '../../../components/estimate/EstimateSelectedTable';
import EditSelectedProduct from '../../../components/estimate/EditSelectedProduct';
import FilteredListProducts from '../../../components/estimate/FilteredListProducts';
import CompanyInfo from '../../../components/estimate/CompanyInfo';
import Footer from '../../../components/footer/Footer';
<<<<<<< HEAD
import Header from '../../../components/header/Header';
=======
import Header from '../../../components/Header/Header';
>>>>>>> bb1c3a1d0e5fe88cc2fe4def6bc9ae0a62404e2e


import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Product } from '../../../types/types';

export default function EstimatePage() {
  const router = useRouter();

  const notifyCreateSuccefull = () => toast.success("Orçamento criado com sucesso!");

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  const [estimate, setEstimate] = useState({
    id: 0,
    name: "",
    cnpj: "",
    statusId: 1,
    products: [],
    totalprice: 0,
  });

  const [busca, setBusca] = useState<String>('');

  useEffect(() => {
    fetch('/api/products/products')
      .then((response) => { return response.json(); })
      .then(data => { setProducts(data); })
  }, [])


  //Add a item to orçamento
  function handleAddProduct(product: Product) {

    let totalProductPrice = (product.price * product.quantity);
    product.price_amount = totalProductPrice;

    let newList = estimate.products;
    newList.push(product);

    setEstimate({
      ...estimate,
      products: newList,
      totalprice: estimate.totalprice + totalProductPrice
    });

  }

  function handleRemoveProduct(index, product) {
    //Desabilita o botao para evitar bugs;
    let totalProductPrice = (product.price * product.quantity);

    let totalAmount = estimate.totalprice - totalProductPrice
    if (totalAmount < 0.2) { totalAmount = 0; }

    let List = estimate.products;
    let newList = List.filter((_, i) => i !== index)

    setEstimate({
      ...estimate,
      products: newList,
      totalprice: totalAmount,
    });

  }

  const saveEstimate = async (e: any) => {
    e.preventDefault();

    fetch("/api/estimate/create", {
      method: "POST",
      body: JSON.stringify(estimate),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          notifyCreateSuccefull()
          router.push('/orcamento')
        }
        return response.json();
      })


  };

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
  }

  //Busca no Array
  const filteredProducts = useMemo(() => {
    const lowerBusca = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filtered = products
      .filter((product) => product.name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .includes(lowerBusca))

    const limited = filtered.filter((val, i) => i < 5)

    return limited
  }, [busca, products])



  return (
    <>
      <Header title={'Orçamento'}/>
      <Navbar />

      <Estimate>

        <form onSubmit={(e) => saveEstimate(e)}>

          <CompanyInfo estimate={estimate} setEstimate={setEstimate} />

          <Box className='font-bold text-lg'>

            <div>
              <Typography variant="h6">
                Buscar Produtos
              </Typography>
              <SearchField className='w-full' onChange={(e) => setBusca(e.target.value)} />
            </div>

            <Divider className='my-2' />

            <div className='w-full md:flex md:space-x-4 mb-10'>
              <FilteredListProducts filteredProducts={filteredProducts} handleSelectProduct={handleSelectProduct} />
              <EditSelectedProduct selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} handleAddProduct={handleAddProduct} />
            </div>

            <Divider className='my-2' />
              <EstimateSelectedTable estimate={estimate} handleRemoveProduct={handleRemoveProduct} />
            <Divider className='my-5' />

            <Box className='flex'>
              <Box className='w-6/12 text-left flex gap-8'>
                <Button type='submit' className='bg-green-500 hover:bg-green-200 text-white ml-2'>Salvar</Button>
              </Box>
            </Box>

          </Box>

        </form>

      </Estimate>
      <Footer/>

    </>
  )
}

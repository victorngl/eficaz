import * as React from 'react';

import { useRouter } from 'next/router'
import { useState, memo } from 'react';
import ConfirmModal from '../utils/ConfirmModal';
import Pagination from '../utils/Paginations';
import { paginate } from '../../helpers/paginate';


function ProductsShowTable({ data, setData, dataRaw }) {

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 70;
  const paginatedProducts = paginate(data, currentPage, pageSize);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const router = useRouter();

  const [deleteModalOpen, SetDeleteModalOpen] = useState(false)

  const [productToDelete, setProductToDelete] = useState(undefined);

  const deleteProduct = (deleteId) => {

    if (deleteId != undefined) {
      fetch(`/api/products/delete/${deleteId}`)
        .then((response) => {
          if (response.ok)
            return response.json();
        })
        .then((resData) => {
          setData(dataRaw.filter(product => product.id !== resData.id))
        })
    }
  }

  return (
    <>
      <ConfirmModal open={deleteModalOpen} setOpen={SetDeleteModalOpen} performerDelete={deleteProduct} idToDelete={productToDelete}><p>Você tem certeza que deseja excluir esse produto ?</p></ConfirmModal>

      <div className='hidden md:block'>
        <table className="w-fit md:w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr className='items-center'>
              <th scope="col" className="text-center py-3">Código</th>
              <th scope="col" className="text-center py-3">Nome</th>
              <th scope="col" className="text-center py-3">Unidade</th>
              <th scope="col" className="text-center py-3">Valor (R$)</th>
              <th scope="col" className="text-center py-3">Fornecedor</th>
              <th scope="col" className="text-center py-3">Ações</th>
            </tr>
          </thead>
          <tbody className=''>
            {paginatedProducts.map((product, index) => (
              <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" className="text-center px-6 py-2 font-semibold text-gray-900 dark:text-white">
                  #{product.id}
                </td>
                <td scope="row" className="text-left px-6 py-2 font-medium text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {product.unity}</td>
                <td scope="row" className="w-32 text-center px-6 py-2 font-bold text-gray-900 dark:text-white">
                  R$ {product.price}</td>
                <td scope="row" className="w-32 text-center px-6 py-2 font-bold text-gray-900 dark:text-white">
                  {product.supplier}</td>
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                  <div className='flex gap-2 justify-center'>
                    <button className='p-2 rounded bg-red-500 text-white  hover:bg-red-200' onClick={() => { setProductToDelete(product.id); SetDeleteModalOpen(true) }}>
                      Excluir
                    </button>
                    <button className='p-2 rounded bg-yellow-400 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/produto/edit/${product.id}`)}>
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='md:hidden space-y-3'>
        {paginatedProducts.map((product, index) => (
          <div key={product.id} className='grid grid-cols-1 shadow'>
            <div className='bg-white p-4 rounded-lg shadow space-y-2'>
              <div className='items-center space-y-3 text-lg'>
                <div className='text-sm'><label className='font-bold'>Nome: </label>{product.name}</div>
                <div className='text-sm'><label className='font-bold'>Unidade: </label>{product.unity}</div>
                <div className='text-sm'><label className='font-bold'>Preço: </label>R$ {product.price}</div>
                <div className='text-sm'><label className='font-bold'>Fornecedor: </label>{product.supplier}</div>
              </div>
              <div>
                <div className='flex gap-2 justify-center'>
                  <button className='p-2 rounded bg-red-500 text-white  hover:bg-red-200' onClick={() => { setProductToDelete(product.id); SetDeleteModalOpen(true) }}>
                    Excluir
                  </button>
                  <button className='p-2 rounded bg-yellow-400 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/produto/edit/${product.id}`)}>
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        items={data.length} // 100
        currentPage={currentPage} // 1
        pageSize={pageSize} // 10
        onPageChange={onPageChange}
      />
    </>
  );
}

export default ProductsShowTable;
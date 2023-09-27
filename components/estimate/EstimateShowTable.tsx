import * as React from 'react';

import { useRouter } from 'next/router'
import { useState } from 'react';
import ConfirmModal from '../utils/ConfirmModal';
import { paginate } from '../../helpers/paginate';
import Pagination from '../utils/Paginations';

export default function EstimateShowTable({ dataRaw, data, setData }) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const paginatedEstimates = paginate(data, currentPage, pageSize);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const [modalOpen, setModalOpen] = useState(false)
  const [estimateToDelete, setEstimateToDelete] = useState(null);

  const deleteEstimate = (id) => {
    if (id != undefined) {
      fetch(`/api/estimate/delete/${id}`)
        .then((response) => { 
            if(response.ok)
              return response.json(); })
        .then( (resData) => {
          setData(dataRaw.filter(estimate => estimate.id !== resData.id))
        })
    }
  }

  return (
    <>
      <ConfirmModal open={modalOpen} setOpen={setModalOpen} performerDelete={deleteEstimate} idToDelete={estimateToDelete}><p>Você tem certeza que deseja excluir esse orçamento ?</p></ConfirmModal>

      <div className='hidden md:block'>
        <table className="w-fit md:w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr className='items-center'>
              <th scope="col" className="text-center py-3">Código</th>
              <th scope="col" className="text-center py-3">Nome</th>
              <th scope="col" className="text-center py-3">CNPJ</th>
              <th scope="col" className="text-center py-3">Status</th>
              <th scope="col" className="text-center py-3">Valor Total (R$)</th>
              <th scope="col" className="text-center py-3">Ações</th>
            </tr>
          </thead>
          <tbody className=''>
            {paginatedEstimates.map((estimate, index) => (
              <tr key={estimate.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" className="text-center px-6 py-2 font-semibold text-gray-900 dark:text-white">
                  #{estimate.id}
                </td>
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                  {estimate.name}
                </td>
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {estimate.cnpj}</td>
                <td scope="row" className="whitespace-nowrap w-32 text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                  {estimate.status.name}</td>
                <td scope="row" className="text-center px-6 py-2 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                  R$ {estimate.totalprice.toFixed(2)}</td>
                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                  <div className='flex gap-2 justify-center'>
                    <button className='p-2 rounded bg-red-500 text-white  hover:bg-red-200' onClick={() => { setEstimateToDelete(estimate.id); setModalOpen(true) }}>
                      Excluir
                    </button>
                    <button className='p-2 rounded bg-yellow-400 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/orcamento/edit/${estimate.id}`)}>
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
        {paginatedEstimates.map((estimate, index) => (
          <div key={estimate.id} className='grid grid-cols-1 shadow'>
            <div className='bg-white p-4 rounded-lg shadow space-y-2'>
              <div className='items-center space-y-3 text-lg'>
                <div className='text-sm'><label className='font-bold'>Nome: </label>{estimate.name}</div>
                <div className='text-sm'><label className='font-bold'>CNPJ: </label>{estimate.cnpj}</div>
                <div className='text-sm'><label className='font-bold'>Status: </label>{estimate.status.name}</div>
                <div className='text-sm'><label className='font-bold'>Valor Total: </label>R$ {estimate.totalprice.toFixed(2)}</div>
              </div>
              <div>
                <div className='flex gap-2 justify-center'>
                  <button className='p-2 rounded bg-red-500 text-white  hover:bg-red-200' onClick={() => { setEstimateToDelete(estimate.id); setModalOpen(true) }}>
                    Excluir
                  </button>
                  <button className='p-2 rounded bg-yellow-400 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/orcamento/edit/${estimate.id}`)}>
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
import * as React from 'react';

import { useRouter } from 'next/router'
import { useState } from 'react';
import ConfirmModal from '../../utils/ConfirmModal';
import { paginate } from '../../../helpers/paginate';
import Pagination from '../../utils/Paginations';

export default function UsersShowTable({ dataRaw, data, setData }) {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const paginatedUsers = paginate(data, currentPage, pageSize);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null);

    const deleteUser = (id) => {
        if (id != undefined) {
            fetch(`/api/user/delete/${id}`)
                .then((response) => {
                    if (response.ok)
                        return response.json();
                })
                .then((resData) => {
                    setData(dataRaw.filter(user => user.id !== resData.id))
                })
        }
    }
    return (
        <>
            <ConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} performerDelete={deleteUser} idToDelete={userToDelete}><p>Você tem certeza que deseja excluir esse usuário ?</p></ConfirmModal>

            <div className='hidden md:block'>
                <table className="w-fit md:w-full text-sm text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='items-center'>
                            <th scope="col" className="text-center py-3">Código</th>
                            <th scope="col" className="text-center py-3">E-mail</th>
                            <th scope="col" className="text-center py-3">Nome</th>
                            <th scope="col" className="text-center py-3">Telefone</th>
                            <th scope="col" className="text-center py-3">CPF</th>
                            <th scope="col" className="text-center py-3">Role</th>
                            <th scope="col" className="text-center py-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {paginatedUsers.map((user, index) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td scope="row" className="text-center px-6 py-2 font-semibold text-gray-900 dark:text-white">
                                    #{user.id}
                                </td>
                                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                                    {user.email}
                                </td>
                                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {user.name}</td>
                                <td scope="row" className="whitespace-nowrap w-32 text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                                    {user.phone}</td>
                                <td scope="row" className="text-center px-6 py-2 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                    {user.cpf}</td>
                                <td scope="row" className="whitespace-nowrap w-32 text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                                    {user.role}</td>
                                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                                    <div className='flex gap-2 justify-center'>
                                        <button className='p-2 rounded bg-red-500 text-white  hover:bg-red-200' onClick={() => { setUserToDelete(user.id); setDeleteModalOpen(true) }}>
                                            Excluir
                                        </button>
                                        <button className='p-2 rounded bg-yellow-400 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/users/edit/${user.id}`)}>
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
                {paginatedUsers.map((user, index) => (
                    <div key={user.id} className='grid grid-cols-1 shadow'>
                        <div className='bg-white p-4 rounded-lg shadow space-y-2'>
                            <div className='items-center space-y-3 text-lg'>
                                <div className='text-sm'><label className='font-bold'>Código: </label>#{user.id}</div>
                                <div className='text-sm'><label className='font-bold'>E-mail: </label>{user.email}</div>
                                <div className='text-sm'><label className='font-bold'>Nome: </label>{user.name}</div>
                                <div className='text-sm'><label className='font-bold'>Telefone: </label>{user.phone}</div>
                                <div className='text-sm'><label className='font-bold'>CPF: </label>{user.cpf}</div>
                                <div className='text-sm'><label className='font-bold'>Role: </label>{user.role}</div>
                            </div>
                            <div>
                                <div className='flex gap-2 justify-center'>
                                    <button className='p-2 rounded bg-red-500 text-white  hover:bg-red-200' onClick={() => { setUserToDelete(user.id); setDeleteModalOpen(true) }}>
                                        Excluir
                                    </button>
                                    <button className='p-2 rounded bg-yellow-400 text-white hover:bg-yellow-200' onClick={(e) => router.push(`/users/edit/${user.id}`)}>
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

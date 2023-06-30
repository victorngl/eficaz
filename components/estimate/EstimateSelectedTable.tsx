export default function EstimateSelectedTable({ estimate, handleRemoveProduct }) {
    //Add a item to orçamento
    //
    return (
        <>
            <div className="flex items-center justify-between font-bold w-full mb-5">
                <p className='text-left'>Produtos Selecionados</p>
                <p className='text-right'>Valor Total: R$ {Number(estimate.totalprice).toFixed(2)}</p>
            </div>

            <div className='hidden md:block'>
                <table className="w-fit md:w-full text-sm text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='items-center'>
                            <th scope="col" className="text-center py-3">Nome</th>
                            <th scope="col" className="text-center py-3">Unidade de Medida</th>
                            <th scope="col" className="text-center py-3">Preço Unitário (R$)</th>
                            <th scope="col" className="text-center py-3">Quantidade</th>
                            <th scope="col" className="text-center py-3">Valor Total (R$)</th>
                            <th scope="col" className="text-center py-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {estimate.products.map((row, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td scope="row" className="text-left px-6 py-2 font-medium text-gray-900 dark:text-white">
                                    {row.name}
                                </td>
                                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {row.unity}</td>
                                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    R$ {row.price}</td>
                                <td scope="row" className="w-32 text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                                    {row.quantity}</td>
                                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    R$ {row.price * row.quantity}</td>
                                <td scope="row" className="text-center px-6 py-2 font-medium text-gray-900 dark:text-white">
                                    <button className='bg-red-500 text-white p-2 rounded-lg font-semibold' type="button" onClick={e => handleRemoveProduct(index, row)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='block md:hidden space-y-2'>
                {estimate.products.map((row, index) => (
                    <div key={index} className='divide-y-2 rounded border-2'>
                        <div className='grid grid-cols-2 p-2'>
                            <p className='text-sm'>Nome:</p>
                            <p className='text-xs white'>{row.name}</p>
                        </div>
                        <div className='grid grid-cols-2 p-2'>
                            <p className='text-sm'>Unidade de Medida:</p>
                            <p className='text-xs white'>{row.unity}</p>
                        </div>
                        <div className='grid grid-cols-2 p-2'>
                            <p className='text-sm'>Preço Unitário (R$):</p>
                            <p className='text-xs'>R$ {row.price}</p>
                        </div>
                        <div className='grid grid-cols-2 p-2'>
                            <p className='text-sm'>Quantidade:</p>
                            <p className='text-xs'>{row.quantity} {row.unity}</p>
                        </div>
                        <div className='grid grid-cols-2 p-2'>
                            <p className='text-sm'>Preço Total (R$):</p>
                            <p className='text-xs'>R$ {row.quantity*row.price}</p>
                        </div>
                        <div className='grid grid-cols-2 p-2'>
                            <button className='w-24 text-sm bg-red-500 text-white p-1 rounded-lg font-semibold' type="button" onClick={e => handleRemoveProduct(index, row)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

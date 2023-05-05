import InputMask from 'react-input-mask';
import { userHasPermission } from '../../../helpers/haspermission';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

function CompanyInfo({ user, setUser }) {
    const { data: session, status } = useSession();

    function handleFormChange(e) {
        const { name, value } = e.target;

        if (name === 'password') {
            var md5 = require('md5');
            setUser({ ...user, [name]: md5(value)});
        }

        else {
            setUser({ ...user, [name]: value });
        }
    }
    return (
        <>
            <div className="justify-center items-center">
                <div className="rounded-lg bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full bg-white">
                    <div className="relative flex flex-row justify-between">
                        <h2 className="text-xl font-semibold text-navy-700 dark:text-white mb-3">
                            Dados do Usuário
                        </h2>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="name" className="text-sm text-navy-700 dark:text-white font-bold">Nome:</label>
                        <input required value={user.name} onChange={(e) => handleFormChange(e)} type="text" name="name" id="name" placeholder="" className="mt-2 flex h-12 w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-sm outline-none border-gray-200 focus:border-gray-500 bg-gray-100" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cpf" className="text-sm text-navy-700 dark:text-white font-bold">CPF:</label>
                        <InputMask required value={user.cpf} onChange={(e) => handleFormChange(e)} mask="999.999.999-99" name="cpf" type="text" placeholder="" className="mt-2 flex h-12 w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-sm outline-none focus:border-gray-500 bg-gray-100"></InputMask>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="text-sm text-navy-700 dark:text-white font-bold">E-mail:</label>
                        <input required value={user.email} onChange={(e) => handleFormChange(e)} type="email" name="email" id="email" placeholder="" className="mt-2 flex h-12 w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-sm outline-none border-gray-200 focus:border-gray-500 bg-gray-100" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="text-sm text-navy-700 dark:text-white font-bold">Telefone:</label>
                        <input required value={user.phone} onChange={(e) => handleFormChange(e)} type="phone" name="phone" id="phone" placeholder="" className="mt-2 flex h-12 w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-sm outline-none border-gray-200 focus:border-gray-500 bg-gray-100" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="text-sm text-navy-700 dark:text-white font-bold">Senha:</label>
                        <input onChange={(e) => handleFormChange(e)} type="password" name="password" id="password" placeholder="" className="mt-2 flex h-12 w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-sm outline-none border-gray-200 focus:border-gray-500 bg-gray-100" />
                    </div>

                    {session.user.role === 'ADMIN' &&
                        <div className="mb-3" onChange={e => handleFormChange(e)}>
                            <label htmlFor="password" className="text-sm text-navy-700 dark:text-white font-bold">Role:</label>
                            <div className="flex items-center mb-4 mt-4">
                                <input checked={(user.role === 'USER')} type="radio" value="USER" name="role" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Usuário</label>
                            </div>
                            <div className="flex items-center">
                                <input checked={(user.role === 'ADMIN')} type="radio" value="ADMIN" name="role" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Administrador</label>
                            </div>
                        </div>
                    }





                    {/*
                    <div className="mb-3">
                        <label htmlFor="email2" className="text-sm text-navy-700 dark:text-white font-bold">Success</label>
                        <input type="text" id="email2" placeholder="Success input" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email3" className="text-sm text-navy-700 dark:text-white font-bold">Error</label>
                        <input type="text" id="email3" placeholder="Error input" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400" />
                    </div>
                    <div>
                        <label htmlFor="email4" className="text-sm text-navy-700 dark:text-white font-bold">Disabled</label>
                        <input disabled type="text" id="email4" placeholder="@horizon.ui" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none !border-none !bg-gray-100 cursor-not-allowed dark:!bg-white/5 " />
                    </div>
                */}
                </div>
            </div>



        </>
    )

}

export default CompanyInfo;
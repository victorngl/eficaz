import InputMask from 'react-input-mask';

function CompanyInfo({estimate, setEstimate}) {

    function handleFormChange(e) {
        const { name, value } = e.target;
        setEstimate({ ...estimate, [name]: value });
      }

    return (
        <>
            <div className="justify-center items-center">
                <div className="rounded-lg bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full bg-white">
                    <div className="relative flex flex-row justify-between">
                        <h2 className="text-xl font-semibold text-navy-700 dark:text-white mb-3">
                           Dados do Projeto
                        </h2>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="text-sm text-navy-700 dark:text-white font-bold">Nome da Empresa</label>
                        <input required value={estimate.name} onChange={(e) => handleFormChange(e)} type="text" name="name" id="name" placeholder="" className="mt-2 flex h-12 w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-sm outline-none border-gray-200 focus:border-gray-500 bg-gray-100" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cnpj" className="text-sm text-navy-700 dark:text-white font-bold">CNPJ da Empresa</label>
                        <InputMask pattern="^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$" required value={estimate.cnpj} onChange={(e) => handleFormChange(e)} mask="99.999.999/9999-99" name="cnpj" type="text" id="cnpj" placeholder="" className="mt-2 flex h-12 w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-sm outline-none focus:border-gray-500 bg-gray-100"></InputMask>
                    </div>

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
import { useState } from "react";

function EditSelectedProduct({ selectedProduct, setSelectedProduct, handleAddProduct }) {

    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

    function handleUnselectProduct() {
        setSelectedProduct(undefined);
    }

    const handleQuantityChange = (e) => {
        var number = e.target.value;

        if (!isNaN(number)) {
            setSelectedQuantity(Number(number));
            setSelectedProduct({ ...selectedProduct, quantity: Number(number) })
        }
    }

    const addPercentageToAdjustPrice = () => {
        setSelectedProduct((prev) => {
            return { ...prev, price: prev.price * 1.10 }
        }
        )
    }

    const removePercentageToAdjustPrice = () => {
        setSelectedProduct((prev) => {
            return { ...prev, price: prev.price * 0.90 }
        }
        )
    }

    const handleAdjustPrice = (e) => {
        var number = e.target.value;

        if (!isNaN(number)) {
            setSelectedProduct({ ...selectedProduct, price: Number(number) })
        }
    }

    const addQuantity = () => {
        let totalQuantity = selectedQuantity + 1
        setSelectedQuantity(totalQuantity)
        setSelectedProduct({ ...selectedProduct, quantity: totalQuantity })
    }

    const removeQuantity = () => {
        if (selectedQuantity != 1) {
            let totalQuantity = selectedQuantity - 1
            setSelectedQuantity(totalQuantity)
            setSelectedProduct({ ...selectedProduct, quantity: totalQuantity })
        }
    }

    const addProductList = (product) => {
        handleAddProduct(product)
        setSelectedQuantity(1);
        setSelectedProduct(undefined)
    }

    var formatter = new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });

    return (
        <>
            <div className='md:w-4/12 border-dashed	border-2 p-2 border-gray-400 h-max my-5 md:my-0'>
                {selectedProduct != undefined ?
                    <div className="flex justify-center text-center">
                        <div>
                            <div className="space-y-4">
                                <p className="text-base">{selectedProduct.name}</p>



                                <div className="my-5">
                                    <button type='button' className='px-2 py-2 rounded bg-red-400 text-white mr-2' onClick={removePercentageToAdjustPrice}>- 10%</button>
                                    Preço: R$
                                    <input onChange={e => handleAdjustPrice(e)} className="text-center w-[70px]" type="" value={selectedProduct.price.toFixed(2)} />
                                    <button type='button' className='px-2 py-2 rounded bg-blue-400 text-white ml-2' onClick={addPercentageToAdjustPrice}>+ 10%</button>
                                </div>

                                <p>Data do preço: {formatter.format(Date.parse(selectedProduct.updatedAt))}</p>

                            </div>

                            <div className="my-5">
                                <button type='button' className='px-5 py-2 rounded bg-red-400 text-white mr-5' onClick={removeQuantity}>-</button>

                                <input onChange={e => handleQuantityChange(e)} className="text-center w-12" type="" value={selectedQuantity} />
                                <button type='button' className='px-5 py-2 rounded bg-blue-400 text-white ml-5' onClick={addQuantity}>+</button>
                            </div>

                            <div>
                                <button className='bg-blue-500 text-white p-2 text-sm rounded' onClick={(e) => addProductList(selectedProduct)}>Adicionar Produto</button>
                            </div>

                        </div>
                    </div>
                    :
                    <p>Nenhum Produto Selecionado</p>
                }
            </div>
        </>
    )
}

export default EditSelectedProduct;
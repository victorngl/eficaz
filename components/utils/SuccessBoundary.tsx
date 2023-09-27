function SuccessBoundary({ message }) {
    return (
        <>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">{message}</strong>
                <span className="block sm:inline"></span>
            </div>
        </>
    )
}

export default SuccessBoundary;
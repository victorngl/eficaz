function Boundary({ children, type }) {

    if (type == 'error') {
        return (
            <>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
                    <strong className="font-bold">{children}</strong>
                    <span className="block sm:inline"></span>
                </div>
            </>
        )
    }

    if (type == 'success') {
        return (
            <>
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4" role="alert">
                    <strong className="font-bold">{children}</strong>
                    <span className="block sm:inline"></span>
                </div>
            </>
        )
    }

    if (type == 'warning') {
        return (
            <>
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative my-4" role="alert">
                    <strong className="font-bold">{children}</strong>
                    <span className="block sm:inline"></span>
                </div>
            </>
        )
    }
}

export default Boundary;
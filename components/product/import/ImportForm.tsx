import React from 'react';

export default function ImportFileUploadForm({ onFileUpload, selectedFile, setSelectedFile }) {

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="fileInput"
                />
                <label
                    htmlFor="fileInput"
                    className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                    Escolher arquivo
                </label>
            </div>
            {selectedFile && (
                <div className="text-gray-700">
                    Arquivo selecionado: {selectedFile.name}
                </div>
            )}
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                disabled={!selectedFile}
            >
                Enviar arquivo
            </button>
        </form>
    );
}
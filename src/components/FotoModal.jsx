import React, { useState } from 'react';
import { API_URL } from '../config/urls';
import useUsersContext from '../hooks/useUsersContext';

const FotoModal = () => {
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [subiendo, setSubiendo] = useState(false);

    // Extraemos todo lo necesario del context
    const { setAbrirModalFoto,error,setError,perfil, obtenerPerfil } = useUsersContext();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('La imagen es demasiado pesada. Intenta con una de menos de 5MB');
                return;
            }
            setArchivo(file);
            setPreview(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        setError('');
        e.preventDefault();
        if (!archivo) return;

        setSubiendo(true);
        const formData = new FormData();
        formData.append('foto', archivo);

        try {
            const token = localStorage.getItem('token_usuario');
            const respuesta = await fetch(`${API_URL}/usuarios/actualizar-foto`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                setAbrirModalFoto(false);
                obtenerPerfil();
            } else {
                setError(data.mensaje || 'Error al subir la foto');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setSubiendo(false);
        }
    };

    return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4 sm:p-6">
        {/* Contenedor del Modal: En móvil ocupa casi todo el ancho, en desktop se frena en max-md */}
        <div className="bg-[#007011] rounded-[24px] sm:rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">

            {/* Cabecera: Reducimos padding en móvil para ganar espacio */}
            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-white/20">
                <h2 className="text-lg sm:text-xl font-inter font-bold text-white">Actualizar perfil</h2>
                <button
                    onClick={() => {setAbrirModalFoto(false); setError('')}}
                    className="text-white cursor-pointer hover:opacity-70 text-3xl leading-none"
                >
                    &times;
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                {/* Avatar: Un poco más pequeño en móviles muy estrechos */}
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4">
                        <img
                            src={preview || perfil?.fotoPerfil}
                            alt="Vista previa"
                            className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                        />
                        <label
                            htmlFor="input-foto"
                            className="absolute bottom-0 right-0 bg-white text-[#007011] w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg flex items-center justify-center text-lg"
                        >
                            📷
                        </label>
                    </div>
                    <p className="text-xs sm:text-sm font-inter text-gray-200 text-center">Toca la cámara para elegir foto</p>
                </div>

                <input
                    id="input-foto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {error && (
                    <p className="text-red-600 text-xs sm:text-sm mb-4 text-center bg-red-50 p-2.5 rounded-xl border border-red-200">
                        {error}
                    </p>
                )}

                {/* Botones: Se apilan en pantallas extra pequeñas si el texto es largo */}
                <div className="flex flex-row gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => {setAbrirModalFoto(false); setError('')}}
                        className="flex-1 py-3 border-2 border-red-500 rounded-xl font-inter text-red-100 text-sm sm:text-base font-bold hover:bg-red-600 transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={!archivo || subiendo}
                        className={`flex-1 font-inter py-3 rounded-xl border-2 border-white text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all ${
                            !archivo || subiendo 
                            ? 'bg-gray-400 border-gray-400 text-gray-200 cursor-not-allowed' 
                            : 'bg-white text-[#007011] hover:bg-transparent hover:text-white cursor-pointer'
                        }`}
                    >
                        {subiendo ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                <span>Subiendo...</span>
                            </div>
                        ) : (
                            <span>Guardar</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    </div>
);
};

export default FotoModal;
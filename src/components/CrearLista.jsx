import useListsContext from "../hooks/useListsContext";

function CrearLista() {
    const { nombreLista, setNombreLista, crearLista, setModalCrearLista } = useListsContext();

    return (
        /* Fondo oscuro con z-index alto para estar por encima de todo */
        <div className="fixed z-[100] inset-0 bg-black/60 flex justify-center items-center p-4 min-h-[100dvh]">
            
            {/* Contenedor principal: w-full en móvil para aprovechar el ancho */}
            <div className="relative rounded-2xl flex flex-col justify-end p-6 md:p-10 w-full max-w-[600px] h-auto md:h-[180px] bg-[#007011] shadow-2xl">
                
                <h2 className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold font-inter text-lg md:text-xl uppercase whitespace-nowrap">
                    Crear Lista
                </h2>

                <button
                    className="absolute top-4 right-4 md:top-5 md:right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                        e.preventDefault();
                        setModalCrearLista(false);
                    }}>
                    <img src="/icons/close.png" alt="close" className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]" />
                </button>

                {/* Input y Botón: Se apilan en móvil, se alinean en escritorio */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 md:mt-0">
                    <input
                        type="text"
                        value={nombreLista}
                        onChange={(e) => setNombreLista(e.target.value)}
                        className="font-inter text-base md:text-lg placeholder:text-white/70 text-white rounded-lg p-2 outline-none transition-all w-full md:flex-1 border-b md:border-none border-white/30"
                        placeholder="NOMBRE DE LISTA"
                    />

                    <button
                        className="font-inter text-white border border-white bg-[#7B9F7D] rounded-xl p-3 md:p-2 w-full md:w-32 hover:scale-105 transition-transform cursor-pointer active:scale-95 shadow-md font-bold"
                        onClick={crearLista}
                    >
                        Crear
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CrearLista;
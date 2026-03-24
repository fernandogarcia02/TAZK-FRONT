import useListsContext from "../hooks/useListsContext";

function ListModal() {
    const { nuevoNombre, listaAEditar, setNuevoNombre, setListaAEditar, editarList, setModalEditarLista } = useListsContext();

    return (
        /* Fondo oscuro con z-index alto y altura dinámica para móvil */
        <div className="fixed z-[100] inset-0 bg-black/60 flex justify-center items-center p-4 min-h-[100dvh]">
            
            {/* Ancho: w-full para móvil, max-w-[600px] para PC.
                Alto: h-auto en móvil para que no se corte, h-[160px] en PC.
            */}
            <div className="relative rounded-2xl flex flex-col justify-end p-6 md:p-10 w-full max-w-[600px] h-auto md:h-[180px] bg-[#007011] shadow-2xl">
                
                <h2 className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold font-inter text-lg md:text-xl uppercase whitespace-nowrap">
                    Editar Lista
                </h2>

                <button
                    className="absolute top-4 right-4 md:top-5 md:right-6 hover:scale-110 transition-transform cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        setListaAEditar(null);
                        setNuevoNombre('');
                        setModalEditarLista(false);
                    }}>
                    <img src="/icons/close.png" alt="close" className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]" />
                </button>

                {/* Contenedor de Input y Botón: 
                    En móvil se apilan (flex-col) para que el botón sea fácil de tocar.
                    En PC se mantienen en línea (md:flex-row).
                */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 md:mt-0">
                    <input
                        type="text"
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                        className="font-inter text-base md:text-lg placeholder:text-white/70 text-white rounded-lg p-2 outline-none transition-all w-full md:flex-1 border-b md:border-none border-white/30"
                        placeholder="NOMBRE DE LISTA"
                    />

                    <button
                        className="font-inter text-white border border-white bg-[#7B9F7D] rounded-xl p-3 md:p-2 w-full md:w-32 hover:scale-105 transition-transform cursor-pointer active:scale-95 shadow-md font-bold"
                        onClick={() => {
                            editarList(listaAEditar);
                        }}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ListModal;
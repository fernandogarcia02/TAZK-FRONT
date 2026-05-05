import useListsContext from "../hooks/useListsContext"
import useTasksContext from "../hooks/useTasksContext";
/*Componente para borrar una lista*/
function DeleteModal() {
    const { setModalEliminarLista, eliminarLista, listaAEliminar, setListaAEliminar } = useListsContext();
    const { refrescarTareas } = useTasksContext();

    return (
        /* z-[110] para asegurar que esté por encima de incluso otros modales */
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[110] p-4 min-h-[100dvh]">
            
            {/* Ancho fluido: w-full en móvil, max-w-[500px] en escritorio.
                Altura: h-auto para que el texto respire bien en pantallas estrechas.
            */}
            <div className="relative bg-[#007011] rounded-2xl w-full max-w-[500px] p-8 md:p-10 flex flex-col items-center shadow-2xl border border-white/10">
                {/*boton X para cerrar el modal*/}
                <button
                    className="absolute right-4 top-4 cursor-pointer hover:scale-110 active:scale-90 transition-all z-10"
                    onClick={() => {
                        setListaAEliminar(null);
                        setModalEliminarLista(false);
                    }}
                >
                    <img src="/icons/close.png" alt="close" className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]" />
                </button>

                {/* Mensaje de advertencia para el usuario*/}
                <div className="mt-4 mb-6">
                    <p className="text-white font-bold font-inter text-lg md:text-[20px] text-center leading-tight">
                        Si eliminas la lista, eliminarás todas las tareas asociadas a dicha lista.
                    </p>
                </div>
                    {/*Boton para eliminar la lista*/}
                <div className="w-full flex justify-center mt-2">
                    <button
                        onClick={async () => {
                            await eliminarLista(listaAEliminar);
                            refrescarTareas();
                        }}
                        className="bg-white text-red-600 border-2 border-red-600 font-bold rounded-xl py-3 px-6 w-full md:w-32 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer active:scale-95 shadow-lg"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
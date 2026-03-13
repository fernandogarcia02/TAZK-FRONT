import useListsContext from "../hooks/useListsContext"
import useTasksContext from "../hooks/useTasksContext";
function DeleteModal() {
    const { setModalEliminarLista, eliminarLista,listaAEliminar, setListaAEliminar } = useListsContext();
    const {refrescarTareas} = useTasksContext();

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className=" rounded-xl relative bg-[#007011] w-[500px] h-[200px] flex flex-col pt-13">
                <button
                    className="absolute right-5 top-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                    onClick={() => {
                        setListaAEliminar(null);
                        setModalEliminarLista(false);}}
                >
                    <img src="/icons/close.png" alt="close" className="w-[35px] h-[35px]" />
                </button>
                <p className="text-white font-bold font-inter text-[20px] text-center">Si eliminas la lista eliminarás todas las tareas asociadas a dicha lista</p>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">

                    <button
                        onClick={async () => {
                            await eliminarLista(listaAEliminar)
                            refrescarTareas();}}
                            
                        className="border-2 hover:bg-red-600 hover:text-white transition-all duration-400 cursor-pointer text-red-600 bg-white font-bold border-red-600 rounded-xl p-2 w-25">Eliminar</button>
                </div>
            </div>

        </div>
    )
}
export default DeleteModal;
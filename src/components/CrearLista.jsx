import useListsContext from "../hooks/useListsContext";
function CrearLista() {
    const {nombreLista,setNombreLista,crearLista,setModalCrearLista} = useListsContext();

    return(
        <div className="fixed z-50 inset-0 bg-black/60 flex justify-center items-center">
            {/* 1. Corregimos flex-col y añadimos justify-end para empujar todo hacia abajo */}
            {/* 2. Añadimos p-10 para que el contenido no toque los bordes */}
            <div className="relative rounded-xl flex flex-col justify-end p-10 w-[600px] h-[160px] bg-[#007011]">
                <h2 className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold font-inter text-xl uppercase">
                    Crear Lista
                </h2>
                <button
                    className="absolute top-5 right-6 hover:scale-110 transition-transform cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        setModalCrearLista(false);
                    }}>
                    <img src="/icons/close.png" alt="close" className="w-[35px] h-[35px]" />
                </button>

                {/* 3. Contenedor para alinear el Input y el Botón en la misma línea abajo */}
                <div className="flex items-center justify-between gap-4">
                    <input
                        type="text"
                        value={nombreLista}
                        onChange={(e) => setNombreLista(e.target.value)}
                        className="font-inter text placeholder:text-white text-white bg-transparent p-2 outline-none transition-all flex-1"
                        placeholder="NOMBRE DE LISTA"
                    />

                    <button
                        className="font-inter text-white border border-white bg-[#7B9F7D] rounded-xl p-2 w-32 hover:scale-105 transition-transform cursor-pointer active:scale-95 shadow-md"
                        onClick={crearLista}
                    >
                        Crear
                    </button>
                </div>
            </div>
        </div>

    )


}

export default CrearLista;
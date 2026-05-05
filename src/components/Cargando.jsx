/*Componente con un spinner para mostrar al usuario que la aplicación está cargando y no pueda hacer nada*/ 
function Cargando() {
    return (
        /* min-h-[100dvh] asegura el centro real en móviles ignorando las barras del navegador */
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-[999]">
            <div className="flex flex-col items-center gap-4">
                <img 
                    src="/spinner.svg" 
                    alt="cargando" 
                    className="w-16 h-16 animate-spin" 
                />
                <p className="font-inter font-bold text-[#007011] text-lg animate-pulse">
                    Cargando...
                </p>
            </div>
        </div>
    );
}

export default Cargando;
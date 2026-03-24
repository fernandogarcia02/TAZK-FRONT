import useTasksContext from "../hooks/useTasksContext";
import { useEffect } from "react";

function Error() {
    const { error, setError } = useTasksContext();

    // Opcional: Auto-cerrar el error después de 5 segundos en el móvil
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, setError]);

    // Si no hay error, no renderizamos nada
    if (!error) return null;

    return (
        /* z-[200] para que esté por encima de todos los modales (que tienen 100 o 110) */
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[92%] max-w-md animate-bounce-in">
            <div className="bg-red-600 text-white p-4 rounded-2xl shadow-2xl border-l-8 border-red-900 flex items-center justify-between backdrop-blur-sm">
                
                <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">⚠️</span>
                    <p className="font-inter font-semibold text-sm md:text-base leading-tight">
                        {error}
                    </p>
                </div>

                <button 
                    onClick={() => setError('')} 
                    className="ml-4 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors active:scale-90"
                >
                    <img src="/icons/close.png" alt="cerrar" className="w-4 h-4 invert" />
                </button>
            </div>
        </div>
    );
}

export default Error;
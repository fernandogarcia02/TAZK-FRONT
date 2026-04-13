import useTasksContext from "../hooks/useTasksContext";
import { useEffect } from "react";
import useUsersContext from "../hooks/useUsersContext";

function Error({ mensaje, cerrar }) {
    const { reenviarEmail } = useUsersContext();
    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                cerrar();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [mensaje, cerrar]);

    // Si no hay error, no renderizamos nada
    if (!mensaje) return null;


    if (mensaje.includes('REENVIAR_EMAIL')) {

        return (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[92%] max-w-md animate-bounce-in">
                <div className="bg-red-600 text-white p-4 rounded-2xl shadow-2xl border-l-8 border-red-900 flex items-center justify-between backdrop-blur-sm">

                    <div className="flex items-center gap-3">
                        <span className="text-2xl shrink-0">⚠️</span>
                        <p className="font-inter font-semibold text-sm md:text-base leading-tight">
                            Tu cuenta aún no ha sido confirmada. <button className="underline cursor-pointer decoration-2 underline-offset-2 hover:text-red-200 transition-colors font-bold" onClick={(e) => { e.preventDefault(); reenviarEmail(); }}>Reenviar email</button>
                        </p>
                    </div>

                    <button
                        onClick={() => { cerrar() }}
                        className="ml-4 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors active:scale-90"
                    >
                        <img src="/icons/close.png" alt="cerrar" className="w-4 h-4 invert" />
                    </button>
                </div>
            </div>
        )
    }




    return (
        /* z-[200] para que esté por encima de todos los modales (que tienen 100 o 110) */
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[92%] max-w-md animate-bounce-in">
            <div className="bg-red-600 text-white p-4 rounded-2xl shadow-2xl border-l-8 border-red-900 flex items-center justify-between backdrop-blur-sm">

                <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">⚠️</span>
                    <p className="font-inter font-semibold text-sm md:text-base leading-tight">
                        {mensaje}
                    </p>
                </div>

                <button
                    onClick={() => { cerrar() }}
                    className="ml-4 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors active:scale-90"
                >
                    <img src="/icons/close.png" alt="cerrar" className="w-4 h-4 invert" />
                </button>
            </div>
        </div>
    );
}

export default Error;
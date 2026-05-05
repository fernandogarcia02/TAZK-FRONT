import useUsersContext from "../hooks/useUsersContext";
import { useEffect } from "react";
//Componente para mostrar cuando un pocreso ha sido exitoso
function Exito({mensaje,cerrar}) {

    //UseEffect para que se cierre automáticamente el mensaje a los 5 segundos
    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                cerrar();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [mensaje, cerrar]);

    // Si no hay error, no renderizamos nada
    if (!mensaje) return null;

    return (
        /* z-[200] para que esté por encima de todos los modales (que tienen 100 o 110) */
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[92%] max-w-md animate-bounce-in">
            <div className="bg-green-600 text-white p-4 rounded-2xl shadow-2xl border-green-900 flex items-center justify-between backdrop-blur-sm">
                
                {/*MENSAJE*/}
                <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">✅</span>
                    <p className="font-inter font-semibold text-sm md:text-base leading-tight">
                        {mensaje}
                    </p>
                </div>

                {/*Boton para cerrar el mensaje*/}
                <button 
                    onClick={() => cerrar()} 
                    className="ml-4 p-2 rounded-full hover:bg-white/40 transition-colors active:scale-90"
                >
                    <img src="/icons/close.png" alt="cerrar" className="w-4 h-4 invert" />
                </button>
            </div>
        </div>
    );
}

export default Exito;
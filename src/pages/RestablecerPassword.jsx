import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import Exito from "../components/Exito";
import useUsersContext from "../hooks/useUsersContext";
import { useEffect } from "react";
import Cargando from "../components/Cargando";

const RestablecerPassword = () => {
    const params = useParams();
    const { token } = params;
    const { password, setPassword, password2, setPassword2, cambiarPassword,exito,setExito,error,setError,cargando } = useUsersContext();
    const navigate = useNavigate();
     useEffect(() => {
            document.title = "Cambiar Contraseña - TAZK";
        }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 px-4">
             <img 
              src="/icons/TAZK.png" 
              alt="tazk" 
              className="fixed top-6 left-6 md:top-8 md:left-8 h-8 md:h-10 w-auto cursor-pointer z-50"
              onClick={() => navigate("/welcome")} 
            />
            {cargando &&
                <Cargando/>}
            {exito &&
                <Exito 
                    mensaje={exito}
                    cerrar= {()=>setExito('')}
                />
            }
            {error &&
                <Error 
                    mensaje={error}
                    cerrar= {()=>setError('')}
                />
            }
            <div className="p-8 md:p-12 bg-[#007011] shadow-2xl rounded-[30px] max-w-[600px] w-full text-center flex flex-col items-center">
                
                <h1 className="text-2xl md:text-3xl font-bold font-poppins text-white mb-10 uppercase tracking-wide">
                    Restablecer Contraseña
                </h1>

                <div className="w-full flex flex-col gap-6">
                    {/* Fila Contraseña */}
                    <div className="flex flex-col md:flex-row md:items-center w-full">
                        <label 
                            htmlFor="password"
                            /* md:w-40 y md:text-right hacen que todos los labels terminen en el mismo punto */
                            className="font-inter text-white font-bold text-sm md:text-base mb-2 md:mb-0 md:w-44 md:text-right md:pr-6"
                        >
                            Nueva Contraseña
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="••••••••"
                            className="flex-1 bg-white rounded-full p-3 md:p-4 font-inter text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all shadow-inner"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Fila Confirmar */}
                    <div className="flex flex-col md:flex-row md:items-center w-full">
                        <label 
                            htmlFor="password2"
                            className="font-inter text-white font-bold text-sm md:text-base mb-2 md:mb-0 md:w-44 md:text-right md:pr-6"
                        >
                            Confirmar Contraseña
                        </label>
                        <input 
                            type="password" 
                            name="password2" 
                            id="password2"
                            placeholder="••••••••"
                            className="flex-1 bg-white rounded-full p-3 md:p-4 font-inter text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all shadow-inner"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)} 
                        />
                    </div>
                </div>

                <button
                    onClick={() => cambiarPassword(token)}
                    className="mt-10 font-inter font-bold text-white border border-white bg-[#7B9F7D] rounded-full py-3 px-10 w-full md:w-auto min-w-[200px] hover:scale-105 transition-transform cursor-pointer active:scale-95 shadow-lg uppercase tracking-widest"
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default RestablecerPassword;
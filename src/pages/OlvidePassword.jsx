import Exito from "../components/Exito";
import Error from "../components/Error";
import useUsersContext from "../hooks/useUsersContext"
import { useNavigate } from "react-router-dom";

const OlvidePassword = () => {
    const {email,setEmail,exito,setExito,error,setError,enviarEmailOlvide} = useUsersContext();
    const navigate = useNavigate();
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
             <img 
              src="/icons/TAZK.png" 
              alt="tazk" 
              className="fixed top-6 left-6 md:top-8 md:left-8 h-8 md:h-10 w-auto cursor-pointer z-50"
              onClick={() => navigate("/welcome")} 
            />
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
            <div className="p-10 bg-[#007011] shadow-lg rounded-xl max-w-[580px] md:max-w-[600px] w-full text-center flex items-center">
                <label 
                className="text-white p-2"
                htmlFor="email">Email</label>
                <input 
                className="font-inter border-2 border-[#004d0b] text-lg md:text-lg placeholder:text-white/70 placeholder:font-bold text-white rounded p-3 outline-none focus:bg-white/20 transition-all"
                type="email"
                id="email"
                value={email}
                required
                placeholder=''
                onChange={(e)=>setEmail(e.target.value)} />
                <button
                    onClick={enviarEmailOlvide}
                    className="ml-5 text-white border border-white bg-[#7B9F7D] rounded-full p-3 w-[400px] hover:scale-110 transition-transform cursor-pointer active:scale-95 font-inter font-bold"
                >Enviar</button>
            </div>
        </div>
    )
}
export default OlvidePassword
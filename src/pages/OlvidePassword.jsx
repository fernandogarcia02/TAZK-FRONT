import Exito from "../components/Exito";
import Error from "../components/Error";
import useUsersContext from "../hooks/useUsersContext"

const OlvidePassword = () => {
    const {email,setEmail,exito,setExito,error,setError} = useUsersContext();
    return(
        <div>
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
            <div>
                <label htmlFor="email">Email</label>
                <input 
                className=""
                type="email"
                id="email"
                value={email}
                required
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)} />
                <button
                    onClick={()=>{

                    }}
                    className=""
                >Enviar</button>
            </div>
        </div>
    )
}
export default OlvidePassword